import isObject from 'is-plain-object';
import isString from 'is-string';
import TemplateFile from './TemplateFile';

export default class Config {
	constructor(cosmiconfig) {
		if (cosmiconfig !== null) {
			this.options = cosmiconfig.config;
			this.path = cosmiconfig.filepath;
			// this.templates = [];
			this.currentTemplate = null;
			this.validate();
			this.convertAllFilesToArray();
			// this.createTemplates();
		} else {
			throw new Error('Templateman configuration file is not found in current path.');
		}
	}

	validate() {
		if (!isObject(this.options) || !Array.isArray(this.options.templates)) {
			throw new Error(
				'Templateman config scheme is wrong. It should contain required "templates" array.',
			);
		}

		this.options.templates = this.options.templates.filter((tpl) => this.isTemplateValid(tpl));

		if (this.options.templates.length === 0) {
			throw new Error('No valid templates found in Templateman config. Please, create them.');
		}
	}

	convertAllFilesToArray() {
		this.options.templates.forEach((tpl) => {
			if (!Array.isArray(tpl.files)) {
				tpl.files = [tpl.files];
			}
		});
	}

	static isTemplateValid(template) {
		return (
			isObject(template) &&
			isString(template.name) &&
			template.name.trim().length > 0 &&
			(Array.isArray(template.files) || isObject(template.files))
		);
	}
	//
	// createTemplates() {
	// 	const res = this.options.templates.map((template) => {
	// 		return new TemplateConfig(template);
	// 	});
	// 	this.templates = res.filter((template) => template.isValid());
	// }

	setCurrentTemplate(templateName) {
		for (let template of this.options.templates) {
			if (templateName === template.name) {
				this.loadCurrentTemplate(template);
				return;
			}
		}
	}

	loadCurrentTemplate(template) {
		this.currentTemplate = template;

		this.currentTemplate.files = this.currentTemplate.files.filter((file) => {
			return TemplateFile.isValid(file);
		});

		this.templateFiles.forEach((file) => {
			this.vars = this.vars.concat(file.vars);
		});
		this.vars = uniq(this.vars);
	}

	getTemplateNamesArray() {
		return this.templates.map((template) => template.getName());
	}
}
