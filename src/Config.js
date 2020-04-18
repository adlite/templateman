import path from 'path';
import chalk from 'chalk';
import isObject from 'is-plain-object';
import isString from 'is-string';
import uniq from 'lodash.uniq';
import TemplateFile from './TemplateFile';

export default class Config {
	constructor(cosmiconfig) {
		if (!cosmiconfig) {
			throw new Error(
				`Templateman configuration file is not found. Please create it.\n${chalk.cyan(
					'See documentation on ',
				) + chalk.cyan.underline('https://www.npmjs.com/package/templateman')}`,
			);
		}

		this.options = cosmiconfig.config;
		this.path = cosmiconfig.filepath;
		this.dir = path.dirname(cosmiconfig.filepath);
		this.vars = [];
		this.currentTemplate = null;
		this.validate();
		this.convertAllFilesToArray();
	}

	validate() {
		if (!isObject(this.options) || !Array.isArray(this.options.templates)) {
			throw new Error(
				'Templateman config scheme is wrong. It should contain required "templates" array.',
			);
		}

		this.options.templates = this.options.templates.filter(tpl => Config.isTemplateValid(tpl));

		if (this.options.templates.length === 0) {
			throw new Error('No valid templates found in Templateman config. Please, create them.');
		}
	}

	convertAllFilesToArray() {
		this.options.templates.forEach(tpl => {
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

	loadCurrentTemplate(templateName) {
		let load = template => {
			this.currentTemplate = template;
			let { files } = this.currentTemplate;

			files = files.filter(file => TemplateFile.isValid(file));

			if (files.length === 0) {
				throw new Error(
					'No valid files found in selected template. Every file in template should contain "from" and "to" fields.',
				);
			}

			files = files.map(file => {
				const from = path.resolve(this.dir, file.from);
				const to = path.resolve(this.dir, file.to);
				return new TemplateFile({ from, to });
			});

			files.forEach(file => {
				file.load();
				this.vars = this.vars.concat(file.getVars());
			});

			this.currentTemplate.files = files;
			this.vars = uniq(this.vars);
		};

		for (let template of this.options.templates) {
			if (templateName === template.name) {
				load(template);
				return true;
			}
		}

		return false;
	}

	getTemplateNamesArray() {
		return this.options.templates.map(tpl => tpl.name);
	}

	emitFiles(varValues = {}) {
		this.currentTemplate.files.forEach(file => file.emit(varValues));
	}
}
