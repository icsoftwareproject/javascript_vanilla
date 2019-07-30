//sistema de modulo
//import {View} from './View';

// extends é o conceito de herança do javascript
class MensagemView extends View {

    constructor(elemento){
 // super manda o elemento para a classe pai / herdada
        super(elemento);
    }
 
    template(model){
        
        return model.texto ? `<p class="alert alert-info"> ${model.texto}  </p>` : '<p></p>';
    }
 


   
}