import { writable, readable } from "svelte/store";
import Resource from "./Resource.js";
import ControllerActions from "./ControllerActions";

export const modelData = writable({});

export const modelProxies = writable([]);

export const menuRightmost = writable();

export const resource = writable(new Resource());

export const YAML = writable();

export const attributePropertiesStore = writable([]);

export const toggableProperties = writable([
    {label: 'nullable', checked: false, icon: 'reception-0'},
    {label: 'unique', checked: false, icon: 'slash-circle'},
    {label: 'required', checked: false, icon: 'exclamation-circle'},
    {label: 'password', checked: false, icon: 'lock'},
    {label: 'url', checked: false, icon: 'link'}
]);

export const DRAGGABLE_CONFIG = readable( {
    'models': {
        'propertyClass': 'model-prop',
        'idFormat': 'model-prop',
        'inputNames': { 'name': 'name-input', 'size': 'size-input', 'dataType': 'select-datatype'},
    },
    'controllerActions': {
        'propertyClass': 'controller-action',
        'idFormat': 'controller-action',
        'actionName': ControllerActions,
        'statements': {
            'index': ['render'],
            'store': ['render','validate','save','send','flash','redirect'],
        }
    },
});