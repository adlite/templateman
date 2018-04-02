#!/usr/bin/env node
import cosmiconfig from 'cosmiconfig';
import App from './App';

const config = cosmiconfig('templateman', {
	sync: true,
	stopDir: process.cwd(),
	rcExtensions: true,
});

new App(config.load());
