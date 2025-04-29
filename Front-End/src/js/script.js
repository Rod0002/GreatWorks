// Abertura e fechamento do carrinho
const cartButton      = document.getElementById('cartButton');
const cartSidebar     = document.getElementById('cartSidebar');
const closeCart       = document.getElementById('closeCart');
const checkoutButton  = document.getElementById('checkoutButton'); // "Fechar Pedido"
const cartContent     = document.getElementById('cartContent');
const cartTotal       = document.getElementById('cartTotal');
const cartCount       = document.getElementById('cartCount');

// Função para obter itens atuais do DOM/cartStorage
function getItemsFromCart() {
  // Se quiser salvar no localStorage, pode usar JSON.parse(localStorage.getItem('carrinho')) || []
  const itens = [];
  document.querySelectorAll('.cart-item').forEach(item => {
    const nome  = item.querySelector('strong').textContent;
    const preco = item.querySelector('p').textContent.split(' - ')[1];
    itens.push({ nome, preco });
  });
  return itens;
}

// Abre/fecha o sidebar do carrinho
if (cartButton && cartSidebar && closeCart) {
  cartButton.addEventListener('click',  () => cartSidebar.classList.add('show'));
  closeCart.addEventListener('click',  () => cartSidebar.classList.remove('show'));
}

// Ação do botão "Fechar Pedido"
if (checkoutButton) {
  checkoutButton.addEventListener('click', () => {
    const itens = getItemsFromCart();
    if (itens.length === 0) {
      alert('O carrinho está vazio. Adicione itens para prosseguir com o pedido.');
      return;
    }
    // Exemplo simples: redireciona para página de checkout
    window.location.href = 'checkout.html';
    // Ou se quiser chamar a API:
    /*
    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: itens }),
    })
    .then(res => res.json())
    .then(data => {
      window.location.href = data.checkoutUrl;
    })
    .catch(err => console.error('Erro no checkout:', err));
    */
  });
}

// Atualiza o localStorage com os itens do carrinho
function atualizarStorage() {
  const itens = getItemsFromCart();
  localStorage.setItem('carrinho', JSON.stringify(itens));
}

// Recalcula e exibe o total do carrinho
function atualizarTotal() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const precoTexto = item.querySelector('p').textContent.split(' - ')[1];
    const precoNum   = parseFloat(precoTexto.replace('R$', '').replace(',', '.'));
    if (!isNaN(precoNum)) total += precoNum;
  });
  if (cartTotal) {
    cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

// Atualiza o contador de itens exibido no ícone
function atualizarContador() {
  if (cartCount) {
    const totalItens = document.querySelectorAll('.cart-item').length;
    cartCount.textContent = totalItens;
  }
}

// Exibe notificação de item adicionado
function mostrarNotificacao() {
  const notif = document.getElementById('notificacao');
  if (!notif) return;
  notif.classList.add('mostrar');
  setTimeout(() => notif.classList.remove('mostrar'), 2000);
}

// Adiciona um item ao carrinho (DOM + eventos)
function adicionarAoCarrinho(nome, preco) {
  const item = document.createElement('div');
  item.classList.add('cart-item');
  item.innerHTML = `
    <p><strong>${nome}</strong> - ${preco}</p>
    <button class="remover-item">Remover</button>
  `;
  cartContent.appendChild(item);

  // Evento de remoção
  item.querySelector('.remover-item').addEventListener('click', () => {
    item.remove();
    atualizarStorage();
    atualizarTotal();
    atualizarContador();
  });

  // Atualiza tudo após adicionar
  atualizarStorage();
  atualizarTotal();
  atualizarContador();
  mostrarNotificacao();
}

// Liga os botões "Comprar" para adicionar ao carrinho
document.querySelectorAll('.botao-compra').forEach(botao => {
  const nome  = botao.dataset.nome;
  const preco = botao.dataset.preco;
  if (nome && preco) {
    botao.addEventListener('click', e => {
      e.preventDefault();
      adicionarAoCarrinho(nome, preco);
    });
  }
});

// Carrega itens salvos no localStorage ao iniciar
function carregarCarrinho() {
  const itensSalvos = JSON.parse(localStorage.getItem('carrinho')) || [];
  itensSalvos.forEach(({ nome, preco }) => adicionarAoCarrinho(nome, preco));
}

// Inicialização
carregarCarrinho();
atualizarTotal();
atualizarContador();
