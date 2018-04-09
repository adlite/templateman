#!/usr/bin/env node
import cosmiconfig from 'cosmiconfig';
import App from './App';

//TODO: add commas in README

const config = cosmiconfig('templateman', {
	sync: true,
	rcExtensions: true,
});

App.run(config.load());
