module.exports = {
	templates: [
		{
			name: 'React Function Component',
			path: [
				{
					from: './templates/react-func.js.tm',
					to: './output/${TM_COMPONENT_DIRNAME}/${TM_COMPONENT_FILENAME}.js',
				},
				{
					from: './templates/style.styl.tm',
					to: './output/${TM_COMPONENT_NAME}/style.styl',
				},
				{
					from: './templates/index.js.tm',
					to: './output/${TM_COMPONENT_NAME}/index.js',
				},
			],
			vars: {
				COMPONENT_NAME: 'Component name',
			},
		},
		{
			name: 'React Function',
			path: {
				from: './templates/react-func.js.tm',
				to: './output/${TM_COMPONENT_FILENAME}.js',
			},
			vars: {
				COMPONENT_NAME: 'Component name',
			},
		},
		{
			name: 'React Class',
			path: {
				from: './templates/react-class.js.tm',
				to: './output/${TM_COMPONENT_FILENAME}.js',
			},
			vars: {
				COMPONENT_NAME: 'Component name',
			},
		},
		{
			name: 'Stylus Stylesheet',
			path: {
				from: './templates/react-class.js.tm',
				to: './output/${TM_COMPONENT_FILENAME}.js',
			},
			outputDir: './output',
			vars: {
				COMPONENT_CLASS: 'Component class',
			},
		},
	],
};
