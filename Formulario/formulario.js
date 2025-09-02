function ExibirMensagem(msg){
    alert(msg);
}
 function Salvar(){
    const inputNome = document.querySelector("#txtNome");
    const inputSobrenome = document.querySelector("#txtSobrenome");
    const inputGenero = document.querySelector("#txtGenero");
    const inputEstado = document.querySelector("#txtEstado");
    const inputEmail = document.querySelector("#txtEmail");
    const inputData = document.querySelector("#txtData");
    const inputCidade = document.querySelector("#txtCidade");
    const inputSenha = document.querySelector("#txtSenha");
    const inputConfirmar = document.querySelector("#txtConfirmar");
    const inputTermos = document.querySelector("#txtTermos");
    const formOK = ValidarFormulario(inputNome, inputSobrenome, inputGenero, inputEstado, inputEmail, inputData, inputCidade, inputSenha, inputConfirmar, inputTermos);
    if(formOK == false)
    {
        return;
    }
}

function ValidarFormulario(nome, sobrenome, genero, estadocvl, email, dtncmt, cidade, senha, confsenha, termos){
    if(nome.value == ""){
        ExibirMensagem("Preencha nome");
        nome.focus();
        return false;
    }
    if(sobrenome.value == ""){
        ExibirMensagem("Preencha Sobrenome");
        sobrenome.focus();
        return false;
    }
    if(genero.value == ""){
        ExibirMensagem("Preencha Gênero");
        genero.focus();
        return false;
    }
    if(estadocvl.value == ""){
        ExibirMensagem("Preencha Estado Civil");
        estadocvl.focus();
        return false;
    }
    if(email.value == ""){
        ExibirMensagem("Preencha Email");
        email.focus();
        return false;
    }
    if(dtncmt.value == ""){
        ExibirMensagem("Preencha Data de Nascimento");
        dtncmt.focus();
        return false;
    }
    if(cidade.value == ""){
        ExibirMensagem("Preencha Cidade");
        cidade.focus();
        return false;
    }
    if(senha.value == ""){
        ExibirMensagem("Preencha Senha");
        senha.focus();
        return false;
    }
    if(confsenha.value == ""){
        ExibirMensagem("Confirme sua senha");
        confsenha.focus();
        return false;
    }
    if(!termos){
        ExibirMensagem("Concorde com os Termos");
        termos.focus();
        return false;
    } 
    return true;
}
