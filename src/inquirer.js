import chalk from 'chalk';
import caser from 'caesar-caser';

const Inquirer = {
  templatesConfig: templateNames => [
    {
      type: 'list',
      name: 'template',
      message: 'Choose your template:',
      choices: templateNames,
    },
  ],

  varsConfig: varNames => {
    return varNames.map(varName => ({
      type: 'input',
      name: varName,
      message: `${caser(varName).convert('constant', 'sentence')}:`,
    }));
  },

  printWelcome: () => {
    console.log(chalk.green('┌────────────────────────┐'));
    console.log(chalk.green('│ Templateman CLI        │'));
    console.log(chalk.green('└────────────────────────┘'));
  },

  printSuccess: () => {
    console.log(chalk.green('✔ Templates successfully generated!'));
  },
};

export default Inquirer;
