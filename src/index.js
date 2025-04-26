function separaEmParagrafos (texto) {
    return texto.toLowerCase().split('\n');
}

export function contaPalavras(texto) {
    const paragrafos = separaEmParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return verificaPalavrasDuplicadas(paragrafo);
    });
    return contagem;
}

export function limpaPalavra (palavra) {
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