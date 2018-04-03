#!/usr/bin/env node
import cosmiconfig from 'cosmiconfig';
import App from './App';

//TODO: add package.json engines field
//TODO: add message about successfully created component
//TODO: use this.path instead of process.cwd() by replacing all cosmiconfig.config paths to absolute
//TODO: handle error if "templates" array is empty

const config = cosmiconfig('templateman', {
	sync: true,
	rcExtensions: true,
});

App.run(config.load());
