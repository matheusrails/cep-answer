const axios = require('axios');
const { info } = require('console');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o CEP: ', async (cep) => {

  cep = cep.replace(/\D/g, '');

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const information = response.data;

    if (information.erro) {
      console.log('CEP não encontrado!');
    } else {
      console.log('\n Endereço encontrado:');
      console.log(`Rua:        ${information.logradouro}`);
      console.log(`Bairro:     ${information.bairro}`);
      console.log(`Cidade:     ${information.localidade}`);
      console.log(`Estado:     ${information.uf}`);
    }

  } catch (erro) {
    console.log('Erro ao buscar o CEP. Verifique sua conexão.');
  }

  rl.close();
});