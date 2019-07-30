// import {NegociacaoService} from '../services/NegociacaoService';
// import {NegociacaoView} from '../views/NegociacoesView';
// import {ListaNegociacoes} from '../models/ListaNegociacoes';
// import {MensagemView} from '../views/MensagemView';
// import {Mensagem} from '../models/Mensagem';
// import {DateHelper} from '../helpers/DateHelper';
// import {Bind} from '../helpers/Bind';
// import {Negociacao} from '../models/Negociacao';


class NegociacaoController{


    constructor() {
        //bind preservar o context da execução para um função que execute em outro contexto
        let $ = document.querySelector.bind(document);
        let form  = $(".form");
        this._quantidade = form.quantidade;
        this._data = form.data;
        this._valor = form.valor;
        this._service = new NegociacaoService();
        
                
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), new NegociacaoView($("#negociaceosView")),
            'adiciona','esvazia'
        );
        
        
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($("#mensagemView")),
            'texto'
        );

        this._init();
    }
    
    _init(){
        new NegociacaoService()
          .lista()
          .then(negociacoes => 
            negociacoes.forEach(i => 
                this._listaNegociacoes.adiciona(i))
            )
          .catch(erro => this._mensagem.texto = erro);
    }


    adiciona(event){

        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
          .cadastra(negociacao)
          .then(mensagem => {
                this._listaNegociacoes.adiciona(this._criaNegociacao());
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
          })
          .catch(erro => this._mensagem.texto = erro);
    }

    apaga(){
        this._service
          .apaga()
          .then(mensagem => {
            this._listaNegociacoes.esvazia();
            this._mensagem.texto = mensagem;
          })
          .catch(erro => this._mensagem.texto = erro);


    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._data.value), 
            this._quantidade.value, 
            this._valor.value
        );
    }

   
    _limpaFormulario(){
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus();
    }

}