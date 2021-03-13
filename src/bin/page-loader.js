#!/usr/bin/env node
import program from 'commander';
import pageLoader from '..';

program.description('Load html page and save local')
  .version('0.0.1')
  .arguments('<url> [dest]')
  .description('test command', {
    url: 'url for download html page',
    dest: 'path to store downloaded page',
  })
  .action(async (url, dest = __dirname) => {
    console.log('page stored to: ', await pageLoader(url, dest));
  });

program.parse(process.argv);
