//import {Negociacao} from '../models/Negociacao';

class NegociacaoDao{

    constructor(connection){

        this._connection = connection;
        this._store = 'negociacoes';
    }

    apagaTodos(){

        return new Promise((resolve, reject) => {
            let request = this
            ._connection
            .transaction([this._store], "readwrite")
            .objectStore(this._store)
            .clear();

            request.onsuccess = e =>  resolve("Negociações removidas com sucesso");
            request.onerror = e => reject("Erro ao apagar as negociações");

        });
    }

    adiciona(negociacao){

        return new Promise((resolve, reject) =>{

            let request = this
                ._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negociacao);
  
  
              request.onsuccess = e =>{
                  resolve(e.target.result);
              };
  
              request.onerror = e =>{
                  reject("Não foi possivel a negociação");
                  console.log(`Erro na inclusao ${e.target.error}`);
              };
        });
    }

    listaTodos(){

         
        return new Promise((resolve, reject) => {

            let cursor = this._connection.transaction([this._store], 'readwrite')
                 .objectStore(this._store)
                 .openCursor();
            let negociacoes = [];
 
             
             cursor.onsuccess = e => {
 
                 //pega a linha da store
                 let atual = e.target.result;
 
                 //tem dados no cursosr
                 if (atual){
 
                     var dado = atual.value;
                     negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                     atual.continue();
                 }  else{
                      
                     resolve(negociacoes);
                 }
 
             };
 
             cursor.onerror = e =>{

                reject("Não foi possível listar as negociações");
             };


        });
    }
 




}