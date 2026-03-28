function usuarioLogado(){
  return localStorage.getItem("logado") === "true";
}

function carregarUsuario(){
  const logado = localStorage.getItem("logado");
  const nome = localStorage.getItem("nomeResp");

  const perfil = document.getElementById("perfilUsuario");
  const nomeEl = document.getElementById("nomeUsuario");

  if(!perfil || !nomeEl) return;

  if(logado === "true" && nome){
    perfil.classList.remove("hidden");
    nomeEl.innerText = nome;
  }
}

// ================== SESSÃO ==================

// salva horário da última atividade
function salvarSessao() {
  const agora = new Date().getTime();
  localStorage.setItem("ultimaSessao", agora);
}

// verifica se expirou
function verificarSessao() {
  const ultima = localStorage.getItem("ultimaSessao");

  if (!ultima) return;

  const agora = new Date().getTime();
  const diferenca = agora - ultima;

  const limite = 3 * 60 * 1000; // 3 minutos

  if (diferenca > limite) {
    logout();
  }
}

// 🔥 ORDEM CORRETA
verificarSessao(); // primeiro verifica
salvarSessao();    // depois salva

// mantém sessão ativa
setInterval(() => {
  salvarSessao();
}, 30000);

// ================== LOGIN UI ==================

document.addEventListener("DOMContentLoaded", carregarUsuario);

// ================== LOGOUT ==================

function logout(){
  localStorage.removeItem("logado");
  localStorage.removeItem("nomeResp");
  localStorage.removeItem("chave");
  localStorage.removeItem("ultimaSessao");

  window.location.href = "../login.html";
}

// FIM BOTÃO USUÁRIO LOGADO

// MENSSAGENS DE ERRO
function mostrarPopup(msg){
  document.getElementById("popupMsg").innerText = msg;
  document.getElementById("popup").classList.add("show");
}

function fecharPopup(){
  document.getElementById("popup").classList.remove("show");
}




// TROCAR TELAS
//function mostrarCadastro(){
//  document.getElementById("loginBox").classList.add("hidden");
//  document.getElementById("cadastroBox").classList.remove("hidden");
//}

function mostrarLogin(){
  document.getElementById("cadastroBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}



const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

// cria overlay dinamicamente
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("ativo");
  menuToggle.classList.toggle("ativo");
  overlay.classList.toggle("ativo");
});

// fechar ao clicar fora

overlay.addEventListener("click", () => {
  menu.classList.remove("ativo");
  menuToggle.classList.remove("ativo");
  overlay.classList.remove("ativo");
});




// ======= FORMATADOR DE PREÇO =======
function formatarPreco(valor){
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}



// ======= MENSAGEM =======
const mensagem = document.getElementById('mensagem');
function mostrarMensagem(){
  mensagem.style.display='block';
  setTimeout(()=>mensagem.style.display='none',1500);
}
// ================= CARRINHO =================
let carrinho = [];

const carrinhoDiv = document.getElementById('carrinho');
const itensCarrinhoDiv = document.getElementById('itensCarrinho');
const totalCarrinhoDiv = document.getElementById('totalCarrinho');
const contador = document.getElementById('contadorCarrinho');
const btnCarrinho = document.getElementById('btnCarrinhoTopo');

// ABRIR / FECHAR
btnCarrinho.onclick = ()=>{
  carrinhoDiv.style.display = carrinhoDiv.style.display==='flex'?'none':'flex';
};

// FECHAR FORA
document.addEventListener('click', function(e){
  if(!carrinhoDiv.contains(e.target) && !btnCarrinho.contains(e.target)){
    carrinhoDiv.style.display = 'none';
  }
});

// ESC
document.addEventListener('keydown', e=>{
  if(e.key === "Escape"){
    carrinhoDiv.style.display = 'none';
  }
});

// CONTADOR
function atualizarContador(){
  let total = carrinho.reduce((s,i)=>s+i.qtd,0);
  contador.innerText = total;
}

