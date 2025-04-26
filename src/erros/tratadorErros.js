export default function trataErro (erro) {
    if (erro.code === 'ENOENT') {
        throw new Error('Caminho de arquivo inadequado');
    } else {
        throw new Error('Outro erro');
    }
}