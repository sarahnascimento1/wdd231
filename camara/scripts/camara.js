const ano = document.querySelector('#anoAtual');

if (ano) ano.textContent = new Date().getFullYear();


const ultimaModificacao = document.querySelector('#ultimaModificacao');
if (ultimaModificacao) ultimaModificacao.textContent = document.lastModified;

const navbtn = document.querySelector("#ham-btn");
const menu = document.querySelector("#menu-principal");

if (navbtn && menu) {
    navbtn.addEventListener('click', () => {
        navbtn.classList.toggle('show');
        menu.classList.toggle('show');

        const aberto = navbtn.classList.contains('show');

        navbtn.setAttribute('aria-expanded', aberto);
        navbtn.setAttribute(
            'aria-label',
            aberto ? 'Fechar menu' : 'Abrir menu'
        );
    });
}



const cartoes = document.querySelector('#cartoes');
const niveis = { 1: 'Membro', 2: 'Prata', 3: 'Ouro' };

if (cartoes) {
    const btnGrade = document.querySelector('#btn-grade');
    const btnLista = document.querySelector('#btn-lista');

    function mudarVisualizacao(modo) {

        const ehLista = modo === 'lista';

        cartoes.classList.toggle('lista', ehLista);
        cartoes.classList.toggle('grade', !ehLista);

        btnLista.classList.toggle('ativo', ehLista);
        btnGrade.classList.toggle('ativo', !ehLista);

        btnLista.setAttribute('aria-pressed', ehLista);
        btnGrade.setAttribute('aria-pressed', !ehLista);

        localStorage.setItem('visualizacao', modo);
    }

    btnGrade.addEventListener('click', () => mudarVisualizacao('grade'));
    btnLista.addEventListener('click', () => mudarVisualizacao('lista'));

    mudarVisualizacao(localStorage.getItem('visualizacao') || 'grade');
}

const exibirEmpresas = (empresas, destino) => {
    empresas.forEach((empresa) => {

        const cartao = document.createElement('section');
        cartao.classList.add("section-empresas");


        cartao.innerHTML = `
            <h2>${empresa.nome}</h2>
            <img src="${empresa.imagem}" alt="Logo da empresa: ${empresa.nome}" loading="lazy" width="200" height="200">
            <dl>
                <dt>Endereço:</dt>
                <dd>${empresa.endereco}</dd>

                <dt>Contato:</dt>
                <dd>${empresa.telefone}</dd>

                <dt>Site:</dt>
                <dd><a href="${empresa.url}" target="_blank" rel="noopener noreferrer">${empresa.url}</a></dd>

                <dt>Nível:</dt>
                <dd>${niveis[empresa.nivel]}</dd>

                <dt>Segmento:</dt>
                <dd>${empresa.segmento}</dd>

                <dt>Descrição:</dt>
                <dd>${empresa.descricao}</dd>
            </dl>
        `;

        destino.appendChild(cartao);
    });
};

const exibirDestaques = (empresas, destino) => {
    empresas.forEach((empresa) => {
        const cartao = document.createElement('section');
        cartao.classList.add('cartao-destaque');

        cartao.innerHTML = `
            <img src="${empresa.imagem}" alt="Logo da empresa: ${empresa.nome}" loading="lazy" width="200" height="200">
            <div class="contato-destaque">
                <h3>${empresa.nome}</h3>
                <p>${empresa.endereco}</p>
                <p>${empresa.telefone}</p>
                <p><a href="${empresa.url}" target="_blank" rel="noopener noreferrer">${empresa.url}</a></p>
                <p>Nível: ${niveis[empresa.nivel]}</p>
            </div>
        `;
        destino.appendChild(cartao);
    });
};


async function obterEmpresas() {
    const resposta = await fetch('dados/membros.json');
    const dados = await resposta.json();
    return dados.empresas;

}

if (cartoes) {
    obterEmpresas().then((empresas) => exibirEmpresas(empresas, cartoes));
}

