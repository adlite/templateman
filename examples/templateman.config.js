module.exports = {
	templates: [
		{
			name: 'React Function Component',
			path: [
				{
					from: './templates/react-func.js.tm',
					to: './output/${TM_COMPONENT_NAME}/${TM_COMPONENT_NAME}.js',
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
				to: './output/${TM_COMPONENT_NAME}.js',
			},
			vars: {
				COMPONENT_NAME: 'Component name',
			},
		},
		{
			name: 'React Class',
			path: {
				from: './templates/react-class.js.tm',
				to: './output/${TM_COMPONENT_NAME}.js',
			},
			vars: {
				COMPONENT_NAME: 'Component name',
			},
		},
		{
			name: 'Stylus Stylesheet',
			path: {
				from: './templates/react-class.js.tm',
				to: './output/${TM_COMPONENT_NAME}.js',
			},
			outputDir: './output',
			vars: {
				COMPONENT_CLASS: 'Component class',
			},
		},
	],
};
