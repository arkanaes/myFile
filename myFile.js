const myFile = {
    download(blob, fileName = '') {
        const name = fileName ? fileName : getFileName(blob)
        //Cria um arquivo
        const file = new File([blob.data], name, { type: blob.data.type })
        //Criar uma URL temporária para o arquivo
        const downloadUrl = window.URL.createObjectURL(file);
        //Criar um link temporário
        const link = document.createElement('a');
        link.href = downloadUrl;
        // Nome do arquivo
        link.setAttribute('download', file.name);
        //Adicionar o link temporário ao DOM, clicar nele, e remover
        document.body.appendChild(link);
        link.click();
        link.remove();
        //Revogar o URL temporário
        window.URL.revokeObjectURL(downloadUrl);
    },
}

function getFileName(blob) {
    const contentDisposition = blob.headers['content-disposition']

    if (contentDisposition) {
        // Usando uma expressão regular para extrair o nome do arquivo
        const fileNameRegex = /filename=["']([^"']+)["']/;

        const match = contentDisposition.match(fileNameRegex);
        // Se houver uma correspondência, o nome do arquivo estará no grupo de captura 1
        if (match[1]) {
            return decodeAsciiToUtf8(match[1]);
        }
    }

    throw 'O arquivo baixado não possui header [content-disposition]. Informe o nome do arquivo no method download().';
}

function decodeAsciiToUtf8(text) {
    return text
        .replace(/Ã¡/g, 'á')
        .replace(/Ã©/g, 'é')
        .replace(/Ã­/g, 'í')
        .replace(/Ã³/g, 'ó')
        .replace(/Ãº/g, 'ú')
        .replace(/Ã /g, 'à')
        .replace(/Ã¨/g, 'è')
        .replace(/Ã¬/g, 'ì')
        .replace(/Ã²/g, 'ò')
        .replace(/Ã¹/g, 'ù')
        .replace(/Ã¢/g, 'â')
        .replace(/Ãª/g, 'ê')
        .replace(/Ã®/g, 'î')
        .replace(/Ã´/g, 'ô')
        .replace(/Ã»/g, 'û')
        .replace(/Ã£/g, 'ã')
        .replace(/Ã±/g, 'ñ')
        .replace(/Ã§/g, 'ç');
}

export default myFile;
