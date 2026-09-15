const isIPhone = /iPhone|iPod/.test(navigator.userAgent || "");
const pageScroll = document.getElementById("page-scroll");
if (isIPhone && pageScroll) {
  document.documentElement.classList.add("ios-noscroll");
}

function getScrollY() {
  if (isIPhone && pageScroll) return pageScroll.scrollTop;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function onPageScroll(fn) {
  if (isIPhone && pageScroll) {
    pageScroll.addEventListener("scroll", fn, { passive: true });
  } else {
    window.addEventListener("scroll", fn, { passive: true });
  }
}

const track = document.querySelector(".depoimentos-track");
const pages = document.querySelectorAll(".depoimentos-page");
let depoIndex = 0;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function larguraDepo() {
  if (pages[0] && pages[0].offsetWidth) return pages[0].offsetWidth;
  return track && track.parentElement ? track.parentElement.clientWidth : 0;
}

function irParaDepo(i) {
  if (!track || !pages.length) return;
  depoIndex = i;
  track.style.transform = `translate3d(-${depoIndex * larguraDepo()}px, 0, 0)`;
}

function slideDepoimentos() {
  irParaDepo((depoIndex + 1) % pages.length);
}

if (track && pages.length > 1) {
  irParaDepo(0);
  setInterval(slideDepoimentos, 6000);
  window.addEventListener("resize", () => irParaDepo(depoIndex));
}

const header = document.querySelector("header");
if (header) {
  onPageScroll(() => {
    header.classList.toggle("scrolled", getScrollY() > 80);
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
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";
      if (isIPhone && pageScroll && href.startsWith("#")) {
        e.preventDefault();
        if (href === "#") {
          pageScroll.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const alvo = document.querySelector(href);
          if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      fecharMenu();
    });
  });
}

function trancarScroll(trancar) {
  document.body.style.overflow = trancar ? "hidden" : "";
  if (pageScroll && isIPhone) {
    pageScroll.style.overflowY = trancar ? "hidden" : "auto";
  }
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
      iniciarRevelar();
    }, 500);
  }, reduceMotion ? 200 : 900);
});

function iniciarRevelar() {
  const itens = document.querySelectorAll([
    ".titulo-galeria",
    ".depoimentos h2",
    ".projetos .titulo-wrapper",
    ".btn-projeto",
    ".titulo-sobre",
    ".card1",
    ".card2",
    ".card3",
    ".card4",
    ".nivel_ensino h2",
    ".cardinf",
    ".banner-matricula .conteudo",
    ".contato-box",
    ".endereco-box",
    ".atendimento-box",
    ".mapa",
    ".redes-sociais"
  ].join(","));

  if (!itens.length) return;

  if (reduceMotion) {
    itens.forEach((el) => el.classList.add("revelar", "visivel"));
    return;
  }

  itens.forEach((el, i) => {
    el.classList.add("revelar");
    el.style.setProperty("--revelar-atraso", `${(i % 4) * 80}ms`);
  });

  const naTela = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.88 && r.bottom > 40;
  };

  const mostrar = (el) => el.classList.add("visivel");

  const checar = () => {
    itens.forEach((el) => {
      if (!el.classList.contains("visivel") && naTela(el)) mostrar(el);
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        mostrar(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      root: isIPhone && pageScroll ? pageScroll : null,
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });
    itens.forEach((el) => observer.observe(el));
  }

  checar();
  onPageScroll(checar);
  window.addEventListener("resize", checar);
}

function limitarOverscrollIphone() {
  if (!isIPhone) return;

  const scroller = pageScroll || document.scrollingElement || document.documentElement;
  let startY = 0;

  scroller.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  scroller.addEventListener("touchmove", (e) => {
    if (e.touches.length !== 1) return;
    if (document.body.classList.contains("menu-open")) return;
    if (e.target.closest && e.target.closest(".menu.active, .popup, .modal-horario, .galeria-modal")) return;

    const delta = e.touches[0].clientY - startY;
    const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
    const atual = scroller.scrollTop || 0;

    if (atual <= 0 && delta > 0) {
      e.preventDefault();
      return;
    }
    if (atual >= max - 1 && delta < 0) {
      e.preventDefault();
    }
  }, { passive: false });
}

limitarOverscrollIphone();
