const fs = require('fs');
const tratadorErro = require('./erros/tratadorErros');
const trataErro = require('./erros/tratadorErros');

const listaInfoTerminal = process.argv;
const link = listaInfoTerminal[2];

fs.readFile(link, 'utf-8', (err, texto) => {
    try {
        if (err) throw err;
        contaPalavras(texto);
    } catch (erro) {
        trataErro(erro);
    }
});

function separaEmParagrafos (texto) {
    return texto.toLowerCase().split('\n');
}

function contaPalavras(texto) {
    const paragrafos = separaEmParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return verificaPalavrasDuplicadas(paragrafo);
    });
    console.log(contagem);
}

function limpaPalavra (palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function verificaPalavrasDuplicadas (texto) {
    const arrayPalavras = texto.split(' ');
    const resultado = {};

    arrayPalavras.forEach((palavra) => {
        // resultado[palavra] = (resultado[palavra] || 0) + 1;
        const palavraLimpa = limpaPalavra(palavra);
        if (palavraLimpa.length >= 3) {
            resultado[palavraLimpa] = resultado[palavraLimpa] ? resultado[palavraLimpa] + 1 : 1;
        }
    });
    return resultado;
}