import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

export default (diff, format) => {
  if (format === 'json') {
    return json(diff);
  } if (format === 'plain') {
    return plain(diff);
  }
  return stylish(diff);
};
