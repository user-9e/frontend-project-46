import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

export default (filepath) => {
    const curdir = process.cwd();
    const filePath = path.resolve(curdir, filepath);

    const format = path.extname(filePath);
    const data = fs.readFileSync(filePath);

    let parse;

    if (format === '' || format === '.json') {
     parse = JSON.parse;
    } else if (format === '.yml' || format === '.yaml') {
     parse = yaml.safeLoad;
    } else if (format === '.ini') {
      parse = ini.parse;
    }

    return parse(data);
};