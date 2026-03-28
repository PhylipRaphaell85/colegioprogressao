
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

// ======= ABAS =======


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

//==================================================================================













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



function logout(){
  localStorage.clear();
  window.location.href = "login.html";
}

