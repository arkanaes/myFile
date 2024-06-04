# myFile

## INDICE
 - [O QUE É myFile?](#o-que-é-myfile)
 - [O QUE FAZ?](#o-que-faz)
 - [COMO FUNCIONA?](#como-funciona)
 - [POR QUE FOI DESENVOLVIDO?](#por-que-foi-desenvolvido)
 - [COMO USAR](#como-usar)
 - [PARÂMETROS](#parâmetros)
 - [TROUBLESHOOTING](#troubleshooting)
    
### O QUE É myFile?
É um simples código javascript, que pega uma instância [blob](https://developer.mozilla.org/pt-BR/docs/Web/API/Blob) e gera o download do arquivo.
### O QUE FAZ?
Realiza o download de qualquer arquivo.
### COMO FUNCIONA?
Cria uma instância de [File](https://developer.mozilla.org/pt-BR/docs/Web/API/File), cria um link para o objeto de arquivo e insere dinamicamente uma tag de âncora no DOM da página. Em seguida, simula automaticamente um clique pelo usuário, iniciando o download do arquivo.
### POR QUE FOI DESENVOLVIDO?
Ao trabalhar no frontend pode ser que você se depare com a necessidade de realizar o download de algum arquivo de seu backend. E muito das vezes você quer ter o controle melhor da operação de download e não depender da tag `<a>`. Você pode querer por exemplo utilizar [Axios](https://axios-http.com/docs/intro) para realizar o download e transformar o response em [blob](https://developer.mozilla.org/pt-BR/docs/Web/API/Blob) para você realizar o download do arquivo através do modulo `myFile`.
## COMO USAR
 **Obs:** Esse é um exemplo simples e inclui a utilização do [Axios](https://axios-http.com/docs/intro).

<ol>
  <li>Baixe para o seu projeto o arquivo myFile.js disponibilizado nesse repositório. </li><br>
  <li>Abra seu arquivo html e faça o import do modulo myFile.js e do CDN do axios.</li>
  
  ```html 
  <!-- Import Axios -->
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <!-- Import myFile -->
  <script type="module">
    import myFile from './myFile.js';
    window.myFile = myFile;
  </script>
  ```

  <li>Realize um request com o axios e passe o response do tipo blob para myFile.download.</li>
  
  ```html
    <script>

        let url = '/img.jpg';
        axios.get(url, {
            responseType: 'blob',

        })
        .then(blob => myFile.download(blob, 'myFile.png'))
        .catch(error => console.log(error))

    </script>
  ```

  <li>Salve e faça o refresh em sua página que será realizado o download.</li>
</ol>

## PARÂMETROS
O método `download(blob, fileName)` aceita dois parâmetros, sendo o segundo opcional. O módulo myFile extrai o nome do arquivo a partir do cabeçalho da resposta (response header) do blob, que é passado como primeiro parâmetro. Para que essa informação seja obtida automaticamente, o backend deve incluir o seguinte cabeçalhos na resposta:


|  Content-Disposition    | attachment; filename="filename.jpg" | 
| :---        |    ---:   |  



## TROUBLESHOOTING
Às vezes, você pode precisar obter arquivos de um servidor que não seja o seu e pode se deparar com o erro `blocked by CORS policy: No 'Access-Control-Allow-Origin'`. Para resolver esse problema, você pode desabilitar a política de CORS da sua aplicação. **Esta prática não é recomendada por razões de segurança**.

