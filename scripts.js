/* ================= HEADER SCROLL ================= */
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if(header){
    header.classList.toggle('scrolled', window.scrollY > 80);
  }
});

/* ================= MENU HAMBURGUER ================= */
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if(menuToggle && nav){
  const links = document.querySelectorAll("#nav a");

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
}

/* ================= BOTÃO SOU ALUNO ================= */
const openJanelaBtn = document.getElementById('openjanela'); 
const janela = document.getElementById('janelaAluno');
const closeJanelaBtn = document.getElementById('closeJanela');

if(openJanelaBtn && janela){
  openJanelaBtn.addEventListener('click', () => {
    janela.style.display = 'flex';
  });
}

if(closeJanelaBtn){
  closeJanelaBtn.addEventListener('click', () => {
    janela.style.display = 'none';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === janela) janela.style.display = 'none';
});

/* ================= CATALOGO FARDAMENTO ================= */
function abrirCatalogo(){
  document.getElementById("catalogoModal").style.display = "flex";
}

function fecharCatalogo(){
  document.getElementById("catalogoModal").style.display = "none";
}

const precos = {
  camisa:{ "02-06":70,"08-12":80,"14+":90 },
  camiseta:{ "02-06":70,"08-12":80,"14+":90 },
  jardineira:{ "02-06":70,"08-12":80,"14+":90 },
  casaco:{ "02-06":90,"08-12":100,"14+":130 },
  calca:{ "02-06":70,"08-12":80,"14+":90 },
  short:{ "02-06":70,"08-12":80,"14+":90 },
  meia:{ "02-06":20,"08-12":30,"14+":30 },
  shortsaia:{ "02-06":70,"08-12":80,"14+":90 }
};

let tipoAtual = "";

function abrirModalCatalogo(tipo, card){
  tipoAtual = tipo;

  const img = card.querySelector("img").src;
  document.getElementById("imgProduto").src = img;

  document.getElementById("tituloProduto").innerHTML =
    tipo.charAt(0).toUpperCase() + tipo.slice(1) + " Escolar";

  document.getElementById("precoProduto").innerHTML = "";
  document.getElementById("idadeProduto").value = "";

  document.getElementById("modal-catalogo").style.display = "flex";
}

function fecharModalCatalogo(){
  document.getElementById("modal-catalogo").style.display = "none";
}

function atualizarPreco(){
  const idade = document.getElementById("idadeProduto").value;
  const precoDiv = document.getElementById("precoProduto");
  const whats = document.getElementById("btnWhats");

  if (idade && tipoAtual && precos[tipoAtual][idade]){
    const valor = precos[tipoAtual][idade];

    precoDiv.innerHTML = `Preço: <b>R$${valor},00</b>`;

    whats.href = `https://wa.me/5581993954032?text=Olá, gostaria de informações sobre ${tipoAtual} (${idade}) - R$${valor},00`;
  }
}

/* ================= CATALOGO LIVROS ================= */
const kits = {
  // Maternal
  maternal1: {
    nome: "Maternal I",
    preco: "R$550,00",
    img: "livros/livro horizontal.jpg",
    livros: ["Livro integrado","Kit C","Religião","Agenda"]
  },
  maternal2: {
    nome: "Maternal II",
    preco: "R$550,00",
    img: "https://via.placeholder.com/150",
    livros: ["Livro integrado","Kit C","Religião","Agenda"]
  },

  // Infantil
  infantil1: {
    nome: "Infantil I",
    preco: "R$300",
    img: "livros/INFANTIL 1.png",
    livros: ["Português","Matemática"]
  },
  infantil2: {
    nome: "Infantil II",
    preco: "R$310",
    img: "https://via.placeholder.com/150",
    livros: ["Português","Matemática"]
  },

  // Fundamental 1
  "fund1-1": {
    nome: "1º Ano - Fundamental 1",
    preco: "R$400,00",
    img: "livros/fund1-1.png",
    livros: ["Português","Matemática","Ciências"]
  },
  "fund1-2": {
    nome: "2º Ano - Fundamental 1",
    preco: "R$420,00",
    img: "livros/fund1-2.png",
    livros: ["Português","Matemática","Ciências","História"]
  },
  "fund1-3": {
    nome: "3º Ano - Fundamental 1",
    preco: "R$430,00",
    img: "livros/fund1-3.png",
    livros: ["Português","Matemática","Ciências","História","Geografia"]
  },
  "fund1-4": {
    nome: "4º Ano - Fundamental 1",
    preco: "R$440,00",
    img: "livros/fund1-4.png",
    livros: ["Português","Matemática","Ciências","História","Geografia","Inglês"]
  },
  "fund1-5": {
    nome: "5º Ano - Fundamental 1",
    preco: "R$450,00",
    img: "livros/fund1-5.png",
    livros: ["Português","Matemática","Ciências","História","Geografia","Inglês","Arte"]
  },

  // Fundamental 2
  "fund2-6": {
    nome: "6º Ano - Fundamental 2",
    preco: "R$500,00",
    img: "livros/fund2-6.png",
    livros: ["Português","Matemática","Ciências","História","Geografia","Inglês"]
  },
  "fund2-7": {
    nome: "7º Ano - Fundamental 2",
    preco: "R$510,00",
    img: "livros/fund2-7.png",
    livros: ["Português","Matemática","Ciências","História","Geografia","Inglês","Arte"]
  },
  "fund2-8": {
    nome: "8º Ano - Fundamental 2",
    preco: "R$520,00",
    img: "livros/fund2-8.png",
    livros: ["Português","Matemática","Ciências","História","Geografia","Inglês","Arte","Educação Física"]
  },
  "fund2-9": {
    nome: "9º Ano - Fundamental 2",
    preco: "R$530,00",
    img: "livros/fund2-9.png",
    livros: ["Português","Matemática","Ciências","História","Geografia","Inglês","Arte","Educação Física","Redação"]
  }
};

