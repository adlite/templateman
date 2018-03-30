import fs from 'fs';
import path from 'path';
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
			this.fileContent = '';
			this.outputFileContent = '';
			this.vars = [];
			this.load();
		} else {
			throw new Error(
				'Template configuration path error. It should contain required "from" and "to" path strings',
			);
		}
	}

	load() {
		//TODO: check file existance in a right way
		if (fs.existsSync(this.absFrom)) {
			//TODO: wrap it by try..catch
			this.fileContent = fs.readFileSync(this.absFrom).toString();
			let fileVars = Parser.getVars(this.fileContent);
			let toVars = Parser.getVars(this.to);
			this.vars = uniq(fileVars.concat(toVars));
		} else {
			throw new Error(`${this.absFrom} template file is not found`);
		}
	}
}
