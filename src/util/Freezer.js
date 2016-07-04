/**
 * Created by osak on 16/06/30.
 */

export function deepFreeze(obj) {
    Object.freeze(obj);
    for (var key in obj) {
        let prop = obj[key];
        if (!obj.hasOwnProperty(key) || !(typeof prop == 'object') || Object.isFrozen(prop)) {
            continue;
        }
        deepFreeze(prop);
    }
    return obj;
}