const tresEmpresas = document.querySelector('.tres-empresas');
if (tresEmpresas) {
    obterEmpresas().then((empresas) => {
        const destaque = empresas
            .filter((e) => e.nivel >= 2)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        exibirDestaques(destaque, tresEmpresas);
    });
}




// clima:

const tempAtual = document.querySelector('#temperatura');
const figura = document.querySelector('#figura-clima');
const descrDaLegenda = document.querySelector('figcaption');
const lugar = document.querySelector('#local');

const chave = "c8ace8cdae77052f51a9caf226a78ed1"
const lat = "-23.55"
const lon = "-46.63"
const lang = 'pt_br'

const maxima = document.querySelector('#maxima');
const minima = document.querySelector('#minima');
const umidade = document.querySelector('#umidade');
const nascer = document.querySelector('#nascer');
const porDoSol = document.querySelector('#por-do-sol');

function formatarHora(segundos, deslocamento) {
    return new Date((segundos + deslocamento) * 1000).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });
}

function exibirResultados(dados) {
    lugar.innerHTML = 'São Paulo';
    descrDaLegenda.innerHTML = dados.weather[0].description;
    tempAtual.innerHTML = `${Math.round(dados.main.temp)}°C`;

    maxima.innerHTML = `${Math.round(dados.main.temp_max)}°C`;
    minima.innerHTML = `${Math.round(dados.main.temp_min)}°C`;
    umidade.innerHTML = `${dados.main.humidity}%`;

    const opcoes = { hour: '2-digit', minute: '2-digit' };
    nascer.innerHTML = new Date(dados.sys.sunrise * 1000).toLocaleTimeString('pt-BR', opcoes);
    porDoSol.innerHTML = new Date(dados.sys.sunset * 1000).toLocaleTimeString('pt-BR', opcoes);

    const imagem = document.createElement('img');

    imagem.src = `https://api.openweathermap.org/img/w/${dados.weather[0].icon}.png`;
    imagem.alt = `Condição do clima: ${dados.weather[0].description}`;
    figura.prepend(imagem);
}

const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&units=metric&lang=${lang}`



async function apiFetch() {
    try {

        const resposta = await fetch(url);

        if (resposta.ok) {
            const dados = await resposta.json();
            exibirResultados(dados);
        } else {
            throw Error(await resposta.text());

        }

    } catch (erro) {

        console.log(erro);

    }
}

const listaPrevisao = document.querySelector('#lista-previsao');

const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${chave}&units=metric&lang=${lang}`;

async function previsaoFetch() {
    try {
        const resposta = await fetch(urlPrevisao);

        if (resposta.ok) {
            const dados = await resposta.json();
            exibirPrevisao(dados);
        } else {
            throw Error(await resposta.text());
        }

    } catch (erro) {
        console.log(erro);
    }
}

function exibirPrevisao(dados) {
    const fuso = dados.city.timezone;  

    const dias = {};
    dados.list.forEach((item) => {
        const dia = new Date((item.dt + fuso) * 1000).toISOString().slice(0, 10);
        if (!dias[dia]) dias[dia] = [];
        dias[dia].push(item);
    });

    const hoje = new Date(Date.now() + fuso * 1000).toISOString().slice(0, 10);
    let html = '';

    Object.keys(dias).slice(0, 3).forEach((dia) => {
        const itens = dias[dia];
        const tempMax = Math.max(...itens.map((item) => item.main.temp_max));
        const tempMin = Math.min(...itens.map((item) => item.main.temp_min));
        const meio = itens[Math.floor(itens.length / 2)];   // bloco do meio do dia

        const rotulo = dia === hoje
            ? 'Hoje'
            : new Date(dia + 'T12:00:00Z').toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' });

        html += `
            <li>
                <strong>${rotulo}</strong>
                <img src="https://api.openweathermap.org/img/w/${meio.weather[0].icon}.png" alt="${meio.weather[0].description}">
                <span>${meio.weather[0].description}</span>
                <span>${Math.round(tempMax)}°C / ${Math.round(tempMin)}°C</span>
            </li>
        `;
    });

    listaPrevisao.innerHTML = html;
}

if (listaPrevisao) previsaoFetch();


apiFetch();







