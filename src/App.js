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
		inquirer.prompt(Inquirer.templatesConfig(names)).then((answers) => {
			this.config.setCurrentTemplate(answers.template);
			this.inquireVars();
		});
	}

	inquireVars() {
		const names = this.config.currentTemplate.vars;
		if (names.length) {
			inquirer.prompt(Inquirer.varsConfig(names)).then((answers) => {
				console.log(answers);
				this.emitFiles();
			});
		} else {
			this.emitFiles();
		}
	}

	emitFiles() {
		this.config.currentTemplate.emitFiles();
	}
}
