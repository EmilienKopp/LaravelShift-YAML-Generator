

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
        console.log(element.classList);
        element.classList.forEach( (className) => {
            switch (className) {
              /* Process a Model Attribute Definition */
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
              /* Process the 'store()' controller action */
              case 'store' :
                console.log('Analyzing the store() options');
                let statements = [];
                config.controllerActions.statements['store'].forEach( (statement) => {
                    let value = element.querySelectorAll(`input[id*="${statement}-input"]`)[0].value;
                    if(!value) return;
                    let options = element.querySelectorAll(`input[id*="${statement}-option"]`)[0].value;
                    statements.push({ name: statement, value: value, options: options});
                });
                this.controllerActions.push({
                    'action': 'store',
                    'statements': statements,
                });
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