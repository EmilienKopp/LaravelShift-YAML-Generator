import {nanoid} from 'nanoid';

export function makeUUID (size = 6, replacePairs = [[]], prefix = '', suffix = '' ) {
    let id = nanoid(size);
    replacePairs.forEach(pair => {
        id = id.replace(pair[0], pair[1]);
    });
    return prefix + id + suffix;
}

export function formatModifierString (modifiersArray) {
    let str = '';
    modifiersArray.forEach( modifier => {
        str += modifier.label;
        if ( modifier.value || modifier.option) {
            str += ':' + (modifier.value || modifier.option);
        }
        str += ' ';
    });
    return str;
}