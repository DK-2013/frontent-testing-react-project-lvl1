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
  .action((url, dest = __dirname) => {
    // eslint-disable-next-line no-console
    console.log('page stored to: ', pageLoader(url, dest));
  });

program.parse(process.argv);
