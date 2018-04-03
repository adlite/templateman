import chalk from 'chalk';
import inquirer from 'inquirer';
import Config from './Config';
import Inquirer from './Inquirer';

const App = {
	config: {},

	run: (cosmiconfig) => {
		try {
			App.config = new Config(cosmiconfig);
			App.inquireTemplates();
		} catch (err) {
			console.log(chalk.red(err));
		}
	},

	inquireTemplates: () => {
		const names = App.config.getTemplateNamesArray();
		inquirer
			.prompt(Inquirer.templatesConfig(names))
			.then((answers) => {
				App.config.setCurrentTemplate(answers.template);
				App.inquireVars();
			})
			.catch((err) => console.log(chalk.red(err)));
	},

	inquireVars: () => {
		const { vars } = App.config.currentTemplate;
		if (vars.length) {
			inquirer
				.prompt(Inquirer.varsConfig(vars))
				.then((answers) => {
					App.config.currentTemplate.emitFiles(answers);
				})
				.catch((err) => console.log(chalk.red(err)));
		} else {
			App.config.currentTemplate.emitFiles();
		}
	},
};

export default App;
