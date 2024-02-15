import _ from 'lodash';

export default (diff) => {
    const p = 'Property';
    const added = 'was added with value: ';
    const removed = 'was removed';
    const updated = 'was updated.';
    const fromTo = (val1, val2) => `From ${val1} to ${val2}`;
    const path = [];
    const depth = [0];
    const result = diff.map((item) => {
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
        };
        const currentPath = path.join('.');
        const complexCheck = (val) => {
            if (_.isObject(val)) {
                return `[complex value]`;
            } else if (_.isBoolean(val) || _.isNull(val)) {
                return `${val}`;
            } else if (_.isString(val)) {
                return `'${val}'`;
            }
        };
        if (item.status === '+') {
            return `${p} '${currentPath}' ${added}${complexCheck(item.value)}`;
        } else if (item.status === '-') {
            return `${p} '${currentPath}' ${removed}`;
        } else if (item.status === '-+') {
            return `${p} '${currentPath}' ${updated} ${fromTo(complexCheck(item.value.old), complexCheck(item.value.new))}`;
        }
    });
    const prettyResult = result.filter((item) => item !== undefined);
    const final = [
        ...prettyResult,
    ].join('\n');
    return final;
};