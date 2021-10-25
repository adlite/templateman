import chalk from 'chalk';
import inquirer from 'inquirer';
import Config from './config';
import Inquirer from './inquirer';

const App = {
  config: {},

  run: cosmiconfig => {
    try {
      App.config = new Config(cosmiconfig);
      App.inquireTemplates();
    } catch (err) {
      console.log(chalk.red(err));
    }
  },

  inquireTemplates: () => {
    const names = App.config.getTemplateNamesArray();
    Inquirer.printWelcome();

    inquirer
      .prompt(Inquirer.templatesConfig(names))
      .then(answers => {
        App.config.loadCurrentTemplate(answers.template);
        App.inquireVars();
      })
      .catch(err => console.log(chalk.red(err)));
  },

  inquireVars: () => {
    const {vars} = App.config;

    if (vars.length) {
      inquirer
        .prompt(Inquirer.varsConfig(vars))
        .then(answers => {
          App.config.emitFiles(answers);
          Inquirer.printSuccess();
        })
        .catch(err => console.log(chalk.red(err)));
    } else {
      App.config.emitFiles();
      Inquirer.printSuccess();
    }
  },
};

export default App;
