

export default class Resource {

    

    constructor() {
        this.name = '';
        this.model = { 
            attributes: []
        };
        this.controllerActions = [];
        this.views = [];
        this.customRequest = undefined;
    }
    
    updateFrom(element, config) {
        element.classList.forEach( (className) => {
            switch (className) {
              case config.models.propertyClass :
                let nameVal = element.querySelectorAll(`input[id*="${config.models.inputNames.name}"]`)[0].value;
                let sizeVal = element.querySelectorAll(`input[id*="${config.models.inputNames.size}"]`)[0].value;
                let typeVal = element.querySelectorAll(`select[id^="${config.models.inputNames.dataType}"]`)[0].value;
                let constraints = [];
                element.querySelectorAll('input[role="switch"]').forEach( (element) => {
                    if(element.checked) constraints.push(element.name);   
                });
                this.model.attributes.push( {'name': nameVal, 'size': sizeVal, 'validation': constraints, 'type': typeVal });
              break;
              case config.controllerActions.propertyClass :
                let actionName = element.querySelectorAll('input[type="hidden"]')[0].value;
                console.log(actionName);
                let options = [];
                config.controllerActions.freeInputProperties.forEach( (option) => {
                    let val = element.querySelectorAll(`input[id*=${option}]`)[0].value;
                    
                })
              break;
            }
          });
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