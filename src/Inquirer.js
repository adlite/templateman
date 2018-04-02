const Inquirer = {
	templatesConfig: (templateNames) => [
		{
			type: 'list',
			name: 'template',
			message: 'Choose your template below:',
			choices: templateNames,
		},
	],

	varsConfig: (varNames) => {
		return varNames.map((varName) => ({
			type: 'input',
			name: varName,
			message: `${varName}:`,
		}));
	},
};

export default Inquirer;
