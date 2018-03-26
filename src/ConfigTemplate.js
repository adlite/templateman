import isObject from 'is-plain-object';
import isString from 'is-string';

export default class ConfigTemplate {
	constructor(options) {
		this.options = options;
	}

	isValid() {
		const { name, path, outputDir } = this.options;
		return (
			isObject(this.options) &&
			isString(name) &&
			isString(path) &&
			isString(outputDir) &&
			name.trim().length > 0
		);
	}

	getName() {
		if (this.options.prettyName) {
			return this.options.prettyName;
		}
		return this.options.name;
	}
}
