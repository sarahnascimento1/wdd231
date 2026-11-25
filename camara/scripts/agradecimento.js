const agradecer = new URLSearchParams(window.location.search);

const campos = ["nome", "sobrenome", "email", "celular", "empresa", "timestamp"];

campos.forEach(campo => {
    const elemento = document.querySelector(`#res-${campo}`);
    elemento.textContent = agradecer.get(campo) || "Não informado";
});

document.querySelector('#anoAtual').textContent = new Date().getFullYear();
document.querySelector('#ultimaModificacao').textContent = document.lastModified;