// ANIMAÇÃO
function animarAdicionar(imgElement){
  const carrinhoIcon = btnCarrinho;

  const img = imgElement.cloneNode(true);
  const rect = imgElement.getBoundingClientRect();
  const carrinhoRect = carrinhoIcon.getBoundingClientRect();

  img.classList.add('fly-item');
  img.style.left = rect.left + 'px';
  img.style.top = rect.top + 'px';

  document.body.appendChild(img);

  setTimeout(()=>{
    img.style.left = carrinhoRect.left + 'px';
    img.style.top = carrinhoRect.top + 'px';
    img.style.opacity = 0;
    img.style.transform = 'scale(0.3)';
  },10);

  setTimeout(()=>{
    img.remove();
  },800);
}

// ATUALIZAR CARRINHO
function atualizarCarrinho(){
  itensCarrinhoDiv.innerHTML='';
  let total=0;

  carrinho.forEach((item,index)=>{
    let div = document.createElement('div');
    div.className='itensCarrinhoItem';

    div.innerHTML=`
      <div class="topoItem">
        <img src="${item.img}">
        <div>
          <spanq>Qtd: ${item.qtd}</span> <br>
          <span>${item.nome}</span>
        
          <spanp>${formatarPreco(item.preco * item.qtd)}</span>
        </div>
        <button class="removerItem">Remover</button>
      </div>
    `;

    div.querySelector('.removerItem').onclick=()=>{
      carrinho.splice(index,1);
      atualizarCarrinho();
    };

    itensCarrinhoDiv.appendChild(div);
    total += item.preco * item.qtd;
  });

totalCarrinhoDiv.innerHTML = `Total: <span style="color:red;">${formatarPreco(total)}</span>`;
  atualizarContador();
}

// FORMATAR PREÇO
function formatarPreco(valor){
  return valor.toLocaleString('pt-BR',{
    style:'currency',
    currency:'BRL'
  });
}



//====================LIVROS E FARDAMENTOS============================================
// MOSTRAR / ESCONDER FILTROS DE LIVROS
function abrirAba(tipo) {

  const filtrosLivros = document.querySelector('.filtros-livros');
  const filtrosFardamentos = document.querySelector('.filtros-fardamentos');
  const filtrosLista = document.querySelector('.filtros-lista');

  const abaLivros = document.querySelector('.conteudo-livros');
  const abaFardamentos = document.querySelector('.conteudo-fardamentos');
  const abaListas = document.querySelector('.conteudo-listas');

  // reset
  filtrosLivros.classList.remove('ativo');
  filtrosFardamentos.classList.remove('ativo');
  filtrosLista.classList.remove('ativo');

  abaLivros.classList.remove('ativa');
  abaFardamentos.classList.remove('ativa');
  abaListas.classList.remove('ativa');

  // ativar
  if (tipo === 'livros') {
    filtrosLivros.classList.add('ativo');
    abaLivros.classList.add('ativa');
  }

  if (tipo === 'fardamentos') {
    filtrosFardamentos.classList.add('ativo');
    abaFardamentos.classList.add('ativa');
  }

  if (tipo === 'lista-materiais') {
    filtrosLista.classList.add('ativo');
    abaListas.classList.add('ativa');
  }
}

//====================FECHAR AO CLICAR FORA============================================
document.addEventListener('click', function(e) {

  const menuLateral = document.querySelector('.menu-lateral');

  // se clicou fora do menu lateral (botões + filtros)
  if (!menuLateral.contains(e.target)) {

    document.querySelector('.filtros-livros').classList.remove('ativo');
    document.querySelector('.filtros-fardamentos').classList.remove('ativo');
    document.querySelector('.filtros-lista').classList.remove('ativo');

    document.querySelector('.conteudo-livros').classList.remove('ativa');
    document.querySelector('.conteudo-fardamentos').classList.remove('ativa');
    document.querySelector('.conteudo-listas').classList.remove('ativa');
  }
});

