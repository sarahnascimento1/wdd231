const ano = document.querySelector('#anoAtual');

ano.textContent = new Date().getFullYear();

document.getElementById("ultimaModificacao").innerHTML = document.lastModified;