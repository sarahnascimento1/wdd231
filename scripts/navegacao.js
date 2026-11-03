const navbtn = document.querySelector("#ham-btn");
const menu = document.querySelector("nav ul");

navbtn.addEventListener('click', () => {
    navbtn.classList.toggle('show');
    menu.classList.toggle('show');
});

