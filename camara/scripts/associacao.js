const ano = document.querySelector('#anoAtual');

if (ano) ano.textContent = new Date().getFullYear();


const ultimaModificacao = document.querySelector('#ultimaModificacao');
if (ultimaModificacao) ultimaModificacao.textContent = document.lastModified;



document.querySelector('#timestamp').value = new Date().toLocaleString('pt-BR');

document.querySelectorAll(".nivel").forEach(card => {
    const abrir = card.querySelector(".botao");
    const modal = card.querySelector("dialog");
    const fechar = card.querySelector(".fechar");

    abrir.addEventListener("click", () => modal.showModal());
    fechar.addEventListener("click", () => modal.close());

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.close();
    });


});