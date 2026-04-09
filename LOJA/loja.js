
// ================== LOGIN ==================

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

// ================== LOGIN UI ==================

document.addEventListener("DOMContentLoaded", carregarUsuario);

// ================== LOGOUT ==================

function logout(){
  localStorage.removeItem("logado");
  localStorage.removeItem("nomeResp");
  localStorage.removeItem("chave");
  localStorage.removeItem("ultimaSessao");

  window.location.href = "login.html";
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


function mostrarcartao(mensagem) {
  const toast = document.getElementById('toast');
  toast.innerHTML = mensagem;
  
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ================== SESSÃO ==================
function salvarSessao() {
  const agora = new Date().getTime();
  localStorage.setItem("ultimaSessao", agora);
}

// verifica se expirou
function verificarSessao() {

  // 🔥 CORREÇÃO: só verifica se estiver logado
  if(!usuarioLogado()) return;

  const ultima = localStorage.getItem("ultimaSessao");

  // 🔥 evita logout na primeira vez
  if (!ultima) {
    salvarSessao();
    return;
  }

  const agora = new Date().getTime();
  const diferenca = agora - ultima;

  const limite = 3 * 60 * 1000; // 3 minutos

  if (diferenca > limite) {
    logout();
  }
}


// ================== INICIALIZAÇÃO ==================

// 🔥 executa só se estiver logado
if(usuarioLogado()){
  verificarSessao();
  salvarSessao();
}

// mantém sessão ativa enquanto usa o site
setInterval(() => {
  if(usuarioLogado()){
    salvarSessao();
  }
}, 30000);


// TROCAR TELAS
//function mostrarCadastro(){
//  document.getElementById("loginBox").classList.add("hidden");
//  document.getElementById("cadastroBox").classList.remove("hidden");
//}

function mostrarLogin(){
  document.getElementById("cadastroBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}


// ================= MENU HAMBURGUER =================
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



//====================LIVROS E FARDAMENTOS============================================
// ABRIR ABA
function abrirAba(tipo, event) {
  event.stopPropagation(); // evita fechar ao clicar no botão

  fecharTudo();

   // 🔥 ESCONDE KITS
  document.getElementById('areaKits').style.display = 'none';

  if (tipo === 'livros') {
    document.querySelector('.filtros-livros').classList.add('ativo');
    document.querySelector('.conteudo-livros').classList.add('ativa');
  }

  if (tipo === 'fardamentos') {
    document.querySelector('.filtros-fardamentos').classList.add('ativo');
    document.querySelector('.conteudo-fardamentos').classList.add('ativa');
  }

  if (tipo === 'lista-materiais') {
    document.querySelector('.filtros-lista').classList.add('ativo');
    document.querySelector('.conteudo-listas').classList.add('ativa');
  }
}


// FUNÇÃO CENTRAL DE FECHAR
function fecharTudo() {
  document.querySelector('.filtros-livros').classList.remove('ativo');
  document.querySelector('.filtros-fardamentos').classList.remove('ativo');
  document.querySelector('.filtros-lista').classList.remove('ativo');

  document.querySelector('.conteudo-livros').classList.remove('ativa');
  document.querySelector('.conteudo-fardamentos').classList.remove('ativa');
  document.querySelector('.conteudo-listas').classList.remove('ativa');

  // 🔥 MOSTRA KITS NOVAMENTE
  document.getElementById('areaKits').style.display = 'grid';
}


// CLIQUE FORA
document.addEventListener('click', function(e) {
  const area = document.querySelector('.layout-loja');

  if (!area.contains(e.target)) {
    fecharTudo();
  }
});


// TECLA ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    fecharTudo();
  }
});

//====================FECHAR AO CLICAR FORA============================================





//=========================LISTA DE MATERIAIS==========================================
// ================= LISTAS =================

const listas = [
  { nome: "Lista Maternal II", categoria: "infantil", img: "list/lista_1_ano.png", arquivo: "listas/maternal2.pdf" },
  { nome: "Lista Maternal III", categoria: "infantil", img: "list/lista_2_ano.png", arquivo: "listas/maternal3.pdf" },
  { nome: "Lista Infantil I", categoria: "infantil", img: "list/lista_4_ano.png", arquivo: "..//pdf/listajardimI.pdf" },
  { nome: "Lista Infantil II", categoria: "infantil", img: "list/lista_5_ano.png", arquivo: ".//pdf/listajardimII.pdf" },

  { nome: "Lista 1º Ano", categoria: "fund1", img: "list/lista_5_ano.png", arquivo: "listas/1ano.pdf" },
  { nome: "Lista 2º Ano", categoria: "fund1", img: "list/lista_4_ano.png", arquivo: "listas/2ano.pdf" },
  { nome: "Lista 3º Ano", categoria: "fund1", img: "list/lista_3_ano.png", arquivo: "listas/3ano.pdf" },
  { nome: "Lista 4º Ano", categoria: "fund1", img: "list/lista_2_ano.png", arquivo: "listas/4ano.pdf" },
  { nome: "Lista 5º Ano", categoria: "fund1", img: "list/lista_1_ano.png", arquivo: "listas/5ano.pdf" },

  { nome: "Lista 6º Ano", categoria: "fund2", img: "list/lista_1_ano.png", arquivo: "listas/6ano.pdf" },
  { nome: "Lista 7º Ano", categoria: "fund2", img: "list/lista_2_ano.png", arquivo: "listas/7ano.pdf" },
  { nome: "Lista 8º Ano", categoria: "fund2", img: "list/lista_3_ano.png", arquivo: "listas/8ano.pdf" },
  { nome: "Lista 9º Ano", categoria: "fund2", img: "list/lista_4_ano.png", arquivo: "listas/9ano.pdf" }
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
  maternal2: { nome: " Kit Maternal II", preco: 550, img: "livros/m1.webp", categoria: "infantil" },
  maternal3: { nome: " Kit Maternal III", preco: 550, img: "livros/m2.webp", categoria: "infantil" },
  infantil1: { nome: "Kit Infantil I", preco: 550, img: "livros/infant1.webp", categoria: "infantil" },
  infantil2: { nome: "Kit Infantil II", preco: 550, img: "livros/infant2.webp", categoria: "infantil" },

  // FUNDAMENTAL I
  fundamental1: { nome: "Kit 1º Ano ", preco: 565, img: "livros/1ano.webp", categoria: "fund1" },
  fundamental2: { nome: "Kit 2º Ano ", preco: 575, img: "livros/2ano.webp", categoria: "fund1" },
  fundamental3: { nome: "Kit 3º Ano ", preco: 590, img: "livros/3ano.webp", categoria: "fund1" },
  fundamental4: { nome: "Kit 4º Ano ", preco: 605, img: "livros/4ano.webp", categoria: "fund1" },
  fundamental5: { nome: "Kit 5º Ano ", preco: 620, img: "livros/5ano.webp", categoria: "fund1" },

  // FUNDAMENTAL II
  fundamental6: { nome: "Kit 6º Ano ", preco: 765, img: "livros/6ano.webp", categoria: "fund2" },
  fundamental7: { nome: "Kit 7º Ano ", preco: 770, img: "livros/7ano.webp", categoria: "fund2" },
  fundamental8: { nome: "Kit 8º Ano ", preco: 780, img: "livros/8ano.webp", categoria: "fund2" },
  fundamental9: { nome: "Kit 9º Ano ", preco: 795, img: "livros/9ano.webp", categoria: "fund2" }

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
    precos:{ '2':70,'4':70,'6':70,'8':80,'10':80,'12':80,'14':90,'16':90 } },

  { tipo:'Camiseta', img:'fardamento/camiseta.JPG', categoria:'infantil',
    precos:{ '2':70,'4':70,'6':70,'8':80,'10':80,'12':80,'14':90,'16':90 } },

  { tipo:'Jardineira', img:'fardamento/jardineira.JPG', categoria:'infantil',
    precos:{ '2':70,'4':70,'6':70,'8':80,'10':80 } },

  { tipo:'Casaco', img:'fardamento/casaco.JPG', categoria:'infantil',
    precos:{ '2':100,'4':100,'6':100,'8':100,'10':100,'12':100,'14':130,'16':130 } },

  { tipo:'Calça', img:'fardamento/calça.JPG', categoria:'infantil',
    precos:{ '2':70,'4':70,'6':70,'8':80,'10':80,'12':80,'14':90,'16':90 } },

  { tipo:'Short', img:'fardamento/shot.JPG', categoria:'infantil',
    precos:{ '2':70,'4':70,'6':70,'8':80,'10':80,'12':80,'14':90,'16':90 } },

  { tipo:'Short-Saia', img:'fardamento/shortsaia.JPG', categoria:'infantil',
    precos:{ '2':70,'4':70,'6':70,'8':80,'10':80,'12':80,'14':90,'16':90 } },


  // ================= FUNDAMENTAL I =================
  { tipo:'Camisa', img:'fardamento/camisa.JPG', categoria:'fund1',
    precos:{ '6':70,'8':70,'10':70,'12':80,'14':90,'16':90,'P':30,'M':40,'G':60,'GG':80 } },

  { tipo:'Camiseta', img:'fardamento/camiseta.JPG', categoria:'fund1',
    precos:{ '6':70,'8':70,'10':70,'12':80,'14':90,'16':90,'P':30,'M':40,'G':60,'GG':80 } },

  { tipo:'Casaco', img:'fardamento/casaco.JPG', categoria:'fund1',
    precos:{ '6':100,'8':100,'10':100,'12':100,'14':100,'16':100,'P':100,'M':100,'G':130,'GG':130 } },

  { tipo:'Calça', img:'fardamento/calça.JPG', categoria:'fund1',
    precos:{ '6':70,'8':70,'10':70,'12':80,'14':90,'16':90,'P':30,'M':40,'G':60,'GG':80 } },

  { tipo:'Short', img:'fardamento/shot.JPG', categoria:'fund1',
    precos:{ '6':70,'8':70,'10':70,'12':80,'14':90,'16':90,'P':30,'M':40,'G':60,'GG':80 } },

  { tipo:'Short-Saia', img:'fardamento/shortsaia.JPG', categoria:'fund1',
    precos:{ '6':70,'8':70,'10':70,'12':80,'14':90,'16':90,'P':30,'M':40,'G':60,'GG':80 } },


  // ================= FUNDAMENTAL II =================
  { tipo:'Camisa', img:'fardamento/camisaFundII.jpeg', categoria:'fund2',
    precos:{ '12':80,'14':90,'16':90,'P':90,'M':90,'G':90,'GG':100 } },

  { tipo:'Camiseta', img:'fardamento/camisetaFundII.jpeg', categoria:'fund2',
    precos:{ '12':80,'14':90,'16':90,'P':90,'M':90,'G':90,'GG':100 } },

  { tipo:'Casaco', img:'fardamento/casaco.JPG', categoria:'fund2',
    precos:{ '12':100,'14':100,'16':130,'P':130,'M':130,'G':130,'GG':130 } },

  { tipo:'Short', img:'fardamento/shot.JPG', categoria:'fund2',
    precos:{ '12':90,'14':90,'16':90,'P':90,'M':90,'G':90,'GG':90 } },

  { tipo:'Short-Saia', img:'fardamento/shortsaia.JPG', categoria:'fund2',
    precos:{ '12':90,'14':90,'16':90,'P':90,'M':90,'G':90,'GG':90 } },

  { tipo:'Calça Tactel', img:'fardamento/calça.JPG', categoria:'fund2',
    precos:{ '12':90,'14':90,'16':90,'P':90,'M':90,'G':90,'GG':90 } },

  { tipo:'Calça Bryn', img:'fardamento/calçabryn.jpeg', categoria:'fund2',
    precos:{ '36':70,'38':80,'40':90,'42':80,'44':80 } },
];


