
function usuarioLogado(){
  return localStorage.getItem("logado") === "true";
}

function carregarUsuario(){
  const logado = localStorage.getItem("logado");
  const nome = localStorage.getItem("nomeResp");

  const perfil = document.getElementById("perfilUsuario");
  const nomeEl = document.getElementById("nomeUsuario");

  if(!perfil || !nomeEl) return; // 🔥 evita erro

  if(logado === "true" && nome){
    perfil.classList.remove("hidden");
    nomeEl.innerText = nome;
  }
}

// chama quando carregar a página
document.addEventListener("DOMContentLoaded", carregarUsuario);

// BOTÃO USUÁRIO LOGADO


function logout(){
  // limpa tudo
  localStorage.removeItem("logado");
  localStorage.removeItem("nomeResp");
  localStorage.removeItem("chave");

  // volta pro login ou início
  window.location.href = "../login.html"; // ajusta se precisar
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
function mostrarCadastro(){
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("cadastroBox").classList.remove("hidden");
}

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

// ======= ABAS =======
const abasBtns = document.querySelectorAll('.aba-btn');
const abasConteudo = document.querySelectorAll('.aba');

let livrosCarregados = false;
let fardamentosCarregados = false;

abasBtns.forEach(btn=>{
  btn.onclick = ()=>{

    abasBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    abasConteudo.forEach(ab=>ab.classList.remove('active'));
    document.querySelector('.conteudo-'+btn.dataset.aba).classList.add('active');

    if(btn.dataset.aba === "livros" && !livrosCarregados){
      carregarLivros();
      livrosCarregados = true;
    }

    if(btn.dataset.aba === "fardamentos" && !fardamentosCarregados){
      carregarFardamentos();
      fardamentosCarregados = true;
    }

  }
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
const contador = document.getElementById('contadorCarrinho');
const btnCarrinho = document.getElementById('btnCarrinhoTopo');

// ABRIR / FECHAR
btnCarrinho.onclick = ()=>{
  carrinhoDiv.style.display = carrinhoDiv.style.display==='flex'?'none':'flex';
};

// ======= FECHAR AO CLICAR FORA =======
document.addEventListener('click', function(e){

  if(
    !carrinhoDiv.contains(e.target) &&
    !btnCarrinho.contains(e.target)
  ){
    carrinhoDiv.style.display = 'none';
  }

});

// ======= FECHAR COM ESC =======
document.addEventListener('keydown', e=>{
  if(e.key === "Escape"){
    carrinhoDiv.style.display = 'none';
  }
});

// ======= CONTADOR =======
function atualizarContador(){
  let total = carrinho.reduce((s,i)=>s+i.qtd,0);
  contador.innerText = total;
}

// ======= ANIMAÇÃO VOANDO =======
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
    carrinhoIcon.classList.add('pulse');
    setTimeout(()=>carrinhoIcon.classList.remove('pulse'),300);
  },800);
}

// ======= ATUALIZAR CARRINHO =======
function atualizarCarrinho(){
  itensCarrinhoDiv.innerHTML='';
  let total=0;

  carrinho.forEach((item,index)=>{
    let div = document.createElement('div');
    div.className='itensCarrinhoItem';

 div.innerHTML=`
  <div class="topoItem">
    
    <img src="${item.img}">

    <div class="descricaoItem">
      <span>${item.nome}</span>
      <span>Qtd: ${item.qtd}</span>
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

  totalCarrinhoDiv.innerHTML=`Total: ${formatarPreco(total)}`;
  atualizarContador();
}

// ======= PRODUTOS =======

// KITS
const kits={
  maternal1:{nome:"Kit Maternal I",preco:550,img:"livros/livro horizontal.jpg"},
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

// FARDAMENTOS
const fardamentos=[
  {tipo:'Camisa',img:'fardamento/camisa.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Camiseta',img:'fardamento/camiseta.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Jardineira',img:'fardamento/jardineira.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Casaco',img:'fardamento/casaco.JPG',precos:{'02-06':90,'08-12':100,'14+':130}},
  {tipo:'Calça',img:'fardamento/calça.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Short',img:'fardamento/shot.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Short-Saia',img:'fardamento/shortsaia.JPG',precos:{'02-06':70,'08-12':80,'14+':90}},
  {tipo:'Meia',img:'fardamento/camisa.JPG',precos:{'02-06':20,'08-12':30,'14+':30}}
];

// ======= CARREGAR LIVROS =======
function carregarLivros(){
  const gridLivros = document.getElementById('gridLivros');

  for(let key in kits){
    let kit=kits[key];

    let div = document.createElement('div');
    div.className='cardlivros';

    div.innerHTML=`
      <img src="${kit.img}">
      <p>${kit.nome}</p>
      <div class="precoLivro">${formatarPreco(kit.preco)}</div>
      <label>Qtd: <input type="number" value="1" min="1"></label>
      <button class="btn-add">Adicionar</button>
    `;

    div.querySelector('.btn-add').onclick=()=>{
      let qtd=parseInt(div.querySelector('input').value);

      let exist = carrinho.find(i=>i.nome===kit.nome);
      if(exist) exist.qtd += qtd;
      else carrinho.push({nome:kit.nome,preco:kit.preco,qtd,img:kit.img});

      animarAdicionar(div.querySelector('img'));
      atualizarCarrinho();
      mostrarMensagem();
    };

    gridLivros.appendChild(div);
  }
}

// ======= CARREGAR FARDAMENTOS =======
function carregarFardamentos(){
  const gridFardamentos = document.getElementById('gridFardamentos');

  fardamentos.forEach(f=>{
    let div=document.createElement('div');
    div.className='cardfardamento';

    div.innerHTML=`
      <img src="${f.img}">
      <span>${f.tipo}</span>
      <select>
        <option value="">Escolha</option>
        <option value="02-06">02-06</option>
        <option value="08-12">08-12</option>
        <option value="14+">14+</option>
      </select>
      <div class="precoFardamento"></div>
      <input type="number" value="1" min="1">
      <button class="btn-add">Adicionar</button>
    `;

    const select = div.querySelector('select');
    const precoDiv = div.querySelector('.precoFardamento');

    select.onchange=()=>{
      precoDiv.innerText = select.value ? formatarPreco(f.precos[select.value]) : '';
    };

    div.querySelector('.btn-add').onclick=()=>{
      if(!select.value) return alert('Selecione a idade');

      let qtd=parseInt(div.querySelector('input').value);
      let preco=f.precos[select.value];
      let nome=f.tipo+' ('+select.value+')';

      let exist=carrinho.find(i=>i.nome===nome);
      if(exist) exist.qtd+=qtd;
      else carrinho.push({nome,preco,qtd,img:f.img});

      animarAdicionar(div.querySelector('img'));
      atualizarCarrinho();
      mostrarMensagem();
    };

    gridFardamentos.appendChild(div);
  });
}

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

  let msg='Gostaria de adquiri esse produto:%0A';
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



function logout(){
  localStorage.clear();
  window.location.href = "login.html";
}

