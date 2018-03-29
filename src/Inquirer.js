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
		//TODO: implement Inquirer.varsConfig()
	}
}
