import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('stylish nested gendiff', () => {
  const file1json = getFixturePath('file1.json');
  const file2yml = getFixturePath('file2.yml');
  const result = gendiff(file1json, file2yml, 'stylish');
  expect(result).toEqual(readFile('output.txt'));
});

test('plain nested gendiff', () => {
  const file1yml = getFixturePath('file1.yml');
  const file2json = getFixturePath('file2.json');
  const result = gendiff(file1yml, file2json, 'plain');
  expect(result).toEqual(readFile('plain.txt'));
});

test('json nested gendiff', () => {
  const file1json = getFixturePath('file1.json');
  const file2yml = getFixturePath('file2.yml');
  const result = gendiff(file1json, file2yml, 'json');
  expect(result).toEqual(readFile('output.json'));
});
