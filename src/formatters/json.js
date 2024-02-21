import _ from 'lodash';

export default (diff) => {
  const path = [];
  const depth = [0];
  const jsObject = { added: {}, deleted: {}, modified: {} };
  diff.forEach((item) => {
    depth.push(item.depth);
    const depthDiff = depth.at(-1) - depth.at(-2);
    switch (depthDiff) {
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
    const currentPath = path.join('.');
    const typeCheck = (val) => {
      if (_.isObject(val)) {
        return `${JSON.parse(JSON.stringify(val))}`;
      } if (_.isBoolean(val) || _.isNull(val) || _.isNumber(val)) {
        return val;
      }
      return `${val}`;
    };
    if (item.status === '+') {
      jsObject.added[currentPath] = typeCheck(item.value);
    } if (item.status === '-') {
      jsObject.deleted[currentPath] = typeCheck(item.value);
    } if (item.status === '-+') {
      jsObject.modified[currentPath] = {};
      jsObject.modified[currentPath].oldValue = typeCheck(item.value.old);
      jsObject.modified[currentPath].newValue = typeCheck(item.value.new);
    }
  });
  const final = JSON.stringify(jsObject);
  return final;
};
