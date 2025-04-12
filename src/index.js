const fs = require('fs');

const listaInfoTerminal = process.argv;
const link = listaInfoTerminal[2];

console.log((link), '\n');

fs.readFile(link, 'utf-8', (err, texto) => {
    if (err) throw err;
    separaEmParagrafos(texto);
});

function separaEmParagrafos(texto) {
    // const contagem = paragrafos
    // .filter((paragrafo) => paragrafo)
    // .map((paragrafo) => {
    //     return verificaPalavrasDuplicadas(paragrafo);
    // }); ISSO FOI DESCONTINUADO POIS HÁ DOIS LOOPS
    const paragrafos = texto.toLowerCase().split('\n');
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