import _ from 'lodash';
import parsing from './parser.js';

export default (filepath1, filepath2) => {
  const data1 = { ...parsing(filepath1) };
  const data2 = { ...parsing(filepath2) };

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(keys1.concat(keys2));
  const uniqKeys = _.uniq(allKeys);

  const result = [];

  for (const key of uniqKeys) {
    if (!keys1.includes(key)) {
      result.push(`+ ${key}: ${data2[key]}`);
    } else if (keys1.includes(key) && keys2.includes(key)) {
      if (data1[key] === data2[key]) {
        result.push(`  ${key}: ${data1[key]}`);
      } else {
        result.push(`- ${key}: ${data1[key]}`);
        result.push(`+ ${key}: ${data2[key]}`);
      }
    } else if (keys1.includes(key) && !keys2.includes(key)) {
      result.push(`- ${key}: ${data1[key]}`);
    }
  }
  const prettyResult = result.map((s) => `  ${s}`).join('\n');

  console.log(`{\n${prettyResult}\n}`);
  return `{\n${prettyResult}\n}`;
};