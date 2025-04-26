import fs from 'fs';
import trataEror from './erros/tratadorErros.js'
import { contaPalavras } from './index.js';
import { montaSaida } from './helpers.js';

const listaInfoTerminal = process.argv;
const link = listaInfoTerminal[2];
const enderecoPastaSalvar = listaInfoTerminal[3];

fs.readFile(link, 'utf-8', (err, texto) => {
    try {
        if (err) throw err;
        const resultado = contaPalavras(texto);
        criarArquivo(resultado, enderecoPastaSalvar);
        console.log('2 - (fora da func)');
    } catch (erro) {
        trataEror(erro);
    }
});

// async function criarArquivo (listaPalavras, enderecoPasta) {
//     const caminhoArquivoNovo = `${enderecoPasta}/resultado.txt`;
//     const texto = JSON.stringify(listaPalavras);
//     try {
//         await fs.promises.writeFile(caminhoArquivoNovo, texto);
//         console.log('1 - arquivo criado');
//     } catch (e) {
//         throw e;
//     }
// }

function criarArquivo (listaPalavras, enderecoPasta) {
    const caminhoArquivoNovo = `${enderecoPasta}/resultado.txt`;
    const texto = montaSaida(listaPalavras);
    fs.promises.writeFile(caminhoArquivoNovo, texto)
    .then(() => {
        console.log('1 - arquivo criado');
    })
    .catch((e) => {
        throw e;
    })
    .finally(() => {
        console.log('finally');
    });
}