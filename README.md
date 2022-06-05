# Address Autocomplete

> Neste projeto voce vai aprender como fazer um autocomplete de endereços usando CEP apenas com javascript.

#### 1 - O primeiro passo é fazer a estrutura HTML, que usamos [Bootstrap](https://getbootstrap.com/) para fazer as estilizações, voce pode voce pode encontrar o código HTML [Aqui](https://github.com/jpedrosnts/address-autocomplete/blob/master/index.html).

#### 2 - O segundo passo é criar um arquivo JS que vai ser responsável por fazer o autocomplete, voce pode encontrar o código JS [Aqui](https://github.com/jpedrosnts/address-autocomplete/blob/master/script.js).

#### 3 - Agora vamos declarar as variáveis dos campos de texto.

```js
const $cep = document.querySelector("#txtCep");
const $numero = document.querySelector("#txtNumero");
const $rua = document.querySelector("#txtRua");
const $bairro = document.querySelector("#txtBairro");
const $complemento = document.querySelector("#txtComplemento");
const $cidade = document.querySelector("#txtCidade");
const $estados = document.querySelector("#cmbEstados");
```

#### 4 - Agora temos que criar uma função para ser executada quando a janela for carregada, e criar um evento na caixa de texto do CEP para que toda vez que algo for digitado ela seja executada.

```js
function Main() {
  $cep.addEventListener("keyup", (e) => {
    // ...
  });
}
window.onload = Main();
```

#### 5 - Agora iremos criar uma função para validar se o CEP digitado é válido.

```js
function validarCep(cep) {
  if (cep.length != 8 || cep.length > 8 || isNaN(cep)) {
    return false;
  } else {
    return true;
  }
}
```

#### 6 - Agora iremos criar uma função que recebe um valor Boolean para saber se o CEP é válido ou não, e pinta a borda da caixa de texto do CEP de verde caso seja válido, e vermelho se for inválido.

```js
function cepSuccessError(validCep) {
  if (validCep) {
    $cep.classList.remove("border-danger");
    $cep.classList.add("border-success");
  } else {
    $cep.classList.remove("border-success");
    $cep.classList.add("border-danger");
  }
}
```

#### 7 - Agora iremos criar uma função para limpar os campos de texto.

```js
function clearInputs() {
  $rua.value = "";
  $bairro.value = "";
  $complemento.value = "";
  $cidade.value = "";
  $estados.value = "";
  $numero.value = "";
}
```

#### 8 - Agora vamos criar uma função para popular os campos de texto com os dados do endereço, basicamente se houver erro ela limpa os campos de texto usando a função que criamos anteriormente, caso tudo ocorra bem ela preenche os campos com os dados.

```js
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
```

#### 9 - Agora vamos criar uma função assíncrona para buscar o endereço usando CEP, e para isso iremos usar a API do [ViaCEP](https://viacep.com.br/).

```js
async function fetchEndereco(cep) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return await res.json();
}
```

#### 10 - Agora vamos voltar até a função Main() para invocar as funções que acabamos de criar, nela estarei comentando o que cada linha é responsável.

```js
function Main() {
  $cep.addEventListener("keyup", (e) => {
    // A linha abaixo é responsável por pegar o valor do CEP da caixa de texto e armazenar na variável cep
    const cep = e.target.value;
    // A linha abaixo é responsável por validar o CEP e armazenar na variável se é valido.
    const validCep = validarCep(cep);
    // A linha abaixo pinta a borda da caixa de texto de vermelho caso o CEP não seja válido e de verde quando é válido.
    cepSuccessError(validCep);
    // A linha abaixo é responsável por buscar os dados e coloca-los no campo de texto caso o CEP seja válido.
    if (validCep) fetchEndereco(cep).then((res) => changeInputs(res));
  });
}
```

#### 11 - Como podemos ver a aplicação está funcionando e ficou desta maneira.

![Gif da aplicação funcionando](https://i.imgur.com/GoxCtIl.gif)
