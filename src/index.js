#!/usr/bin/env node
import cosmiconfig from 'cosmiconfig';
import App from './App';

//TODO: add package.json keywords
//TODO: create Logger
//TODO: add message about successfully created component

const config = cosmiconfig('templateman', {
	sync: true,
	rcExtensions: true,
});

App.run(config.load());