//=========================LISTA DE MATERIAIS==========================================
// ================= LISTAS =================

const listas = [
  { nome: "Lista Maternal II", categoria: "infantil", img: "..//imglista/01.jpeg", arquivo: "listas/maternal2.pdf" },
  { nome: "Lista Maternal III", categoria: "infantil", img: "../imglista/2.jpeg", arquivo: "listas/maternal3.pdf" },
  { nome: "Lista Infantil I", categoria: "infantil", img: "../imglista/3.jpeg", arquivo: "..//pdf/listajardimI.pdf" },
  { nome: "Lista Infantil II", categoria: "infantil", img: "../imglista/4.jpeg", arquivo: ".//pdf/listajardimII.pdf" },

  { nome: "Lista 1º Ano", categoria: "fund1", img: "listas/fund1.png", arquivo: "listas/1ano.pdf" },
  { nome: "Lista 2º Ano", categoria: "fund1", img: "listas/fund1.png", arquivo: "listas/2ano.pdf" },
  { nome: "Lista 3º Ano", categoria: "fund1", img: "listas/fund1.png", arquivo: "listas/3ano.pdf" },
  { nome: "Lista 4º Ano", categoria: "fund1", img: "listas/fund1.png", arquivo: "listas/4ano.pdf" },
  { nome: "Lista 5º Ano", categoria: "fund1", img: "listas/fund1.png", arquivo: "listas/5ano.pdf" },

  { nome: "Lista 6º Ano", categoria: "fund2", img: "listas/fund2.png", arquivo: "listas/6ano.pdf" },
  { nome: "Lista 7º Ano", categoria: "fund2", img: "listas/fund2.png", arquivo: "listas/7ano.pdf" },
  { nome: "Lista 8º Ano", categoria: "fund2", img: "listas/fund2.png", arquivo: "listas/8ano.pdf" },
  { nome: "Lista 9º Ano", categoria: "fund2", img: "listas/fund2.png", arquivo: "listas/9ano.pdf" }
];

function mostrarListas(lista){
  const grid = document.getElementById('gridListas');
  grid.innerHTML = '';

  lista.forEach(item=>{
    grid.innerHTML += `
      <div class="cardlista">
        <img src="${item.img}" alt="${item.nome}">
        <h3>${item.nome}</h3>
        <a href="${item.arquivo}" download class="btn-download">
          Baixar Lista
        </a>
      </div>
    `;
  });
}

function filtrarListas(categoria){
  const filtrados = listas.filter(item => item.categoria === categoria);
  mostrarListas(filtrados);
}



// MOSTRAR / ESCONDER FILTROS DE LIVROS E FARDAMENTOS

const livros = {

  // INFANTIL
  maternal2: { nome: "Maternal II", preco: 550, img: "livros/m1.png", categoria: "infantil" },
  maternal3: { nome: "Maternal III", preco: 550, img: "livros/m2.png", categoria: "infantil" },
  infantil1: { nome: "Infantil I", preco: 300, img: "livros/infant1.png", categoria: "infantil" },
  infantil2: { nome: "Infantil II", preco: 310, img: "livros/infant2.png", categoria: "infantil" },

  // FUNDAMENTAL I
  fundamental1: { nome: "1º Ano ", preco: 450, img: "livros/1ano.png", categoria: "fund1" },
  fundamental2: { nome: "2º Ano ", preco: 450, img: "livros/2ano.png", categoria: "fund1" },
  fundamental3: { nome: "3º Ano ", preco: 450, img: "livros/3ano.png", categoria: "fund1" },
  fundamental4: { nome: "4º Ano ", preco: 450, img: "livros/4ano.png", categoria: "fund1" },
  fundamental5: { nome: "5º Ano ", preco: 450, img: "livros/5ano.png", categoria: "fund1" },

  // FUNDAMENTAL II
  fundamental6: { nome: "6º Ano ", preco: 450, img: "https://via.placeholder.com/150", categoria: "fund2" },
  fundamental7: { nome: "7º Ano ", preco: 450, img: "https://via.placeholder.com/150", categoria: "fund2" },
  fundamental8: { nome: "8º Ano ", preco: 450, img: "https://via.placeholder.com/150", categoria: "fund2" },
  fundamental9: { nome: "9º Ano ", preco: 450, img: "https://via.placeholder.com/150", categoria: "fund2" }

};