function abrirCategorias(){
  document.getElementById("modalCategorias").style.display="flex";
  document.getElementById("modalAnos").style.display="none";
}

function fecharCategorias(){
  document.getElementById("modalCategorias").style.display="none";
}

function abrirAnos(cat){
  categoriaAtual = cat;
  let grid = document.getElementById("gridAnos");
  grid.innerHTML = "";

  
  if(cat==="maternal"){
    grid.innerHTML += `
    <div class="card" onclick="abrirProduto('maternal1')"><p>Maternal I</p></div>
    <div class="card" onclick="abrirProduto('maternal2')"><p>Maternal II</p></div>`;
  }

  if(cat==="infantil"){
    grid.innerHTML += `
    <div class="card" onclick="abrirProduto('infantil1')"><p>Infantil I</p></div>
    <div class="card" onclick="abrirProduto('infantil2')"><p>Infantil II</p></div>`;
  }

if(cat=="fund1"){
  for(let i=1;i<=5;i++){
    grid.innerHTML += `<div class="card" onclick="abrirProduto('fund1-${i}')"><p>${i}º Ano</p></div>`;
  }
}

if(cat=="fund2"){
  for(let i=6;i<=9;i++){
    grid.innerHTML += `<div class="card" onclick="abrirProduto('fund2-${i}')"><p>${i}º Ano</p></div>`;
  }
}
  
  document.getElementById("modalCategorias").style.display="none";
  document.getElementById("modalAnos").style.display="flex";
}

function abrirProduto(id){
  let kit = kits[id];

  document.getElementById("nomeKit").innerText = kit.nome;
  document.getElementById("precoKit").innerText = kit.preco;
  document.getElementById("imagemKit").src = kit.img;

  let lista = "";
  kit.livros.forEach(l => lista += "• " + l + "<br>");

  document.getElementById("listaLivros").innerHTML = lista;

  document.getElementById("modalAnos").style.display="none";
  document.getElementById("modalProduto").style.display="flex";
}

function fecharProduto(){
  document.getElementById("modalProduto").style.display="none";
}

function voltarAnos(){
  document.getElementById("modalProduto").style.display="none";
  document.getElementById("modalAnos").style.display="flex";
}

/* ================= WHATSAPP COMPRA ================= */
function comprar(){
  let nome = document.getElementById("nomeKit").innerText;
  let preco = document.getElementById("precoKit").innerText;

  let livros = document.getElementById("listaLivros").innerHTML
    .replace(/<br>/g,"\n");

  let msg = `Olá, quero este kit:\n${nome}\n${preco}\n${livros}`;

  window.open("https://wa.me/5581993954032?text="+encodeURIComponent(msg));
}

/* ================= MODAL HORARIO ================= */
function abrirHorario(){
  document.getElementById("modalHorario").style.display="flex";
}

function fecharHorario(){
  document.getElementById("modalHorario").style.display="none";
}

/* ================= FORMULARIO ================= */
const popup = document.getElementById("popup-formulario");

function abrirFormulario(){
  popup.style.display="flex";
}

function fecharFormulario(){
  popup.style.display="none";
  document.getElementById("formMatricula").reset();
}

/* ================= SLIDE ================= */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  if(slides.length > 0){
    setInterval(() => {
      slides.forEach(s => s.classList.remove("active"));
      slides[index].classList.add("active");
      index = (index + 1) % slides.length;
    }, 5000);
  }
});

/* ================= GALERIA ================= */
function abrirGaleriaModal(src){
  document.getElementById("galeriaModal").style.display="flex";
  document.getElementById("galeriaModalImg").src=src;
}

function fecharGaleriaModal(){
  document.getElementById("galeriaModal").style.display="none";
}
