const $cep = document.querySelector("#txtCep");
const $numero = document.querySelector("#txtNumero");
const $rua = document.querySelector("#txtRua");
const $bairro = document.querySelector("#txtBairro");
const $complemento = document.querySelector("#txtComplemento");
const $cidade = document.querySelector("#txtCidade");
const $estados = document.querySelector("#cmbEstados");

function validarCep(cep) {
    if (cep.length != 8 || cep.length > 8 || isNaN(cep)) {
        return false;
    } else {
        return true;
    }
}

function cepSuccessError(validCep) {
    if (validCep) {
        $cep.classList.remove("border-danger");
        $cep.classList.add("border-success");
    } else {
        $cep.classList.remove("border-success");
        $cep.classList.add("border-danger");
    }
}

async function fetchEndereco(cep) {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return await res.json();
}

function clearInputs() {
    $rua.value = "";
    $bairro.value = "";
    $complemento.value = "";
    $cidade.value = "";
    $estados.value = "";
    $numero.value = "";
}

function changeInputs(endereco) {
    if (!endereco.erro) {
        $rua.value = endereco.logradouro;
        $bairro.value = endereco.bairro;
        $complemento.value = endereco.complemento;
        $cidade.value = endereco.localidade;
        $estados.value = endereco.uf;
        $numero.value = "";
    } else {
        clearInputs();
    }
}

function Main() {
    $cep.addEventListener("keyup", (e) => {
        const cep = e.target.value;
        const validCep = validarCep(cep);

        cepSuccessError(validCep);
        if (validCep) fetchEndereco(cep).then((res) => changeInputs(res));
    });
}
window.onload = Main();