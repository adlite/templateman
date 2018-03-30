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
					to: './output/${TM_COMPONENT_DIRNAME}/style.styl',
				},
				{
					from: './templates/index.js.tm',
					to: './output/${TM_COMPONENT_DIRNAME}/index.js',
				},
			],
		},
		{
			name: 'React Function',
			path: {
				from: './templates/react-func.js.tm',
				to: './output/${TM_COMPONENT_FILENAME}.js',
			},
		},
		{
			name: 'React Class',
			path: {
				from: './templates/react-class.js.tm',
				to: './output/${TM_COMPONENT_FILENAME}.js',
			},
		},
		{
			name: 'Stylus Stylesheet',
			path: {
				from: './templates/react-class.js.tm',
				to: './output/${TM_COMPONENT_FILENAME}.js',
			},
		},
	],
};
