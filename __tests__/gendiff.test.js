import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  // ../__fixtures__/file
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = gendiff(file1, file2);
  expect(result).toEqual(readFile('output.txt'));
});
