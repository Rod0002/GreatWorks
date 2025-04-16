const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartContent = document.getElementById('cartContent');
const cartTotal = document.getElementById('cartTotal');

if (cartButton && cartSidebar && closeCart) {
  cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('show');
  });

  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('show');
  });
}

function atualizarStorage() {
  const itens = [];
  document.querySelectorAll('.cart-item').forEach(item => {
    const nome = item.querySelector('strong').textContent;
    const preco = item.querySelector('p').textContent.split(' - ')[1];
    itens.push({ nome, preco });
  });
  localStorage.setItem('carrinho', JSON.stringify(itens));
}

function atualizarTotal() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const precoTexto = item.querySelector('p').textContent.split(' - ')[1];
    const precoNum = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));
    total += precoNum;
  });

  if (cartTotal) {
    cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

function atualizarContador() {
  const totalItens = document.querySelectorAll('.cart-item').length;
  const contador = document.getElementById('cartCount');
  if (contador) contador.textContent = totalItens;
}

function mostrarNotificacao() {
  const notif = document.getElementById('notificacao');
  if (!notif) return;
  notif.classList.add('mostrar');
  setTimeout(() => {
    notif.classList.remove('mostrar');
  }, 2000);
}

function adicionarAoCarrinho(nome, preco) {
  const item = document.createElement('div');
  item.classList.add('cart-item');
  item.innerHTML = `
    <p><strong>${nome}</strong> - ${preco}</p>
    <button class="remover-item">Remover</button>
  `;
  cartContent.appendChild(item);

  item.querySelector('.remover-item').addEventListener('click', () => {
    item.remove();
    atualizarStorage();
    atualizarTotal();
    atualizarContador();
  });

  atualizarStorage();
  atualizarTotal();
  mostrarNotificacao();
  atualizarContador();
}

// Botões de compra com data-nome e data-preco
document.querySelectorAll('.botao-compra').forEach(botao => {
  if (botao.dataset.nome && botao.dataset.preco) {
    botao.addEventListener('click', (e) => {
      e.preventDefault();
      const nome = botao.getAttribute('data-nome');
      const preco = botao.getAttribute('data-preco');
      adicionarAoCarrinho(nome, preco);
    });
  }
});

function carregarCarrinho() {
  const itensSalvos = JSON.parse(localStorage.getItem('carrinho')) || [];
  itensSalvos.forEach(({ nome, preco }) => adicionarAoCarrinho(nome, preco));
  atualizarContador();
}

carregarCarrinho();
atualizarTotal();

// Seleção de tamanhos (caso exista)
const botoesTamanho = document.querySelectorAll('.tamanhos button');
if (botoesTamanho.length) {
  botoesTamanho.forEach(btn => {
    btn.addEventListener('click', () => {
      botoesTamanho.forEach(b => b.classList.remove('selecionado'));
      btn.classList.add('selecionado');
    });
  });
}

// Banner com troca de imagem (apenas se estiver na home)
const banner = document.querySelector('.banner.parallax');
if (banner) {
  const imagens = [
    'modelos GW/Modelo GW 2.jpg',
    'modelos GW/Modelo GW 3.jpg',
    'modelos GW/Modelo GW 4.jpg'
  ];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % imagens.length;
    banner.style.backgroundImage = `url('${imagens[index]}')`;
  }, 3000);
}
