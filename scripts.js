// ================= HEADER SCROLL =================
const header = document.querySelector('header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// ================= MENU HAMBURGUER =================
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      nav.classList.remove("active");
    });
  });
}

// ================= MODAL HORÁRIO =================
function abrirHorario() {
  const modal = document.getElementById("modalHorario");
  if (modal) modal.style.display = "flex";
}

function fecharHorario() {
  const modal = document.getElementById("modalHorario");
  if (modal) modal.style.display = "none";
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("modalHorario");
  if (modal && event.target === modal) {
    modal.style.display = "none";
  }
});

// ================= FORMULÁRIO =================
function abrirFormulario() {
  const popup = document.getElementById("popup-formulario");
  if (popup) popup.style.display = "flex";
}

function fecharFormulario() {
  const popup = document.getElementById("popup-formulario");
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

function mostrarAcessibilidade() {
  const acessibilidade = document.getElementById("acessibilidade")?.value;
  const campo = document.getElementById("campo-acessibilidade");

  if (campo) {
    campo.style.display = (acessibilidade === "Sim") ? "block" : "none";
  }
}

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {

  const btnEnviar = document.getElementById("btnEnviar");
  const acessibilidadeEl = document.getElementById("acessibilidade");

  // acessibilidade dinâmica
  if (acessibilidadeEl) {
    acessibilidadeEl.addEventListener("change", mostrarAcessibilidade);
  }

  // botão enviar
  if (btnEnviar) {
    btnEnviar.addEventListener("click", function (e) {
      e.preventDefault();
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

      // validação
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

      // WhatsApp
      const mensagem =
        `*NOVA PRÉ-MATRÍCULA 2027*\n\nResponsável: ${responsavel}\nAluno: ${aluno}\nSérie: ${serie}\nAcessibilidade: ${acessibilidade}\nTipo: ${qualAcessibilidade}\nTelefone: ${telefone}`;

      const numero = "5581994212337";

      window.location.href =
        "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

      // sucesso visual
      if (sucesso) {
        sucesso.style.display = "block";
        sucesso.innerHTML = "✅ Enviado com sucesso!";
      }

      const form = document.getElementById("formMatricula");
      if (form) form.reset();

      const campo = document.getElementById("campo-acessibilidade");
      if (campo) campo.style.display = "none";

      setTimeout(() => {
        fecharFormulario();
      }, 3000);

    } catch (e) {
      console.error("Erro no envio:", e);
    }
  }
});

// ================= SLIDER =================
const slides = document.querySelectorAll(".slide");
let index = 0;

function trocarSlide() {
  if (slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");

  index = (index + 1) % slides.length;
}

if (slides.length > 0) {
  trocarSlide();
  setInterval(trocarSlide, 4000);
}

// ================= GALERIA =================
function abrirGaleriaModal(src) {
  const modal = document.getElementById("galeriaModal");
  const img = document.getElementById("galeriaModalImg");

  if (modal && img) {
    modal.style.display = "flex";
    img.src = src;
  }
}

function fecharGaleriaModal() {
  const modal = document.getElementById("galeriaModal");
  if (modal) modal.style.display = "none";
}

// ================= PROJETOS =================
function mostrarCard(num) {
  const container = document.querySelector('.cards');
  const cards = document.querySelectorAll('.card');

  if (!container || cards.length === 0) return;

  cards.forEach(c => c.style.display = 'none');

  const card = document.getElementById('card' + num);
  if (card) card.style.display = 'block';

  container.classList.add('ativo');
}

// fechar modal projetos
const cardsContainer = document.querySelector('.cards');
if (cardsContainer) {
  cardsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('cards')) {
      this.classList.remove('ativo');
    }
  });
}

// ================= LOADER =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("saindo");

    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
    }, 800);

  }, 1400);
});