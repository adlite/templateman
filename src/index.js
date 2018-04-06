#!/usr/bin/env node
import cosmiconfig from 'cosmiconfig';
import App from './App';

//TODO: add commas in README
//TODO: remove version patch from prepublish

const config = cosmiconfig('templateman', {
	sync: true,
	rcExtensions: true,
});

App.run(config.load());
