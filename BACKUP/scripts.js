


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
    menuToggle?.classList.remove('active');
    nav?.classList.remove('active');
  });
});

//  =================FUNCAO BOTOES GARANTA SUA VAGA, NOSSA LOJA , HORARIO===============


/*  cad horario */
function abrirHorario(){
document.getElementById("modalHorario").style.display="flex";
}

function fecharHorario(){
document.getElementById("modalHorario").style.display="none";
}

// 🔥 CORREÇÃO: não sobrescrever window.onclick
window.addEventListener("click", function(event){
  let modal = document.getElementById("modalHorario");
  if(event.target === modal){
    modal.style.display = "none";
  }
});


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

//  =================FIM BOTAO HORARIO ===============




// Enviar formulário

// ==================== GARANTE QUE O HTML CARREGOU ====================
document.addEventListener("DOMContentLoaded", function () {

  // ==================== ELEMENTOS ====================
  const btnAbrir = document.getElementById("btnAbrir");
  const btnFechar = document.getElementById("btnFechar");
  const popup = document.getElementById("popup-formulario");
  const btnEnviar = document.getElementById("btnEnviar");
  const acessibilidadeEl = document.getElementById("acessibilidade");

  // ==================== ABRIR POPUP ====================
  if (btnAbrir && popup) {
    btnAbrir.addEventListener("click", () => {
      popup.style.display = "flex";
    });
  }

  // ==================== FECHAR POPUP ====================
  if (btnFechar) {
    btnFechar.addEventListener("click", fecharFormulario);
  }

  function fecharFormulario() {
    if (popup) popup.style.display = "none";

    const form = document.getElementById("formMatricula");
    if (form) form.reset();

    const campo = document.getElementById("campo-acessibilidade");
    if (campo) campo.style.display = "none";

    const sucesso = document.getElementById("mensagem-sucesso");
    const erro = document.getElementById("mensagem-erro");

    if (sucesso) sucesso.style.display = "none";
    if (erro) erro.style.display = "none";
  }

  // ==================== ACESSIBILIDADE ====================
  if (acessibilidadeEl) {
    acessibilidadeEl.addEventListener("change", function () {
      const campo = document.getElementById("campo-acessibilidade");
      if (campo) {
        campo.style.display = (this.value === "Sim") ? "block" : "none";
      }
    });
  }

  // ==================== EMAILJS (SE EXISTIR) ====================
  if (typeof emailjs !== "undefined") {
    emailjs.init("SUA_PUBLIC_KEY");
  }

  // ==================== BOTÃO ENVIAR ====================
  if (btnEnviar) {
    btnEnviar.addEventListener("click", function (e) {
      e.preventDefault(); // 🔥 impede recarregar página
      enviarFormulario();
    });
  }

  function enviarFormulario() {
    try {
      const responsavel = document.getElementById("responsavel")?.value.trim();
      const aluno = document.getElementById("aluno")?.value.trim();
      const serie = document.getElementById("serie")?.value.trim();
      const telefone = document.getElementById("telefone")?.value.trim();
      const acessibilidade = document.getElementById("acessibilidade")?.value.trim();
      const qualAcessibilidade = document.getElementById("qualAcessibilidade")?.value.trim();

      const erro = document.getElementById("mensagem-erro");
      const sucesso = document.getElementById("mensagem-sucesso");

      // ==================== VALIDAÇÃO ====================
      if (!responsavel || !aluno || !serie || !telefone || !acessibilidade) {
        if (erro) {
          erro.style.display = "block";
          erro.innerHTML = "⚠️ Preencha todos os campos obrigatórios.";
        }
        return;
      }

      if (acessibilidade === "Sim" && !qualAcessibilidade) {
        if (erro) {
          erro.style.display = "block";
          erro.innerHTML = "⚠️ Informe a acessibilidade.";
        }
        return;
      }

      if (erro) erro.style.display = "none";

      // ==================== WHATSAPP (100% FUNCIONAL) ====================
      const mensagem =
        `*NOVA PRÉ-MATRÍCULA 2027*\n\nResponsável: ${responsavel}\nAluno: ${aluno}\nSérie: ${serie}\nAcessibilidade: ${acessibilidade}\nTipo: ${qualAcessibilidade}\nTelefone: ${telefone}`;

      const numero = "5581994212337";

      // 🔥 MAIS CONFIÁVEL QUE window.open
      window.location.href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

      // ==================== EMAILJS ====================
      if (typeof emailjs !== "undefined") {
        const templateParams = {
          responsavel,
          aluno,
          serie,
          acessibilidade,
          tipo_acessibilidade: qualAcessibilidade,
          telefone
        };

        emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", templateParams)
          .then(() => console.log("Email enviado"))
          .catch(() => console.log("Erro ao enviar email"));
      }

      // ==================== SUCESSO ====================
      if (sucesso) {
        sucesso.style.display = "block";
        sucesso.innerHTML = "✅ Enviado com sucesso!";
      }

      const form = document.getElementById("formMatricula");
      if (form) form.reset();

      const campo = document.getElementById("campo-acessibilidade");
      if (campo) campo.style.display = "none";

      setTimeout(() => {
        if (popup) popup.style.display = "none";
        if (sucesso) sucesso.style.display = "none";
      }, 3000);

    } catch (e) {
      console.error("Erro no envio:", e);
    }
  }

});
//  =================FIM FUNCAO BOTOES GARANTA SUA VAGA, SOU ALUDO , HORARIO===============

/* baner slides */
// ================= SLIDE (CORRIGIDO) =================
const slides = document.querySelectorAll(".slide");
let index = 0;

function trocarSlide() {
  if (slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");

  index = (index + 1) % slides.length;
}

// inicia corretamente
if(slides.length > 0){
  trocarSlide();
  setInterval(trocarSlide, 4000);
}




/* zomm cad momentos */


function abrirGaleriaModal(src) {
  document.getElementById("galeriaModal").style.display = "flex";
  document.getElementById("galeriaModalImg").src = src;
}

function fecharGaleriaModal() {
  document.getElementById("galeriaModal").style.display = "none";
}


// ================= PROJETO =================
function mostrarCard(num){
  const container = document.querySelector('.cards');
  const cards = document.querySelectorAll('.card');

  cards.forEach(c => c.style.display = 'none');

  const card = document.getElementById('card'+num);
  card.style.display = 'block';

  container.classList.add('ativo');
}

// fechar ao clicar fora

document.querySelector('.cards').addEventListener('click', function(e){
  if(e.target.classList.contains('cards')){
    this.classList.remove('ativo');
  }
});




/* carregando... */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // tempo da logo na tela
  setTimeout(() => {
    loader.classList.add("saindo");

    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
    }, 800);

  }, 1400);
});