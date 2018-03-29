import chalk from 'chalk';
import inquirer from 'inquirer';
import Config from './Config.js';

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
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'template',
					message: 'Choose your template below:',
					choices: this.config.getTemplateNamesArray(),
				},
			])
			.then((answers) => {
				this.config.setCurrentTemplate(answers.template);
			});
	}
}