// ================= MOSTRAR =================
function mostrarFardamentos(lista){
  const grid = document.getElementById('gridFardamentos');
  grid.innerHTML = '';

  lista.forEach((item)=>{

    let opcoes = '';

    let tamanhos = Object.keys(item.precos);

    let numeros = tamanhos.filter(t => !isNaN(t)).map(Number).sort((a,b)=>a-b);
    let letras = tamanhos.filter(t => isNaN(t));

    const ordem = ['PP','P','M','G','GG','XG'];
    letras.sort((a,b) => ordem.indexOf(a) - ordem.indexOf(b));

    tamanhos = [...numeros.map(String), ...letras];

    tamanhos.forEach(t => {
      opcoes += `<option value="${t}">${t}</option>`;
    });

    grid.innerHTML += `
      <div class="cardfardamento">
        <img src="${item.img}">
        <h3>${item.tipo}</h3>

        <select data-precos='${JSON.stringify(item.precos)}' onchange="atualizarPreco(this)">
          <option value="">Selecione</option>
          ${opcoes}
        </select>

        <p class="preco">Selecione o tamanho</p>

        <button class="btn-add" onclick="addFardamento(this)">
          Comprar
        </button>
      </div>
    `;
  });
}


// ================= ATUALIZAR PREÇO =================
function atualizarPreco(select){
  const tamanho = select.value;

  const precos = JSON.parse(select.dataset.precos);
  const preco = precos[tamanho];

  select.parentElement.querySelector('.preco').innerText =
    formatarPreco(preco);
}


