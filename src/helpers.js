function capturaPalavrasDuplicadas (objetoParagrafo) {
    return Object.keys(objetoParagrafo).filter((chave) => objetoParagrafo[chave] > 1);
}

function montaSaida (listaFinalPalavras) {
    let saida = '';
    listaFinalPalavras.forEach((paragrafo, indice) => {
        const paragrafoArrumado = capturaPalavrasDuplicadas(paragrafo).join(', ');  
        saida += `paragrafo ${indice}: ${paragrafoArrumado}\n`;
    });
    return saida;
}

export { montaSaida };