class ProxyFactory{
    
    static create(objeto, props, acao){
     
        return new Proxy(objeto, {
                    get: function (target, prop, receiver) {
            
                        // cria uma lista par ser intercepada && é uma funcao ?
                        if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){
            
                            return function () {
                                //console.log(`intercepando ${prop}`);
                                
                                /// arguments possuis todos os arqgumetnos da funcoes original
                                /// Replet.apply faz a esta funcao receber todos os argumentos
                                Reflect.apply(target[prop], target, arguments);
                                return acao(target);
                            };
            
                        }
            
                        return Reflect.get(target, prop, receiver);
                    },
                    set(target, prop, value, receiver) {
                        if(props.includes(prop)) {
                            target[prop] = value;
                            acao(target);
                        }
                        return Reflect.set(target, prop, value, receiver);
                    }
            });
    }

    static _ehFuncao(func){

      return typeof(func) == typeof(Function);
    }
}