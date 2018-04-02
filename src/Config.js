import isObject from 'is-plain-object';
import TemplateConfig from './TemplateConfig';

//TODO: use this.path instead of process.cwd() by replacing all cosmiconfig.config paths to absolute
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
			throw new Error('Templateman configuration file is not found in current path.');
		}
	}

	validateConfig() {
		if (!isObject(this.options) || !Array.isArray(this.options.templates)) {
			throw new Error(
				'Templateman configuration file scheme is wrong. It should contain required "templates" array.',
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
