const local = window.location.search;

console.log(local);

const info = new URLSearchParams(local);
console.log(info);

console.log(info.get('nome'));
console.log(info.get('sobrenome'));
console.log(info.get('ordenancas'));
console.log(info.get('data'));
console.log(info.get('local'));
console.log(info.get('celular'));
console.log(info.get('email'));

document.querySelector('#resultados').innerHTML = `
    <p>Agendamento para ${info.get('nome')} ${info.get('sobrenome')}</p>
    <p>Procurador para ${info.get('ordenancas')} em ${info.get('data')} no Templo ${info.get('local')}</p>
    <p>Seu telefone: ${info.get('celular')}</p>
    <p>Seu e-mail é ${info.get('email')}</p>`
    