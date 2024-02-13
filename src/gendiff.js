import _ from 'lodash';
import stylish from './formatter.js';
import parsing from './parser.js';

const iter = (data1, data2, depth = 1) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.uniq(_.sortBy(keys1.concat(keys2)));
  const result = [];

  uniqKeys.forEach((key) => {
    if (_.isObject(data1[key]) && (_.isObject(data2[key]))) {
      result.push({ status: ' ', depth, key, value: '{' });
      result.push(...iter(data1[key], data2[key], depth + 1));
    } else if (!keys1.includes(key)) {
      result.push({ status: '+', depth, key, value: data2[key] });
    } else if (keys1.includes(key) && keys2.includes(key)) {
      if (data1[key] === data2[key]) {
        result.push({ status: ' ', depth, key, value: data1[key] });
      } else {
        result.push({ status: '-', depth, key, value: data1[key] });
        result.push({ status: '+', depth, key, value: data2[key] });
      }
    } else if (keys1.includes(key) && !keys2.includes(key)) {
      result.push({ status: '-', depth, key, value: data1[key] });
    }
  });
  return result;
};

export default (filepath1, filepath2) => {
  const data1 = { ...parsing(filepath1) };
  const data2 = { ...parsing(filepath2) };

  const result = iter(data1, data2);
  const prettyResult = stylish(result);
  return prettyResult;
};