function mostrarLivros(lista){
  const grid = document.getElementById('gridLivros');
  grid.innerHTML = '';

  lista.forEach(item=>{
    grid.innerHTML += `
      <div class="cardlivros">
        <img src="${item.img}">
        <h3>${item.nome}</h3>
        <p>${formatarPreco(item.preco)}</p>

        <input type="number" min="1" value="1" class="qtd">

       <button class="btn-add" onclick="addLivro(this)">  Comprar</button>
          
        </button>
      </div>
    `;
  });
}

// ADICIONAR LIVRO
function addLivro(botao){

  const card = botao.closest('.cardlivros');

  const nome = card.querySelector('h3').innerText;
  const precoTexto = card.querySelector('p').innerText;

  const preco = Number(precoTexto.replace(/[^\d,]/g,'').replace(',','.'));
  const qtd = parseInt(card.querySelector('.qtd').value) || 1;
  const img = card.querySelector('img').src;

  // 🔥 PROCURA SE JÁ EXISTE
  const itemExistente = carrinho.find(item => item.nome === nome);

  if(itemExistente){
    itemExistente.qtd += qtd; // soma quantidade
  } else {
    carrinho.push({
      nome: nome,
      preco: preco,
      qtd: qtd,
      img: img
    });
  }

  atualizarCarrinho();
  animarAdicionar(card.querySelector('img'));
  mostrarMensagem();
}

function filtrarLivros(categoria) {

  const lista = Object.values(livros);

  const filtrados = lista.filter(item => item.categoria === categoria);

  mostrarLivros(filtrados);
}


//==================FIM LIVROS==========================================================

const fardamentos = [

  // ================= INFANTIL =================
  { tipo:'Camisa', img:'fardamento/camisa.JPG', categoria:'infantil',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90,'16':90 } },

  { tipo:'Camiseta', img:'fardamento/camiseta.JPG', categoria:'infantil',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90,'16':90 } },

  { tipo:'Jardineira', img:'fardamento/jardineira.JPG', categoria:'infantil',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80 } },

  { tipo:'Casaco', img:'fardamento/casaco.JPG', categoria:'infantil',
    precos:{ '02':90,'04':90,'06':90,'08':100,'10':100,'12':100,'14':130,'16':130 } },

  { tipo:'Calça', img:'fardamento/calça.JPG', categoria:'infantil',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90,'16':90 } },

  { tipo:'Short', img:'fardamento/shot.JPG', categoria:'infantil',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90,'16':90 } },

  { tipo:'Short-Saia', img:'fardamento/shortsaia.JPG', categoria:'infantil',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90,'16':90 } },


  // ================= FUNDAMENTAL I =================
  { tipo:'Camisa', img:'fardamento/camisa.JPG', categoria:'fund1',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90 } },

  { tipo:'Camiseta', img:'fardamento/camiseta.JPG', categoria:'fund1',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90 } },

  { tipo:'Casaco', img:'fardamento/casaco.JPG', categoria:'fund1',
    precos:{ '02':90,'04':90,'06':90,'08':100,'10':100,'12':100,'14':130 } },

  { tipo:'Calça', img:'fardamento/calça.JPG', categoria:'fund1',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90 } },

  { tipo:'Short', img:'fardamento/shot.JPG', categoria:'fund1',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90 } },

  { tipo:'Short-Saia', img:'fardamento/shortsaia.JPG', categoria:'fund1',
    precos:{ '02':70,'04':70,'06':70,'08':80,'10':80,'12':80,'14':90 } },


  // ================= FUNDAMENTAL II =================
  { tipo:'Camisa ', img:'fardamento/camisa.JPG', categoria:'fund2',
    precos:{ 'P':30,'M':40,'G':60,'GG':80 } },

  { tipo:'Calça Tactel', img:'fardamento/calça.JPG', categoria:'fund2',
    precos:{ '36':70,'38':80,'40':90,'42':80,'44':80 } },

  { tipo:'Calça Bryn', img:'fardamento/calça.JPG', categoria:'fund2',
    precos:{ '36':70,'38':80,'40':90,'42':80,'44':80 } }

];
function mostrarFardamentos(lista){
  const grid = document.getElementById('gridFardamentos');
  grid.innerHTML = '';

  lista.forEach((item)=>{

    let opcoes = '';

    let tamanhos = Object.keys(item.precos);

    if(!isNaN(tamanhos[0])){
      tamanhos.sort((a,b) => a - b);
    } else {
      const ordem = ['PP','P','M','G','GG','XG'];
      tamanhos.sort((a,b) => ordem.indexOf(a) - ordem.indexOf(b));
    }

    tamanhos.forEach(t => {
      opcoes += `<option value="${t}">${t}</option>`;
    });

    grid.innerHTML += `
      <div class="cardfardamento">
        <img src="${item.img}">
        <h3>${item.tipo}</h3>

        <select onchange="atualizarPreco(this, '${item.tipo}')">
          <option value="">Selecione</option>
          ${opcoes}
        </select>

        <p class="preco">Selecione o tamanho</p>

        <button class="btn-add" onclick="addFardamento('${item.tipo}', this)">
          Comprar
        </button>
      </div>
    `;
  });
}

