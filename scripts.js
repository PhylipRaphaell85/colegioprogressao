


/* menur */

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 80);
});


/* menur  HAMBURGUE */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const links = document.querySelectorAll("nav a");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  nav.classList.toggle("active");
});

links.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    nav.classList.remove("active");
  });
});


  // Fecha ao clicar em link
  document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
    });
  });


/* baner slides */
const slides = document.querySelectorAll(".slide");
  let index = 0;

  function trocarSlide() {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }

  setInterval(trocarSlide, 4000); // troca a cada 4 segundos


/* zomm cad momentos */


function abrirGaleriaModal(src) {
  document.getElementById("galeriaModal").style.display = "flex";
  document.getElementById("galeriaModalImg").src = src;
}

function fecharGaleriaModal() {
  document.getElementById("galeriaModal").style.display = "none";
}

/*  cad horario */
function abrirHorario(){
document.getElementById("modalHorario").style.display="flex";
}

function fecharHorario(){
document.getElementById("modalHorario").style.display="none";
}

window.onclick = function(event){
let modal = document.getElementById("modalHorario");

if(event.target == modal){
modal.style.display = "none";
}
}