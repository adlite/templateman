import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import isString from 'is-string';
import uniq from 'lodash.uniq';
import Parser from './Parser';

export default class TemplateFile {
	constructor({ from, to }) {
		if (isString(from) && isString(to)) {
			this.from = from;
			this.to = to;
			this.absFrom = path.resolve(process.cwd(), this.from);
			this.absTo = path.resolve(process.cwd(), this.to);
			this.content = '';
			this.outputContent = '';
			this.vars = [];
			this.varValues = {};
			this.load();
		} else {
			throw new Error(
				'Template configuration path error. It should contain required "from" and "to" strings.',
			);
		}
	}

	replaceOutputContent() {
		this.outputContent = Parser.replaceVars(this.content, this.varValues);
	}

	replaceOutputPath() {
		this.absTo = Parser.replaceVars(this.absTo, this.varValues);
	}

	createOutputFile() {
		mkdirp.sync(path.dirname(this.absTo));
		if (fs.existsSync(this.absTo) && fs.statSync(this.absTo).isFile()) {
			throw new Error(`${this.absTo} file already exists`);
		} else {
			fs.writeFileSync(this.absTo, this.outputContent);
		}
	}

	load() {
		if (fs.existsSync(this.absFrom)) {
			this.content = fs.readFileSync(this.absFrom).toString();
			let fileVars = Parser.getVars(this.content);
			let toVars = Parser.getVars(this.to);
			this.vars = uniq(fileVars.concat(toVars));
		} else {
			throw new Error(`${this.absFrom} template file is not found`);
		}
	}

	emit(varValues) {
		this.varValues = varValues;
		this.replaceOutputContent();
		this.replaceOutputPath();
		this.createOutputFile();
	}
}
