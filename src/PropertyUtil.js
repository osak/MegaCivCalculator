/**
 * Created by osak on 16/06/29.
 */

export default class PropertyUtil {
    /**
     * Update original hash with diff.
     * Original hash will be modified.
     *
     * @param original
     * @param diff
     * @param name
     */
    static update(original, diff, name = '') {
        if (Array.isArray(original)) {
            return PropertyUtil.updateArray(original, diff, name);
        } else {
            Object.keys(diff).forEach((key) => {
                let target = original[key];
                let targetName = name + '.' + key;
                let spec = diff[key];
                if (typeof spec !== 'object') {
                    if (typeof target === 'object') {
                        throw 'Invalid assign: ' + targetName + ' is not primitive';
                    }
                    original[key] = spec;
                } else {
                    PropertyUtil.update(target, spec, targetName);
                }
            });
            return original;
        }
    }

    static updateArray(original, diff, name) {
        if (!Array.isArray(diff)) {
            throw 'Invalid diff: ' + name + ' should be array';
        }
        diff.forEach((spec) => {
            let target = original[spec.index];
            let targetName = name + '[' + spec.index + ']';
            if (typeof spec.value !== 'object') {
                if (typeof target === 'object') {
                    throw 'Invalid assign: ' + targetName + ' is not primitive';
                }
                original[spec.index] = spec.value;
            } else {
                PropertyUtil.update(original[spec.index], spec.value, targetName);
            }
        });
        return original;
    }
}
