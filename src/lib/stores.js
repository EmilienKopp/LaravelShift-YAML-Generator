import { writable, readable } from "svelte/store";
import Resource from "./Resource";

export const transferObject = writable({});

export const modelFields = writable([]);

export const resource = writable(new Resource());

export const DRAGGABLE_CONFIG = readable( {
    'models': {
        'propertyClass': 'model-prop',
        'idFormat': 'model-prop',
        'inputNames': { 'name': 'name-input', 'size': 'size-input', 'dataType': 'select-datatype'},
    },
    'controllerActions': {
        'propertyClass': 'controller-action',
        'idFormat': 'controller-action',
        'actionName': {'index': 'index', 'store':'store','update':'update','delete':'delete'},
        'freeInputProperties': {
            'index': ['render'],
            'store': ['validate','save','send','flash','redirect'],
        }
    }
});