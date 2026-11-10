const ano = document.querySelector('#anoAtual');

ano.textContent = new Date().getFullYear();

document.getElementById("ultimaModificacao").innerHTML = document.lastModified;

const navbtn = document.querySelector("#ham-btn");
const menu = document.querySelector("nav ul");

navbtn.addEventListener('click', () => {
    navbtn.classList.toggle('show');
    menu.classList.toggle('show');
});


const cartoes = document.querySelector('#cartoes');
const niveis = { 1: 'Membro', 2: 'Prata', 3: 'Ouro' };

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
}

btnGrade.addEventListener('click', () => mudarVisualizacao('grade'));
btnLista.addEventListener('click', () => mudarVisualizacao('lista'));

const salvo = localStorage.getItem('visualizacao');
if (salvo) mudarVisualizacao(salvo);

const exibirEmpresas = (empresas) => {
    empresas.forEach((empresa) => {

        const cartao = document.createElement('section');

        cartao.innerHTML = `
            <h2>${empresa.nome}</h2>
            <img src="${empresa.imagem}" alt="Logo da empresa: ${empresa.nome}" loading="lazy" width="200" height="200">
            <dl>
                <dt>Endereço:</dt>
                <dd>${empresa.endereco}</dd>

                <dt>Contato:</dt>
                <dd>${empresa.telefone}</dd>

                <dt>Site:</dt>
                <dd><a href="${empresa.url}" target="_blank">${empresa.url}</a></dd>

                <dt>Nível:</dt>
                <dd>${niveis[empresa.nivel]}</dd>

                <dt>Segmento:</dt>
                <dd>${empresa.segmento}</dd>

                <dt>Descrição:</dt>
                <dd>${empresa.descricao}</dd>
            </dl>
        `;

        cartoes.appendChild(cartao);
    });
};

async function obterDadosDeEmpresas() {
    const resposta = await fetch('dados/membros.json');
    const dados = await resposta.json();
    exibirEmpresas(dados.empresas);

}

obterDadosDeEmpresas();

