import {nanoid} from 'nanoid';

export function makeUUID (size = 6, replacePairs = [[]], prefix = '', suffix = '' ) {
    let id = nanoid(size);
    replacePairs.forEach(pair => {
        id = id.replace(pair[0], pair[1]);
    });
    return prefix + id + suffix;
}

export function arrayTransfer( uuid, from, to) {
    let transferElement = from.find(element => element.UUID == uuid);
    if (transferElement) {
        console.log('transferElement', transferElement);
        from = from.filter(element => element.UUID !== uuid);
        to = [...to, transferElement];
    }
    console.log('from', from);
    console.log('to', to);
}