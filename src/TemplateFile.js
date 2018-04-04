import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import isString from 'is-string';
import isObject from 'is-plain-object';
import uniq from 'lodash.uniq';
import Parser from './Parser';

export default class TemplateFile {
	constructor(options) {
		if (!TemplateFile.isValid(options)) {
			throw new Error(
				`No valid files found in selected template. Every file in template should contain 'from' and 'to' fields`,
			);
		}

		this.from = options.from;
		this.to = options.to;
		this.content = '';
		this.outputContent = '';
		this.vars = [];
		this.varValues = {};
	}

	static isValid(options) {
		return (
			isObject(options) &&
			isString(options.from) &&
			isString(options.to) &&
			options.from.trim().length > 0 &&
			options.to.trim().length > 0
		);
	}

	createOutputFile() {
		mkdirp.sync(path.dirname(this.to));
		if (fs.existsSync(this.to) && fs.statSync(this.to).isFile()) {
			throw new Error(`${this.to} file already exists`);
		} else {
			fs.writeFileSync(this.to, this.outputContent);
		}
	}

	getVars() {
		let fileVars = Parser.getVars(this.content);
		let toVars = Parser.getVars(this.to);
		this.vars = uniq(fileVars.concat(toVars));

		return this.vars;
	}

	load() {
		if (fs.existsSync(this.from) && fs.statSync(this.from).isFile()) {
			this.content = fs.readFileSync(this.from).toString();
		} else {
			throw new Error(`'${this.from}' template file is not found`);
		}

		return this.content;
	}

	emit(varValues = {}) {
		this.outputContent = Parser.replaceVars(this.content, varValues);
		this.to = Parser.replaceVars(this.to, varValues);
		this.createOutputFile();
	}
}
