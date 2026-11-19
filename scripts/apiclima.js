
// Obter elementos do documento
const tempAtual = document.querySelector('#temperatura');
const iconeDoClima = document.querySelector('#imagem');
const descrDaLegenda = document.querySelector('figcaption');
const lugar = document.querySelector('#local');

const chave = "c8ace8cdae77052f51a9caf226a78ed1"
const lat = "49.75"
const lon = "6.63"
const lang = 'pt_br'

//Criar variáveis necessárias para a URL
const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&units=metric&lang=${lang}`


//Obter os dados da API
async function apiFetch() {
    try {

        const resposta = await fetch(url);

        if (resposta.ok) {
            const dados = await resposta.json();
            exibirResultados(dados);    
        }   else {
            throw Error(await resposta.text());

        }

    } catch (erro) {

        console.log(erro);

    }
}

// Exibir os dados da API na webpage
function exibirResultados(dados) {
    lugar.innerHTML = dados.name 
    descrDaLegenda.innerHTML = dados.weather[0].description;
    tempAtual.innerHTML = `${dados.main.temp}°C`;
    const iconsrc = `https://api.openweathermap.org/img/w/${dados.weather[0].icon}.png`; 
    iconeDoClima.setAttribute('src', iconsrc);
    iconeDoClima.setAttribute('alt', dados.weather[0].description);
}

apiFetch();