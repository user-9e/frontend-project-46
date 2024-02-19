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
        path.pop();
        path.push(item.key);
        break;
      case -1:
        path.pop();
        path.pop();
        path.push(item.key);
        break;
      case -2:
        path.pop();
        path.pop();
        path.pop();
        path.push(item.key);
        break;
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