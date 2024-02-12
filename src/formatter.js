import _ from 'lodash';

const stylish = (diff) => {
  const stringify = (value, depth, replacer = ' ', spacesCount = 4) => {
    const iter = (currentItem, d) => {
      const indentSize = (d + 1) * spacesCount;
      const currentIndent = replacer.repeat(indentSize);
      const bracketIndent = replacer.repeat((d) * spacesCount);

      if (!_.isObject(currentItem)) {
        return `${currentItem}`;
      }

      const lines = Object
        .entries(currentItem)
        .map(([key, val]) => `${currentIndent}${key}: ${iter(val, d + 1)}`);

      const result = [
        '{',
        ...lines,
        `${bracketIndent}}`,
      ].join('\n');

      return result;
    };
    return iter(value, depth);
  };
  const indent = (depth) => ' '.repeat(depth * 4 - 2);
  const indentForBracket = (depth) => ' '.repeat(depth * 4);
  const stack = [1];
  const result = diff.map((item) => {
    stack.push(item.depth);
    const previousDepth = stack.at(-2);
    const currentDepth = stack.at(-1);
    const addBracket = currentDepth < previousDepth;

    if (addBracket) {
      if (previousDepth - currentDepth === 1) {
        return `${indentForBracket(item.depth)}}\n${indent(item.depth)}${item.status} ${item.key}: ${stringify(item.value, item.depth)}`;
      }
      if (previousDepth - currentDepth === 2) {
        return `${indentForBracket(item.depth + 1)}}\n${indentForBracket(item.depth)}}\n${indent(item.depth)}${item.status} ${item.key}: ${stringify(item.value, item.depth)}`;
      }
    }
    return `${indent(item.depth)}${item.status} ${item.key}: ${stringify(item.value, item.depth)}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default stylish;
