import isObject from 'is-plain-object';
import isString from 'is-string';

export default class TemplateConfig {
	constructor(options) {
		this.options = options;
	}

	isValid() {
		const { name, path } = this.options;
		return (
			isObject(this.options) &&
			isString(name) &&
			name.trim().length > 0 &&
			(Array.isArray(path) || isObject(path))
		);
	}

	getName() {
		return this.options.name;
	}
}
