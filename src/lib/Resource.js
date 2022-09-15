import { attributePropertiesStore } from "./stores";
export default class Resource {
    model;
    controllerActions;

    relationships;
    hasResourceShorthand = false;

    constructor() {
        this.name = '';
        this.model = { 
            columns: []
        };
        this.controllerActions = [];
        this.views = [];
        this.customRequest = undefined;
        this.relationships = [
            {name:"hasMany", value: null},
            {name:"hasOne", value: null},
            {name: "belongsTo",value: null},
            {name: "belongsToMany", value: null}
        ];

    }

    serializeRelationships() {
        let activeRelationships = this.relationships.filter( r => r.value !== null);
        let hasNoActive = (activeRelationships == null || !activeRelationships.find(r => r.value));
        if (hasNoActive) return;
        let relationshipsObject = {};
        activeRelationships.forEach( r => {
            relationshipsObject[r.name] = r.value;
        });
        if(relationshipsObject) return relationshipsObject;
    }

    setName(n) {
        this.name = n;
    }

    setModel(m) {
        this.model = m;
    }

    setControllerActions(actions) {
        this.controllerActions = actions;
    }

    setViews(v) {
        this.views = v;
    }

    setCustomRequest(r) {
        this.customRequest = r;
    }
}