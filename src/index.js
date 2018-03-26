#!/usr/bin/env node
import cosmiconfig from 'cosmiconfig';
import App from './App.js';

const config = cosmiconfig('templateman', {
	sync: true,
	stopDir: process.cwd(),
	rcExtensions: true,
});

new App(config.load());
