import chalk from 'chalk';
import inquirer from 'inquirer';
import Config from './Config.js';
import Inquirer from './Inquirer';

export default class App {
	constructor(config) {
		try {
			this.config = new Config(config);
			this.init();
		} catch (err) {
			console.log(chalk.red(err));
		}
	}

	init() {
		this.inquireTemplates();
	}

	inquireTemplates() {
		const names = this.config.getTemplateNamesArray();
		inquirer
			.prompt(Inquirer.templatesConfig(names))
			.then((answers) => {
				this.config.setCurrentTemplate(answers.template);
				this.inquireVars();
			})
			.catch((err) => console.log(chalk.red(err)));
	}

	inquireVars() {
		const { vars } = this.config.currentTemplate;
		if (vars.length) {
			inquirer
				.prompt(Inquirer.varsConfig(vars))
				.then((answers) => {
					this.config.currentTemplate.emitFiles(answers);
				})
				.catch((err) => console.log(chalk.red(err)));
		} else {
			this.config.currentTemplate.emitFiles();
		}
	}
}
