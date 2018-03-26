module.exports = {
	templates: [
		{
			name: 'react-func',
			prettyName: 'React Function',
			path: './templates/react-func.js.tman',
			outputDir: './components',
			vars: {
				COMPONENT_NAME: 'Component name',
			},
		},
		{
			name: 'react-class',
			prettyName: 'React Class',
			path: './templates/react-class.js.tman',
			outputDir: './components',
			vars: {
				COMPONENT_NAME: 'Component name',
			},
		},
		{
			name: 'stylus-file',
			prettyName: 'Stylus Stylesheet',
			path: './templates/stylus.styl.tman',
			outputDir: './components',
			vars: {
				COMPONENT_CLASS: 'Component class',
			},
		},
	],
};