function atualizarPreco(select, tipo){
  const tamanho = select.value;

  const item = fardamentos.find(i => i.tipo === tipo);
  const preco = item.precos[tamanho];

  select.parentElement.querySelector('.preco').innerText =
    formatarPreco(preco);
}

function addFardamento(tipo, botao){

  const card = botao.closest('.cardfardamento');
  const select = card.querySelector('select');

  const tamanho = select.value;

  if(!tamanho){
    alert("Selecione o tamanho!");
    return;
  }

  const item = fardamentos.find(i => i.tipo === tipo);
  const preco = item.precos[tamanho];

  carrinho.push({
    nome: item.tipo + " - " + tamanho,
    preco: preco,
    qtd: 1,
    img: item.img
  });

  atualizarCarrinho();
  animarAdicionar(card.querySelector('img'));
}

function filtrarFardamento(categoria) {
  const filtrados = fardamentos.filter(item => item.categoria === categoria);
  mostrarFardamentos(filtrados);
}













//==================================================================================


// ======= WHATSAPP =======
document.getElementById('btnWhatsCarrinho').onclick=()=>{

  if(!usuarioLogado()){
    mostrarPopup("Faça login para finalizar a compra!");
    setTimeout(()=>{
      window.location.href = "login.html";
    }, 1500);
    return;
  }

  if(carrinho.length===0) return mostrarPopup('Carrinho vazio');

  let msg='Gostaria de adquirir esse(s) produto(s):%0A';
  carrinho.forEach(i=>{
    msg+=`${i.nome} x${i.qtd} - ${formatarPreco(i.preco*i.qtd)}%0A`;
  });

  window.open('https://wa.me/5581993954032?text='+msg);
};

// ======= CARTÃO =======
document.getElementById('btnCartao').onclick=()=>{

  if(!usuarioLogado()){
    mostrarPopup("Faça login para finalizar a compra!");
    setTimeout(()=>{
      window.location.href = "login.html";
    }, 1500);
    return;
  }

  if(carrinho.length===0) return mostrarPopup('Carrinho vazio');

  let total=carrinho.reduce((a,b)=>a+b.preco*b.qtd,0);
  mostrarPopup('Pagamento em breve.\nTotal: '+formatarPreco(total));
};


