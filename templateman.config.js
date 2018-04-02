module.exports = {
	templates: [
		{
			name: 'React Function Component',
			files: [
				{
					from: './templates/react-func.js.tm',
					to: './output/${TM:COMPONENT_DIRNAME}/${TM:COMPONENT_FILENAME}.js',
				},
				{
					from: './templates/style.styl.tm',
					to: './output/${TM:COMPONENT_DIRNAME}/style.styl',
				},
				{
					from: './templates/index.js.tm',
					to: './output/${TM:COMPONENT_DIRNAME}/index.js',
				},
			],
		},
		{
			name: 'React Function',
			files: {
				from: './templates/react-func.js.tm',
				to: './output/${TM:COMPONENT_FILENAME}.js',
			},
		},
		{
			name: 'React Class',
			files: {
				from: './templates/react-class.js.tm',
				to: './output/${TM:COMPONENT_FILENAME}.js',
			},
		},
		{
			files: 'Stylus Stylesheet',
			path: {
				from: './templates/react-class.js.tm',
				to: './output/${TM:COMPONENT_FILENAME}.js',
			},
		},
		{
			name: 'No vars JavaScript class',
			files: {
				from: './templates/export-class.js.tm',
				to: './output/export-class.js',
			},
		},
	],
};
