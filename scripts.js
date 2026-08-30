const track = document.querySelector(".depoimentos-track");
const pages = document.querySelectorAll(".depoimentos-page");
let depoIndex = 0;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function slideDepoimentos() {
  if (!track || !pages.length) return;
  depoIndex = (depoIndex + 1) % pages.length;
  track.style.transform = `translateX(-${depoIndex * 100}%)`;
}

if (track && pages.length > 1 && !reduceMotion) {
  setInterval(slideDepoimentos, 8000);
}

const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 80);
  });
}

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

function fecharMenu() {
  if (!menuToggle || !nav) return;
  menuToggle.classList.remove("active");
  nav.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const aberto = nav.classList.toggle("active");
    menuToggle.classList.toggle("active", aberto);
    document.body.classList.toggle("menu-open", aberto);
    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => fecharMenu());
  });
}

function trancarScroll(trancar) {
  document.body.style.overflow = trancar ? "hidden" : "";
}

function abrirHorario() {
  const modal = document.getElementById("modalHorario");
  if (!modal) return;
  modal.classList.add("ativo");
  modal.style.display = "flex";
  trancarScroll(true);
}

function fecharHorario() {
  const modal = document.getElementById("modalHorario");
  if (!modal) return;
  modal.classList.remove("ativo");
  modal.style.display = "none";
  trancarScroll(false);
}

function abrirFormulario() {
  const popup = document.getElementById("popup-formulario");
  if (!popup) return;
  popup.classList.add("ativo");
  popup.style.display = "flex";
  trancarScroll(true);
}

function fecharFormulario() {
  const popup = document.getElementById("popup-formulario");
  if (!popup) return;
  popup.classList.remove("ativo");
  popup.style.display = "none";
  trancarScroll(false);

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
    campo.style.display = acessibilidade === "Sim" ? "block" : "none";
  }
}

function abrirGaleriaModal(src) {
  const modal = document.getElementById("galeriaModal");
  const img = document.getElementById("galeriaModalImg");
  if (!modal || !img || !src) return;
  img.src = src;
  modal.classList.add("ativo");
  modal.style.display = "flex";
  trancarScroll(true);
}

function fecharGaleriaModal() {
  const modal = document.getElementById("galeriaModal");
  if (!modal) return;
  modal.classList.remove("ativo");
  modal.style.display = "none";
  trancarScroll(false);
}

function fecharProjetos() {
  const container = document.querySelector(".cards");
  if (!container) return;
  container.classList.remove("ativo");
  trancarScroll(false);
}

function mostrarCard(num) {
  const container = document.querySelector(".cards");
  const cards = document.querySelectorAll(".card");
  if (!container || !cards.length) return;

  cards.forEach((c) => {
    c.style.display = "none";
  });

  document.querySelectorAll(".btn-projeto").forEach((btn, i) => {
    btn.classList.toggle("ativo", i + 1 === num);
  });

  const card = document.getElementById("card" + num);
  if (card) card.style.display = "block";

  container.classList.add("ativo");
  trancarScroll(true);
}

document.addEventListener("DOMContentLoaded", () => {
  const btnEnviar = document.getElementById("btnEnviar");
  const acessibilidadeEl = document.getElementById("acessibilidade");

  if (acessibilidadeEl) {
    acessibilidadeEl.addEventListener("change", mostrarAcessibilidade);
  }

  if (btnEnviar) {
    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();
      enviarFormulario();
    });
  }

  const modalHorario = document.getElementById("modalHorario");
  if (modalHorario) {
    modalHorario.addEventListener("click", (event) => {
      if (event.target === modalHorario) fecharHorario();
    });
  }

  const popup = document.getElementById("popup-formulario");
  if (popup) {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) fecharFormulario();
    });
  }

  const galeriaTrack = document.querySelector(".galeria-track");
  if (galeriaTrack && !galeriaTrack.dataset.cloned) {
    galeriaTrack.innerHTML += galeriaTrack.innerHTML;
    galeriaTrack.dataset.cloned = "1";
  }

  const galeriaModal = document.getElementById("galeriaModal");
  const galeriaImg = document.getElementById("galeriaModalImg");
  if (galeriaModal) {
    galeriaModal.addEventListener("click", fecharGaleriaModal);
  }
  if (galeriaImg) {
    galeriaImg.addEventListener("click", (e) => e.stopPropagation());
  }

  const cardsContainer = document.querySelector(".cards");
  if (cardsContainer) {
    cardsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("cards")) {
        fecharProjetos();
      }
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

      if (!responsavel || !aluno || !serie || !telefone || !acessibilidade) {
        if (erro) {
          erro.style.display = "block";
          erro.textContent = "⚠️ Preencha todos os campos obrigatórios.";
        }
        return;
      }

      if (acessibilidade === "Sim" && !qualAcessibilidade) {
        if (erro) {
          erro.style.display = "block";
          erro.textContent = "⚠️ Informe a acessibilidade.";
        }
        return;
      }

      if (erro) erro.style.display = "none";

      const mensagem =
        `*NOVA PRÉ-MATRÍCULA 2027*\n\nResponsável: ${responsavel}\nAluno: ${aluno}\nSérie: ${serie}\nAcessibilidade: ${acessibilidade}\nTipo: ${qualAcessibilidade}\nTelefone: ${telefone}`;

      const numero = "5581994212337";
      window.location.href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

      if (sucesso) {
        sucesso.style.display = "block";
        sucesso.textContent = "✅ Enviado com sucesso!";
      }

      const form = document.getElementById("formMatricula");
      if (form) form.reset();

      const campo = document.getElementById("campo-acessibilidade");
      if (campo) campo.style.display = "none";

      setTimeout(() => fecharFormulario(), 3000);
    } catch (e) {
      console.error("Erro no envio:", e);
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  fecharHorario();
  fecharFormulario();
  fecharGaleriaModal();
  fecharProjetos();
  fecharMenu();
});

const slides = document.querySelectorAll(".baner .slide");
let slideIndex = 0;

function trocarSlide() {
  if (slides.length < 2) return;
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[slideIndex].classList.add("active");
  slideIndex = (slideIndex + 1) % slides.length;
}

if (slides.length > 1) {
  trocarSlide();
  setInterval(trocarSlide, 4000);
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("saindo");
    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
    }, 500);
  }, reduceMotion ? 200 : 900);
});
