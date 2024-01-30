import path from 'path';
import fs from 'fs';

export default (filepath) => {
    const curdir = process.cwd();
    const filePath = path.resolve(curdir, filepath);

    return JSON.parse(fs.readFileSync(filePath));
};