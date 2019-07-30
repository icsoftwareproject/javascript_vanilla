class ListaNegociacoes{


    constructor(armadilha){

        this._negociacoes = [];
        this._armadilha = armadilha;
    }


    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    get negociacoes(){
        return this._negociacoes.slice(0);
    }

    esvazia (){
        this._negociacoes = [];
    }
    

}