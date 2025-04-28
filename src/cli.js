import fs from 'fs';
import path from 'path';
import trataEror from './erros/tratadorErros.js';
import chalk from 'chalk';
import { contaPalavras } from './index.js';
import { montaSaida } from './helpers.js';
import { Command } from 'commander';

const program = new Command();
program
.version('0.0.1')
.option('-t, --texto <string>', 'caminho do texto a ser processado')
.option('-d, --destino <string>', 'caminho da pasta para o resultado')
.action((options) => {
    const {texto, destino} = options;
    if (!texto || !destino) {
        console.error(chalk.red('erro: informar caminho do texto e do destino'));
        program.help();
        return;
    }

    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);

    try {
        processaArquivo(caminhoTexto, caminhoDestino);
        console.log(chalk.green('Arquivo criado com sucesso'));
    } catch (e) {
        console.log(chalk.red('Houve um erro'), e);
    }
});

program.parse();


// const listaInfoTerminal = process.argv;
// const link = listaInfoTerminal[2];
// const enderecoPastaSalvar = listaInfoTerminal[3];

function processaArquivo (caminhoTexto, caminhoDestino) {
    fs.readFile(caminhoTexto, 'utf-8', (err, texto) => {
        try {
            if (err) throw err;
            const resultado = contaPalavras(texto);
            criarArquivo(resultado, caminhoDestino);
            console.log('2 - (fora da func)');
        } catch (erro) {
            trataEror(erro);
        }
});
}


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