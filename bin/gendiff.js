#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/gendiff.js';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>', 'path to file 1')
    .argument('<filepath2>', 'path to file 2')
    .action((filepath1, filepath2, options) => {
        const frmt = program.opts().format;

        const result = gendiff(filepath1, filepath2);
        console.log(result);
        return result;

    });

program.parse();