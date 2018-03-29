import isObject from 'is-plain-object';
import TemplateConfig from './TemplateConfig.js';

export default class Config {
	constructor(cosmiconfig) {
		if (cosmiconfig !== null) {
			this.options = cosmiconfig.config;
			this.path = cosmiconfig.filepath;
			this.templates = [];
			this.currentTemplate = null;
			this.validateConfig();
			this.createTemplates();
		} else {
			throw new Error('Templateman configuration file is not found in current path');
		}
	}

	validateConfig() {
		if (!isObject(this.options) || !Array.isArray(this.options.templates)) {
			throw new Error(
				'Templateman configuration files scheme is wrong. It should contain "templates" array.',
			);
		}
	}

	createTemplates() {
		const res = this.options.templates.map((template) => {
			return new TemplateConfig(template);
		});
		this.templates = res.filter((template) => template.isValid());
	}

	setCurrentTemplate(templateName) {
		for (let template of this.templates) {
			if (templateName === template.getName()) {
				this.currentTemplate = template;
				this.currentTemplate.load();
				return;
			}
		}
	}

	getTemplateNamesArray() {
		return this.templates.map((template) => template.getName());
	}
}