// ================= ADICIONAR =================
function addFardamento(botao){

  const card = botao.closest('.cardfardamento');
  const select = card.querySelector('select');

  const tamanho = select.value;

  if(!tamanho){
    mostrarPopup("Selecione o tamanho!");
    return;
  }

  const precos = JSON.parse(select.dataset.precos);
  const preco = precos[tamanho];

  const nome = card.querySelector('h3').innerText;
  const img = card.querySelector('img').src;

  carrinho.push({
    nome: nome + " - " + tamanho,
    preco: preco,
    qtd: 1,
    img: img
  });

  atualizarCarrinho();
  animarAdicionar(card.querySelector('img'));
}


// ================= FILTRO =================
function filtrarFardamento(categoria) {
  const filtrados = fardamentos.filter(item => item.categoria === categoria);
  mostrarFardamentos(filtrados);
}



// ================= CARRINHO =================
let carrinho = [];

const carrinhoDiv = document.getElementById('carrinho');
const itensCarrinhoDiv = document.getElementById('itensCarrinho');
const totalCarrinhoDiv = document.getElementById('totalCarrinho');
const contador = document.getElementById('contadorCarrinho');
const btnCarrinho = document.getElementById('btnCarrinhoTopo');

// ABRIR / FECHAR
btnCarrinho.onclick = (e)=>{
  e.stopPropagation(); // 🔥 ESSA LINHA resolve o problema

  carrinhoDiv.style.display = 
    carrinhoDiv.style.display === 'flex' ? 'none' : 'flex';
};
// FECHAR FORA
document.addEventListener('click', function(e){
  if(
    carrinhoDiv.style.display === 'flex' &&
    !carrinhoDiv.contains(e.target) &&
    !btnCarrinho.contains(e.target)
  ){
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
          <span class="qtdItem">Qtd: ${item.qtd}</span> <br>
          <span class="nomeItem">${item.nome}</span> <br>
          <span class="precoItem">${formatarPreco(item.preco * item.qtd)}</span>
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

//==============================Kit Fardamento ====================================================
const kits = [

  // ================= INFANTIL =================
  {
    nome: "Kit Completo <br> Feminino ",
    categoria: "normal",
    img: "kit/kit comp fud I fem.jpg",
    descricao: "Camisa + Short-saia + Calça + Casaco",
    precos: {
      "2": 340.00,
      "4": 340.00,
      "6": 340.00,
      "8": 340.00,
      "10": 340.00
    }
  },

  {
    nome: "Kit Completo <br>  Masculino ",
    categoria: "normal",
    img: "kit/kit comp fud I masc.jpg",
    descricao: "Camisa + Short + Calça + Casaco",
    precos: {
      "2": 340.00,
      "4": 340.00,
      "6": 340.00,
      "8": 340.00,
      "10": 340.00
    }
  },

  {
    nome: "Kit Educação <br> Física Masculino",
    categoria: "normal",
    img: "kit/kit masculino ed.jpg",
    descricao: "Camiseta + Short",
    maisVendido: true,
    precos: {
      "2": 140.00,
      "4": 140.00,
      "6": 140.00,
      "8": 140.00,
      "10": 140.00,
      
    }
  },

  {
    nome: "Kit Educação <br>  Física Feminino",
    categoria: "normal",
    img: "kit/feminino Edf.jpg",
    descricao: "Camiseta + Short-saia",
    maisVendido: true,
    precos: {
      "2": 140.00,
      "4": 140.00,
      "6": 140.00,
      "8": 140.00,
      "10": 140.00,
    }
  },

  // ================= FUNDAMENTAL I =================
  {
    nome: "Kit <br> Fundamental I",
    categoria: "fund1",
    img: "kit/kit geral.jpg",
    descricao: "Camisa + Calça",
    maisVendido: true, 
    precos: {
      "10": 140.00,
      "12": 140.00,
      "14": 160.00,
      "P": 140.00,
      "M": 160.00,
      "G": 160.00
    }
  },

  {
    nome: "Kit Inverno",
    categoria: "geral",
    img: "kit/kit inverno.jpg",
    descricao: "Casaco + Camisa + Calça",
    precos: {
      "P": 210.00,
      "M": 210.00,
      "G": 240.00,
      "GG": 240.00
    }
  },


  // ================= FUNDAMENTAL II =================
  {
    nome: "Kit Completo <br> Fem. Fund. II",
    categoria: "fund2",
    img: "kit/kit comp fud II fem.jpg",
    descricao: "Camisa + Short-saia + Calça + Casaco",
    precos: {
      "12": 370.00,
      "14": 370.00,
      "16": 370.00,
      "P": 370.00,
      "M": 370.00,
      "G": 370.00
    }
  },

  {
    nome: "Kit Completo <br> Masc. Fund.II",
    categoria: "fund2",
    img: "kit/kit comp fud II masc.jpg",
    descricao: "Camisa + Short + Calça + Casaco",
    precos: {
      "12": 370.00,
      "14": 370.00,
      "16": 370.00,
      "P": 370.00,
      "M": 370.00,
      "G": 370.00
    }
  },

  {
    nome: "Kit Fundamental II Tactel",
    categoria: "fund2",
    img: "kit/kit Fund II tectel.jpg",
    descricao: "Camisa + Calça Tactel",
    maisVendido: true, // 🔥 AQUI
    precos: {
      "12": 180.00,
      "14": 180.00,
      "16": 180.00,
      "P": 180.00,
      "M": 180.00,
      "G": 180.00
    }
  },

  {
    nome: "Kit Fundamental II Bryn",
    categoria: "fund2",
    img: "kit/kit Fund II brin.jpg",
    descricao: "Camisa + Calça Bryn",
    precos: {
      "36": 180.90,
      "38": 180.90,
      "40": 180.90,
      "42": 180.90,
      "44": 180.90
    }
  },

  {
    nome: "Kit Educação <br>  Física Fundamental II",
    categoria: "fund2",
    img: "kit/Kit edf FII.jpg",
    descricao: "Camiseta + Short",
    maisVendido: true,
    precos: {
      "12": 180.90,
      "14": 180.90,
      "16": 180.90,
      "P": 180.90,
      "M": 180.90,
      "G": 180.90
    }
  },

  // ================= INVERNO =================
  
  {
    nome: "Kit Inverno <br> Fundamental II",
    categoria: "geral",
    img: "kit/Kit inverno FII.jpg",
    descricao: "Casaco + Camisa + Calça",
    precos: {
      "P": 220.90,
      "M": 220.90,
      "G": 220.90,
      "GG": 220.90
    }
  }

];
function mostrarKits(lista){
  const grid = document.getElementById('areaKits');
  grid.innerHTML = '';

  lista.forEach(item => {

    const tagMaisVendido = item.maisVendido 
      ? `<span class="tag-vendido">★ MAIS VENDIDO</span>` 
      : '';

    let tamanhos = Object.keys(item.precos);

    let opcoes = tamanhos.map(t => 
      `<option value="${t}">${t}</option>`
    ).join('');

    grid.innerHTML += `
    <div class="cardkit ${item.maisVendido ? 'destaque' : ''}">
      ${tagMaisVendido}

      <img src="${item.img}">
      <h3>${item.nome}</h3>

      <small class="descricao">${item.descricao}</small>

      <select data-precos='${JSON.stringify(item.precos)}' onchange="atualizarPrecoKit(this)">
        <option value="">Tamanho</option>
        ${opcoes}
      </select>

      <p class="preco">Selecione o tamanho</p>

      <button class="btn-add" onclick="addKit(this)">
        Comprar Kit
      </button>
    </div>
    `;
  });
}

function atualizarPrecoKit(select){
  const tamanho = select.value;
  const precos = JSON.parse(select.dataset.precos);
  const preco = precos[tamanho];

  if(preco){
    select.parentElement.querySelector('.preco').innerText =
      formatarPreco(preco);
  }
}

function addKit(botao){

  const card = botao.closest('.cardkit');

  const nome = card.querySelector('h3').innerText.replace(/\n/g, ' ').trim(); 
  const precoTexto = card.querySelector('.preco').innerText;
  const tamanho = card.querySelector('select').value;
  const img = card.querySelector('img').src;

  const descricao = card.querySelector('.descricao') 
    ? card.querySelector('.descricao').innerText 
    : '';

  if(!tamanho){
    mostrarPopup("Selecione o tamanho!");
    return;
  }

  const preco = Number(precoTexto.replace(/[^\d,]/g,'').replace(',','.'));

  carrinho.push({
    nome: nome + " - Nº " + tamanho, 
    preco: preco,
    qtd: 1,
    img: img,
    descricao: descricao
  });

  atualizarCarrinho();
  animarAdicionar(card.querySelector('img')); 
}

// ======= WHATSAPP =======
document.getElementById('btnWhatsCarrinho').onclick = () => {

  if(!usuarioLogado()){
    mostrarPopup("Faça login para finalizar a compra!");
    setTimeout(()=>{
      window.location.href = "login.html";
    }, 1500);
    return;
  }

  if(carrinho.length === 0){
    return mostrarPopup('Carrinho vazio');
  }

 
  const nomeCliente = localStorage.getItem('nomeResp') || 'Cliente';

  let total = 0;

  let msg = `🛒 *Pedido da Loja*\n`;
  msg += `👤 Cliente: *${nomeCliente}*\n\n`;

  carrinho.forEach(i => {
    let subtotal = i.preco * i.qtd;
    total += subtotal;

    msg += `➡️ *${i.nome}*\n`;

    if(i.descricao){
      msg += `📝 ${i.descricao}\n`;
    }

    msg += `🔢 Quantidade: ${i.qtd}\n`;
    msg += `💰 Subtotal: ${formatarPreco(subtotal)}\n\n`;
  });

  msg += `━━━━━━━━━━━━━━\n`;
  msg += `💵 *TOTAL: ${formatarPreco(total)}*\n`;
  msg += `━━━━━━━━━━━━━━\n\n`;
  msg += `📲 Aguardando confirmação do pedido.`;

  // 🔥 ESSENCIAL (corrige emoji)
  const url = 'https://api.whatsapp.com/send?phone=5581993954032&text=' + encodeURIComponent(msg);
window.open(url, '_blank');
};

// ======= CARTÃO =======

document.getElementById('btnCartao').onclick = () => {
  mostrarcartao(`
    Opção indisponível.<br><br>
    <strong style="color:#25D366; font-size:16px;">
      <i class="fa-brands fa-whatsapp"></i> Finalize pelo WhatsApp
    </strong>
  `);
};
//document.getElementById('btnCartao').onclick=()=>{

//  if(!usuarioLogado()){
//    mostrarPopup("Faça login para finalizar a compra!");
//    setTimeout(()=>{
//      window.location.href = "login.html";
//    }, 1500);
//    return;
//  }

//  if(carrinho.length===0) return mostrarPopup('Carrinho vazio');

//  let total=carrinho.reduce((a,b)=>a+b.preco*b.qtd,0);
//mostrarPopup('Pagamento em breve selecione a opção pelo "Whatsapp".\nTotal: '+formatarPreco(total));
//};


document.addEventListener("DOMContentLoaded", () => {
  mostrarKits(kits);
});