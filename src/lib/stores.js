import { writable, readable } from "svelte/store";
import Resource from "./Resource.js";
import ControllerActions from "./ControllerActions.js";

export const modelData = writable({});

export const disabledColumns = writable([]);

export const columns = writable([]);

export const menuRightmost = writable();

export const resource = writable(new Resource());

export const YAML = writable();

export const attributePropertiesStore = writable([]);

export const CONFIG = readable( {
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
        },

    },
});

export const DATA_TYPES = writable([
    {type:'int',common: true},
    {type:'string',common: true, parameters: [ {name: 'size', input:'text'} ]},
    {type:'decimal',common: true, parameters: [ {name: 'precision', input:'text'}, {name: 'scale', input:'text'} ]},
    {type:'bigInt',common: true},
    {type:'float',common: true, parameters: [ {name: 'precision', input:'text'}, {name: 'scale', input:'text'} ]},
    {type:'double',common: true},
    {type:'boolean',common: true},
    {type:'date',common: true},
    {type:'dateTime',common: true},
    {type:'dateTimeTz'},
    {type:'time', parameters: [{name: 'precision', input:'text'}]},
    {type:'timeTz', parameters: [{name: 'precision', input:'text'}]},
    {type:'timestamp',common: true, parameters: [{name: 'precision', input:'text'}]},
    {type:'timestamps', parameters: [{name: 'precision', input:'text'}]},
    {type:'timestampTz', parameters:[{name: 'precision', input:'text'}]},
    {type:'timestamsTz', parameters: [{name: 'precision', input:'text'}]},
    {type:'year'},
    {type:'char', parameters: [{name:'size', input:'text'}]},
    {type:'binary'},
    {type:'uuid'},
    {type:'json'},
    {type:'jsonb'},
    {type:'longText',common: true},
    {type:'mediumText'},
    {type:'tinyText'},
    {type:'text',common: true},
    {type:'mediumBlob'},
    {type:'longBlob'},
    {type:'blob'},
    {type:'tinyBlob'},
    {type:'enum',common: true, parameters: [{name:'values', input:'text'}]},
    {type:'set', parameters: [{name:'values', input:'text'}]},
    {type:'softDeletes', parameters: [{name: 'precision', input:'text'}]},
    {type:'softDeletesTz', parameters: [{name: 'precision', input:'text'}]},
    {type:'macAddress'},
    {type:'mediumIncrements'},
    {type:'lineString'},
    {type:'ipAddress'},
    {type:'increments'},
    {type:'geometry'},
    {type:'geometryCollection'},
    {type:'foreignIdFor'},
    {type:'foreignUuid'},
    {type:'multiPoint'},
    {type:'multiLineString'},
    {type:'multiPolygon'},
    {type:'nullableMorphs'},
    {type:'nullableUuidMorphs'},
    {type:'point'},
    {type:'polygon'},
    {type:'rememberToken'},
    {type:'smallIncrements'},
    {type:'smallInteger',common: true},
    {type:'tinyIncrements'},
    {type:'tinyInteger',common: true},
    {type:'unsignedBigInteger'},
    {type:'unsignedDecimal', parameters:[ {name: 'precision', input:'text'}, {name: 'scale', input:'text'} ]},
    {type:'unsignedInteger'},
    {type:'unsignedMediumInteger'},
    {type:'unsignedSmallInteger'},
    {type:'unsignedTinyInteger'},
    {type:'uuidMorphs'},
    {type:'uuid'},
    {type:'morphs'},
    {type:'years'},
]);

export const MODIFIERS = writable([
    {label:'nullable', checked: false, icon: 'reception-0', common: true},
    {label:'unique', checked: false, icon: 'dice-1', common: true},
    {label:'required', checked: false, icon: 'exclamation-circle', common: true},
    {label:'password', checked: false, icon: 'lock', common: true},
    {label:'url', checked: false, icon: 'link', common: true},
    {label:'autoIncrement', chain: ['from'] },
    {label:'unsigned', chain: ['from'] },
    {label:'after', input: 'text', placeholder: 'column name'},
    {label:'default', input:'text', placeholder: 'value'},
    {label:'foreign', input:'text',placeholder: 'foreign key', chain: ['references','on']},
    {label:'foreignId', input:'text', placeholder: 'foreign key', chain: ['constrained','onUpdate','onDelete']},
    {label:'primary',input:'text', placeholder: 'primary key',chain:['autoIncrement']},
    {label:'index',input:'text', placeholder: 'index'},
    {label:'charset',input:'text', placeholder: 'charset'},
    {label:'collation',input:'text', placeholder: 'collation'},
    {label:'useCurrent'},
    {label: 'from', input:'text', placeholder: 'starting value'},
    {label: 'onDelete', input:'select', options:['cascade','restrict','set null','no action']},
]);