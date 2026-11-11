
export function definirTitulo(curso) {
    document.querySelector("#nomeCurso").textContent = curso.nome;
    document.querySelector("#codigoCurso").textContent = curso.codigo;
}
    

export function renderizarSecoes(secoes) {
    const html = secoes.map(
        (secao) => `<tr>
    <td>${secao.numeroSecao}</td>
    <td>${secao.matriculados}</td>
    <td>${secao.instrutor}</td></tr>`
    );
    document.querySelector("#secoes").innerHTML = html.join(""); }
    

document.querySelector("#matricularEstudante").addEventListener("click", function () {
    const numeroSecao = Number(document.querySelector("#numeroSecao").value);
    cursoBYUI.mudarMatriculas(numeroSecao);
});
document.querySelector("#removerEstudante").addEventListener("click", function () {
    const numeroSecao = Number(document.querySelector("#numeroSecao").value);
    cursoBYUI.mudarMatriculas(numeroSecao, false);
});

definirTitulo(cursoBYUI);
definirSecaoSelecionada(cursoBYUI.secoes);
renderizarSecoes(cursoBYUI.secoes);