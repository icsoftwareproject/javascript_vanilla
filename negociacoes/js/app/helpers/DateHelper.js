class DateHelper {
    
    constructor(){
        throw new Error('Esta classe não pode ser instanciada...');
    }
    /// ... spred transforam o array em parametros

    ///static deixa o metodo acessivel sem precisar instanciar a classe
    static textoParaData(texto){

        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)){
            throw new Error('Data invalida, deve estar no formato YYYY-MM-DD');
        }


        return new Date(...texto
            .split('-')
            .map( (item,indice) => item - indice % 2)
        );
        

    }

    static dataParaTexto(data){
        //usando template string
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }


}