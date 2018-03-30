import isObject from 'is-plain-object';
import isString from 'is-string';
import uniq from 'lodash.uniq';
import TemplateFile from './TemplateFile';

export default class TemplateConfig {
	constructor(options) {
		this.options = options;
		this.templateFiles = [];
		this.vars = [];
	}

	isValid() {
		const { name, files } = this.options;
		return (
			isObject(this.options) &&
			isString(name) &&
			name.trim().length > 0 &&
			(Array.isArray(files) || isObject(files))
		);
	}

	getName() {
		return this.options.name;
	}

	load() {
		const { files } = this.options;

		if (Array.isArray(files)) {
			files.forEach((options) => {
				this.templateFiles.push(new TemplateFile(options));
			});
		} else {
			this.templateFiles.push(new TemplateFile(files));
		}

		this.templateFiles.forEach((file) => {
			this.vars = this.vars.concat(file.vars);
		});
		this.vars = uniq(this.vars);
	}

	emitFiles(varValues = {}) {
		this.templateFiles.forEach((file) => file.emit(varValues));
	}
}
