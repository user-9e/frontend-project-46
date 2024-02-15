import plain from "./plain.js";
import stylish from "./stylish.js";

export default (diff, format) => {
    if (format === 'stylish') {
        return stylish(diff);
    } else if (format === 'plain') {
        return plain(diff)
    } else return diff;
};