import { attributePropertiesStore } from "./stores";
export default class Resource {
    mode;
    controllerActions;

    constructor() {
        this.name = '';
        this.model = { 
            columns: []
        };
        this.controllerActions = [];
        this.views = [];
        this.customRequest = undefined;
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