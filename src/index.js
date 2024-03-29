#!/usr/bin/env node
import cosmiconfig from 'cosmiconfig';
import App from './app';

const config = cosmiconfig('templateman', {
  sync: true,
  rcExtensions: true,
});

App.run(config.load());
