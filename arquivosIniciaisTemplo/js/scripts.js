import {templos} from '../data/templos.js'
console.log(templos);

import {url} from '../data/templos.js'
console.log(url);

const mostrar = document.querySelector("#mostrarAqui")
const dialogo = document.querySelector("#meuDialogo")
const titulo = document.querySelector("#meuDialogo h2")
const info = document.querySelector("#meuDialogo p")
const fechar = document.querySelector("#meuDialogo button")

fechar.addEventListener("click", () => dialogo.close())

function exibirItens(dados) {
    // console.log(dados);
    dados.forEach(x => {
        console.log(x);
        console.log(`${url}${x.caminho}`);

        const foto = document.createElement('img')
        foto.src = `${url}${x.caminho}`
        foto.alt = x.nome
        foto.addEventListener('click', () => { exibirInfo(x);  })
        mostrar.appendChild(foto)

    })

}

function exibirInfo(x) {
    titulo.innerHTML = x.nome
    info.innerHTML = `Dedicado ${x.dedicado} por ${x.pessoa} como templo número ${x.numero}`
    dialogo.showModal();
}

exibirItens(templos);