export default class Inquirer {
	static templatesConfig(templateNames) {
		return [
			{
				type: 'list',
				name: 'template',
				message: 'Choose your template below:',
				choices: templateNames,
			},
		];
	}

	static varsConfig(varNames) {
		return varNames.map((varName) => Inquirer.createInputConfig(varName));
	}

	static createInputConfig(varName) {
		return {
			type: 'input',
			name: varName,
			message: `${varName}:`,
		};
	}
}
