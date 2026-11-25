const btnAbrir1 = document.querySelector("#btnAbrir1");
const btnAbrir2 = document.querySelector("#btnAbrir2");
const btnAbrir3 = document.querySelector("#btnAbrir3");
const caixaDialogoTexto = document.querySelector("#caixaDialogo div");

btnAbrir1.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = `Uma Maçã contém 95 calorias`;
});

btnAbrir2.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = `Uma Laranja contém 45 calorias`;
});

btnAbrir3.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = `Uma Banana contém 105 calorias`;
});

btnFechar.addEventListener("click", () => {
    caixaDialogo.close();
});