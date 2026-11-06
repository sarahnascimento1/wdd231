
const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';

const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    const resposta = await fetch('https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json');
    const dados = await resposta.json();
    // console.table(dados.profetas);
    exibirProfetas(dados.profetas);
    
}

obterDadosDeProfetas();

const exibirProfetas = (profetas) => {
    profetas.forEach((profeta) => {
        
        const cartao = document.createElement('section');
        const nomeCompleto = document.createElement('h2');
        const retrato = document.createElement('img');
        const dataNascimento = document.createElement('p');
        const lugar = document.createElement('p');
        const falecimento = document.createElement('p');
        const tempoComoProfeta = document.createElement('p');
        const posicao = document.createElement('p');
        const filhos = document.createElement('p');

        nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

        dataNascimento.textContent = `Nascimento: ${profeta.nascimento}`;

        lugar.textContent = `Local de Nascimento: ${profeta.localNascimento}`;

        falecimento.textContent = `Falecimento: ${profeta.morte}`;

        tempoComoProfeta.textContent = `Anos de Serviço: ${profeta.duracao}`;

        posicao.textContent = `Ordem: ${profeta.ordem}`;

        filhos.textContent = `Número de Filhos: ${profeta.numeroFilhos}`;
        

        retrato.setAttribute('src', profeta.urlImagem);
        retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
        retrato.setAttribute('loading', 'lazy');
        retrato.setAttribute('width', '200');
        retrato.setAttribute('heigth', '440');

        cartao.appendChild(nomeCompleto);
        cartao.appendChild(dataNascimento); 
        cartao.appendChild(lugar);
        cartao.appendChild(filhos);
        cartao.appendChild(tempoComoProfeta);
        cartao.appendChild(posicao);
        cartao.appendChild(falecimento);    
        cartao.appendChild(retrato);


        cartoes.appendChild(cartao);

       


    });
};