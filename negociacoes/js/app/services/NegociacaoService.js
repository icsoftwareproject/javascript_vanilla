// import {HttpServices} from './HttpServices';
// import {ConnectionFactory} from './ConnectionFactory';
// import {NegociacaoDao} from '../dao/NegociacaoDao';
// import {Negociacao} from '../models/Negociacao';

class NegociacaoService{

    constructor() {
    }

    cadastra(negociacao){
         //usando o indexdb
         return ConnectionFactory
                    .getConnection()
                    .then(connection => new NegociacaoDao(connection))
                    .then(dao => dao.adiciona(negociacao))
                    .then(() => 'Negociação adicionada com sucesso')
                    .catch(() => { 
                        throw new Error('Não foi possível adicionar a negociação');
                    });
            
    }

    lista()
    {
        return  ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.listaTodos())
                .catch(erro => {
                    console.log(erro);
                    throw new Error("Não foi possível obter as negociações");
                });
    }

    apaga(){

        return  ConnectionFactory
                .getConnection()
                .then(connection => {
                    new NegociacaoDao(connection)
                    .apagaTodos()
                    .then(() => 'Negociações apagadas com sucess')
                    .catch(erro => {
                        console.log(erro);
                        throw new Error("Erro ao apagar as negociçaões");
                    });
                });
    }
    
}