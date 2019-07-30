var botao = document.getElementById('calcula-imcs');
/**
 * Faz o cálculo de todos os IMCs da tabela.
 */
botao.addEventListener('click', function() {
    var trPacientes = document.getElementsByClassName('paciente');

    for(var i = 0; i <= trPacientes.length; i++) {
        var trPaciente = trPacientes[i];
        var paciente = montaPaciente(trPaciente);
        trPaciente.getElementsByClassName('info-imc')[0].textContent = paciente.getIMC();
    }

});
