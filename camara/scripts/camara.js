const ano = document.querySelector('#anoAtual');

ano.textContent = new Date().getFullYear();

document.getElementById("ultimaModificacao").innerHTML = document.lastModified;

const cartoes = document.querySelector('#cartoes');
const niveis = { 1: 'Membro', 2: 'Prata', 3: 'Ouro' };

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

