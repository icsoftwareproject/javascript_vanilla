var ConnectionFactory = (function () {  

    
    const stores = ['negociacoes'];
    const version = 6;
    const dbName = 'negociacaodb';

    var connection = null;
    var close = null;
    
    return class ConnectionFactory{
    
        constructor(){
    
            throw new Error("Esta classe não pode ser instanciada");
        }
        
        
        static getConnection(){
    
            return new Promise((resolve, reject) => {
                let openRequest = indexedDB.open(dbName, version);
                
                openRequest.onupgradeneeded = e =>{
                    console.log("Criando DB");
                    ConnectionFactory._createStore(e.target.result);
                };
                
                openRequest.onsuccess = e => {
                    if (!connection){
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        // monkey path
                        connection.close = function () {

                           throw new Error('Você não pode fechar diretamente a conexão') ;
                        };
                    }
                    console.log("Conectado no DB");
                    resolve(connection);
                };
                
                openRequest.onerror = e =>  {
                    
                    reject(`Erro na abertura: ${ e.target.result.error.name}`);
                };
                
            });
           
    
            
    
        }
    
        
        static _createStore(connection){
    
            stores.forEach(store => {
                
                if (connection.objectStoreNames.contains(store)){
                    connection.deleteObjectStore(store);
                }
    
                connection.createObjectStore(store, { autoIncrement: true});
            });
        }

        static closeConnection(){

            if (connection){
                close();
                connection = null;
            }
        }
    
    
    };
})();