


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



// ======= ABRIR / FECHAR JANELA =======
const openJanelaBtn = document.getElementById('openJanela');
const janela = document.getElementById('janelaAluno');
const closeJanelaBtn = document.getElementById('closeJanela');

// ======= FUNÇÃO RESET =======
function resetarJanela(){
  // resetar abas
  document.querySelectorAll('.aba-btn').forEach(btn=>{
    btn.classList.remove('active');
  });

  document.querySelectorAll('.aba').forEach(aba=>{
    aba.classList.remove('active');
  });

  // fechar carrinho
  carrinhoDiv.style.display = 'none';
  
  // esconder mensagem
  mensagem.style.display = 'none';

  // 🔥 OPCIONAL: limpar carrinho
  // carrinho = [];
    // atualizarCarrinho();
}

// ======= ABRIR =======
openJanelaBtn.addEventListener('click', ()=>{
  janela.style.display='flex';
});

// ======= FECHAR =======
closeJanelaBtn.addEventListener('click', ()=>{
  janela.style.display='none';
  resetarJanela();
});

// ======= CLICAR FORA =======
window.addEventListener('click', e => {
  if(e.target===janela){
    janela.style.display='none';
    resetarJanela();
  }
});

// ======= ABAS =======
const abasBtns = document.querySelectorAll('.aba-btn');
const abasConteudo = document.querySelectorAll('.aba');

abasBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    abasBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    abasConteudo.forEach(ab=>ab.classList.remove('active'));
    document.querySelector('.conteudo-'+btn.dataset.aba).classList.add('active');
  });
});

// ======= MENSAGEM =======
const mensagem = document.getElementById('mensagem');

function mostrarMensagem(){
  mensagem.style.display='block';
  setTimeout(()=>mensagem.style.display='none',1500);
}

// ======= CARRINHO =======
let carrinho=[];
const carrinhoDiv = document.getElementById('carrinho');
const itensCarrinhoDiv = document.getElementById('itensCarrinho');
const totalCarrinhoDiv = document.getElementById('totalCarrinho');

document.getElementById('btnCarrinhoTopo').addEventListener('click', ()=>{
  carrinhoDiv.style.display = carrinhoDiv.style.display==='flex'?'none':'flex';
});

function atualizarCarrinho(){
  itensCarrinhoDiv.innerHTML='';
  let total=0;

  carrinho.forEach((item,index)=>{
    let div = document.createElement('div');
    div.className='itensCarrinhoItem';

    div.innerHTML=`
      <img src="${item.img}">
      <div class="descricaoItem">
        <span>${item.nome} x ${item.qtd}</span>
        <span>R$${item.preco*item.qtd}</span>
      </div>
      <button class="removerItem" data-index="${index}">Remover</button>
    `;

    div.querySelector('.removerItem').addEventListener('click', ()=>{
      carrinho.splice(index,1);
      atualizarCarrinho();
    });

    itensCarrinhoDiv.appendChild(div);
    total += item.preco * item.qtd;
  });

  totalCarrinhoDiv.innerHTML=`Total: R$${total}`;
}

// ======= KITS LIVROS =======
const kits={
  maternal1:{nome:"Maternal I",preco:550,img:"livros/livro horizontal.jpg"},
  maternal2:{nome:"Maternal II",preco:550,img:"https://via.placeholder.com/150"},

  infantil1:{nome:"Infantil I",preco:300,img:"https://via.placeholder.com/150"},
  infantil2:{nome:"Infantil II",preco:310,img:"https://via.placeholder.com/150"},

  fundamental1:{nome:"1º Ano Fundamental I",preco:450,img:"https://via.placeholder.com/150"},
  fundamental2:{nome:"2º Ano Fundamental I",preco:450,img:"https://via.placeholder.com/150"},
  fundamental3:{nome:"3º Ano Fundamental I",preco:450,img:"https://via.placeholder.com/150"},
  fundamental4:{nome:"4º Ano Fundamental I",preco:450,img:"https://via.placeholder.com/150"},
  fundamental5:{nome:"5º Ano Fundamental I",preco:450,img:"https://via.placeholder.com/150"},

  fundamental6:{nome:"6º Ano Fundamental II",preco:450,img:"https://via.placeholder.com/150"},
  fundamental7:{nome:"7º Ano Fundamental II",preco:450,img:"https://via.placeholder.com/150"},
  fundamental8:{nome:"8º Ano Fundamental II",preco:450,img:"https://via.placeholder.com/150"},
  fundamental9:{nome:"9º Ano Fundamental II",preco:450,img:"https://via.placeholder.com/150"}
};

