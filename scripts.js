
//  =================SOU ALUNO===============

let turmaSelecionada=""
let tamanhoSelecionado=""

const dados={

"Maternal":{livro:120,farda:{P:80,M:90,G:100},lista:"listas/maternal.pdf"},
"Maternal II":{livro:130,farda:{P:85,M:95,G:105},lista:"listas/maternal2.pdf"},
"Infantil":{livro:150,farda:{P:90,M:100,G:110},lista:"listas/infantil.pdf"},
"Fundamental I":{livro:180,farda:{P:100,M:110,G:120},lista:"listas/fund1.pdf"},
"Fundamental II":{livro:220,farda:{P:110,M:120,G:130},lista:"listas/fund2.pdf"}

}



function abrirJanelaAluno(){

document.getElementById("janela-ja-aluno").style.display="flex"

}



function fecharJanela(id){

document.getElementById(id).style.display="none"

}



function abrirMaterial(turma){

turmaSelecionada=turma

fecharJanela("janela-ja-aluno")

document.getElementById("janela-material").style.display="flex"

document.getElementById("tituloTurma").innerText=turma

document.getElementById("precoLivro").innerText="Livro R$ "+dados[turma].livro + ",00"

}



function selecionarTamanho(event,tamanho){

tamanhoSelecionado=tamanho

document.querySelectorAll(".tamanhos button")

.forEach(btn=>btn.classList.remove("active"))

event.target.classList.add("active")

let preco=dados[turmaSelecionada].farda[tamanho]

document.getElementById("precoFarda").innerHTML = "Fardamento<br>R$" + preco + ",00";

}



function falarSecretaria(){

if(!tamanhoSelecionado){

alert("Escolha o tamanho do fardamento")

return

}

let precoLivro=dados[turmaSelecionada].livro

let precoFarda=dados[turmaSelecionada].farda[tamanhoSelecionado]

let mensagem=`Olá, gostaria de adquirir o material escolar.

Turma: ${turmaSelecionada}
Livro: R$ ${precoLivro}
Fardamento
Tamanho: ${tamanhoSelecionado}
Preço: R$ ${precoFarda}`

let url="https://wa.me/5581993954032?text="+encodeURIComponent(mensagem)
93954032
window.open(url)

}



function baixarLista(){

window.open(dados[turmaSelecionada].lista)

}


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

  setInterval(trocarSlide,90000); // troca a cada 4 segundos


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


/*  fomularios */

// Abre o popup
function abrirFormulario(){
    document.getElementById("popup-formulario").style.display = "flex";
}

// Fecha o popup
function fecharFormulario(){
    document.getElementById("popup-formulario").style.display = "none";
}

// Mostra/esconde o campo de "Qual acessibilidade?"
function mostrarAcessibilidade(){
    var acessibilidade = document.getElementById("acessibilidade").value;
    var campo = document.getElementById("campo-acessibilidade");

    if(acessibilidade === "Sim"){
        campo.style.display = "block";
    } else {
        campo.style.display = "none";
    }
}

// Enviar formulário


// ==================== ABRIR/FECHAR POPUP ====================
const btnAbrir = document.getElementById("btnAbrir");
const btnFechar = document.getElementById("btnFechar");
const popup = document.getElementById("popup-formulario");
const btnEnviar = document.getElementById("btnEnviar");

// Abre o popup
btnAbrir.addEventListener("click", () => {
    popup.style.display = "flex";
});

// Fecha o popup e limpa tudo
btnFechar.addEventListener("click", fecharFormulario);

function fecharFormulario() {
    popup.style.display = "none";

    // Limpa todos os campos do formulário
    document.getElementById("formMatricula").reset();

    // Esconde o campo de acessibilidade condicional
    document.getElementById("campo-acessibilidade").style.display = "none";

    // Esconde mensagens de sucesso e erro
    document.getElementById("mensagem-sucesso").style.display = "none";
    document.getElementById("mensagem-erro").style.display = "none";
}

// ==================== CAMPO ACESSIBILIDADE ====================
document.getElementById("acessibilidade").addEventListener("change", mostrarAcessibilidade);

function mostrarAcessibilidade() {
    const acessibilidade = document.getElementById("acessibilidade").value;
    document.getElementById("campo-acessibilidade").style.display = (acessibilidade === "Sim") ? "block" : "none";
}

// ==================== ENVIO DE FORMULÁRIO ====================

// Inicializa EmailJS
(function(){
    emailjs.init("SUA_PUBLIC_KEY"); // Substitua pela sua Public Key
})();

btnEnviar.addEventListener("click", enviarFormulario);

function enviarFormulario() {
    const responsavel = document.getElementById("responsavel").value.trim();
    const aluno = document.getElementById("aluno").value.trim();
    const serie = document.getElementById("serie").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const acessibilidade = document.getElementById("acessibilidade").value.trim();
    const qualAcessibilidade = document.getElementById("qualAcessibilidade").value.trim();
    const erro = document.getElementById("mensagem-erro");
    const sucesso = document.getElementById("mensagem-sucesso");

    // VALIDAÇÃO
    if(!responsavel || !aluno || !serie || !telefone || !acessibilidade){
        erro.style.display = "block";
        erro.innerHTML = "⚠️ Por favor, preencha todos os campos obrigatórios.";
        return;
    }
    if(acessibilidade === "Sim" && !qualAcessibilidade){
        erro.style.display = "block";
        erro.innerHTML = "⚠️ Por favor, informe qual acessibilidade do aluno.";
        return;
    }

    erro.style.display = "none";

    // WHATSAPP
    const mensagem =
    `*NOVA PRÉ-MATRÍCULA 2026*\n\nResponsável: ${responsavel}\nAluno: ${aluno}\nSérie: ${serie}\nAcessibilidade: ${acessibilidade}\nTipo: ${qualAcessibilidade}\nTelefone: ${telefone}`;
    const numero = "5581994212337";
    window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem), "_blank");

    // EMAILJS
    const templateParams = { responsavel, aluno, serie, acessibilidade, tipo_acessibilidade: qualAcessibilidade, telefone };
    emailjs.send("SEU_SERVICE_ID","SEU_TEMPLATE_ID",templateParams)
        .then(() => console.log("Email enviado com sucesso!"));

    sucesso.style.display = "block";
    sucesso.innerHTML = "✅ Pré-matrícula enviada com sucesso!";

    // Limpeza após envio
    document.getElementById("formMatricula").reset();
    document.getElementById("campo-acessibilidade").style.display = "none";

    // Fecha popup automaticamente após 3 segundos
    setTimeout(() => {
        popup.style.display = "none";
        sucesso.style.display = "none";
    }, 3000);
}

