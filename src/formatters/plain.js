import _ from 'lodash';

export default (diff) => {
  const path = [];
  const depth = [0];
  const result = diff.map((item) => {
    depth.push(item.depth);
    switch (depth.at(-1) - depth.at(-2)) {
      case 1:
        path.push(item.key);
        break;
      case 0:
        path.splice(-1, 1, item.key);
        break;
      case -1:
        path.splice(-2, 2, item.key);
        break;
      case -2:
        path.splice(-3, 3, item.key);
        break;
      default:
        path.push(item.key);
    }
    const complexCheck = (val) => {
      if (_.isObject(val)) {
        return '[complex value]';
      } if (_.isBoolean(val) || _.isNull(val)) {
        return `${val}`;
      } return `'${val}'`;
    };
    if (item.status === '+') {
      return `Property '${path.join('.')}' was added with value: ${complexCheck(item.value)}`;
    } if (item.status === '-') {
      return `Property '${path.join('.')}' was removed`;
    } if (item.status === '-+') {
      return `Property '${path.join('.')}' was updated. From ${complexCheck(item.value.old)} to ${complexCheck(item.value.new)}`;
    }
    return undefined;
  });
  const prettyResult = result.filter((item) => item !== undefined);
  const final = [
    ...prettyResult,
  ].join('\n');
  return final;
};