const gridLivros = document.getElementById('gridLivros');

for(let key in kits){
  let kit=kits[key];

  let div = document.createElement('div');
  div.className='cardlivros';

  div.innerHTML=`
    <img src="${kit.img}">
    <p>${kit.nome}</p>
    <div class="precoLivro">R$${kit.preco}</div>
    <label style="color:orange">Qtd: <input type="number" value="1" min="1" class="qtdLivro"></label>
    <button class="btn-add">Adicionar</button>
  `;

  div.querySelector('.btn-add').addEventListener('click', ()=>{
    let qtd=parseInt(div.querySelector('.qtdLivro').value);

    let exist = carrinho.find(i=>i.nome===kit.nome);
    if(exist) exist.qtd += qtd;
    else carrinho.push({tipo:'livro',nome:kit.nome,preco:kit.preco,qtd,img:kit.img});

    atualizarCarrinho();
    mostrarMensagem();
  });

  gridLivros.appendChild(div);
}

// ======= FARDA =======
const fardamentos=[
  {tipo:'Camisa',img:'fardamento/camisa.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Camiseta',img:'fardamento/camiseta.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Jardineira',img:'fardamento/jardineira.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Casaco',img:'fardamento/casaco.JPG',precos:{'02-06':90,'08-12':100,'14+':130}},
  {tipo:'Calça',img:'fardamento/calça.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Short',img:'fardamento/shot.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Short-Saia',img:'fardamento/shortsaia.JPG',precos:{'02-06':70,'08-12':80,'14+':90}}
];

const gridFardamentos = document.getElementById('gridFardamentos');

fardamentos.forEach(f=>{
  let div=document.createElement('div');
  div.className='cardfardamento';

  div.innerHTML=`
    <img src="${f.img}">
    <span>${f.tipo}</span>
    <label style="color:orange">Idade:
      <select class="idadeFard">
        <option value="">--Escolha--</option>
        <option value="02-06">02-06 anos</option>
        <option value="08-12">08-12 anos</option>
        <option value="14+">14+ anos</option>
      </select>
    </label>
    <div class="precoFardamento"></div>
    <label style="color:orange">Qtd: <input type="number" value="1" min="1" class="qtdFard"></label>
    <button class="btn-add">Adicionar</button>
  `;

  const selectIdade = div.querySelector('.idadeFard');
  const precoDiv = div.querySelector('.precoFardamento');

  selectIdade.addEventListener('change', ()=>{
    precoDiv.innerText = selectIdade.value ? 'R$'+f.precos[selectIdade.value] : '';
  });

  div.querySelector('.btn-add').addEventListener('click', ()=>{
    if(!selectIdade.value) return alert('Selecione a idade');

    let qtd=parseInt(div.querySelector('.qtdFard').value);
    let preco=f.precos[selectIdade.value];
    let nomeItem = f.tipo+' ('+selectIdade.value+' anos)';

    let exist = carrinho.find(i=>i.nome===nomeItem);
    if(exist) exist.qtd += qtd;
    else carrinho.push({tipo:'fardamento',nome:nomeItem,preco,qtd,img:f.img});

    atualizarCarrinho();
    mostrarMensagem();
  });

  gridFardamentos.appendChild(div);
});

// ======= WHATSAPP =======
document.getElementById('btnWhatsCarrinho').addEventListener('click', ()=>{
  if(carrinho.length===0) return alert('Carrinho vazio');

  let msg='Olá, gostaria de comprar:\n';

  carrinho.forEach(item=>{
    msg+=`${item.nome} x ${item.qtd} - R$${item.preco*item.qtd}\n`;
  });

  let total=carrinho.reduce((a,b)=>a+b.preco*b.qtd,0);
  msg+=`Total: R$${total}`;

  window.open('https://wa.me/5581993954032?text='+encodeURIComponent(msg));
});

// ======= CARTÃO =======
document.getElementById('btnCartao').addEventListener('click', ()=>{
  if(carrinho.length===0) return alert('Carrinho vazio');

  let total=carrinho.reduce((a,b)=>a+b.preco*b.qtd,0);
  alert('Redirecionando para pagamento... Total: R$'+total);
});


//  =================FIM BOTAO SOU ALUDO ===============



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
    `*NOVA PRÉ-MATRÍCULA 2027*\n\nResponsável: ${responsavel}\nAluno: ${aluno}\nSérie: ${serie}\nAcessibilidade: ${acessibilidade}\nTipo: ${qualAcessibilidade}\nTelefone: ${telefone}`;
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
