  const carrinhoContainer = document.getElementById("carrinhoContainer");
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function exibirCarrinho() {
  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  carrinhoContainer.innerHTML = carrinho.map((livro, index) => `
    <div class="livro-card">
      <img src="${livro.imagem}" alt="${livro.titulo}" onclick="verDetalhes('${livro.titulo}')">
      <h2>${livro.titulo}</h2>
      <p>Autor: ${livro.autor}</p>
      <p>Gênero: ${livro.genero}</p>
      <p>Preço: R$ ${livro.preco.toFixed(2)}</p>
      <button onclick="removerItem(${index})">🗑️ Remover</button>
    </div>
  `).join("");
}

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho();
  atualizarContadorCarrinho();
  atualizarTotal();
}

function esvaziarCarrinho() {
  localStorage.removeItem("carrinho");
  carrinho = [];
  exibirCarrinho();
  atualizarContadorCarrinho();
  atualizarTotal();
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  alert("Compra finalizada com sucesso! Obrigado por comprar conosco.");
  esvaziarCarrinho();
}


function limparCarrinho() {
  localStorage.removeItem("carrinho");
  exibirCarrinho();
}

function atualizarTotal() {
  const total = carrinho.reduce((soma, livro) => soma + livro.preco, 0);
  const totalValor = document.getElementById("totalValor");
  if (totalValor) {
    totalValor.textContent = `Total: R$ ${total.toFixed(2)}`;
  }
}

function exibirCarrinho() {
  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    atualizarTotal();
    return;
  }

  carrinhoContainer.innerHTML = carrinho.map((livro, index) => `
    <div class="livro-card">
      <img src="${livro.imagem}" alt="${livro.titulo}" onclick="verDetalhes('${livro.titulo}')">
      <h2>${livro.titulo}</h2>
      <p>Autor: ${livro.autor}</p>
      <p>Gênero: ${livro.genero}</p>
      <p>Preço: R$ ${livro.preco.toFixed(2)}</p>
      <button onclick="removerItem(${index})">🗑️ Remover</button>
    </div>
  `).join("");

  atualizarTotal();
}

exibirCarrinho();

// -----------------------------------funçaõ para o formulário de compra-----------------------------------//
function finalizarCompra() {
  const modal = document.getElementById("modalFinalizar");
  modal.style.display = "flex";
}

function fecharModal() {
  const modal = document.getElementById("modalFinalizar");
  modal.style.display = "none";
}

// Submissão do formulário
document.getElementById("formFinalizar").addEventListener("submit", function(e) {
  e.preventDefault();

  const nomeInput = this.querySelector("input[type='text']");
  const emailInput = this.querySelector("input[type='email']");
  const enderecoInput = this.querySelectorAll("input[type='text']")[1];

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const endereco = enderecoInput.value.trim();

  // Validação obrigatória
  if (!nome || !email || !endereco) {
    alert("Por favor, preencha todos os campos antes de confirmar o pedido.");
    if (!nome) nomeInput.focus();
    else if (!email) emailInput.focus();
    else enderecoInput.focus();
    return;
  }

  // Remove o formulário da tela
  document.getElementById("formFinalizar").remove();

  // Fecha o modal de compra
  fecharModal();

  // Exibe o comprovante de compra (nota fiscal)
  gerarNotaFiscal(nome, email, endereco);
  esvaziarCarrinho();

  // Redirecionar para home se quiser:
  // window.location.href = "index.html";
});

// Adicione este CSS para estilizar o formulário conforme solicitado
const style = document.createElement('style');
style.innerHTML = `
#modalFinalizar .modal-content {
  background: #d2b48c; /* marrom claro */
  padding: 32px 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
#formFinalizar label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #4b2e13;
  text-align: left;
}
#formFinalizar input[type="text"],
#formFinalizar input[type="email"] {
  display: block;
  width: 100%;
  margin-bottom: 18px;
  padding: 10px 12px;
  border: 1px solid #bfa77a;
  border-radius: 6px;
  background: #f8f8f5; /* off-white */
  color: #4b2e13;
  font-size: 1rem;
  box-sizing: border-box;
}
#formFinalizar button[type="submit"] {
  background: #8b5c2a;
  color: #fff;
  border: none;
  padding: 10px 0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 8px;
}
#formFinalizar button[type="submit"]:hover {
  background: #a67c52;
}
`;
document.head.appendChild(style);

// ----------------------------------------------função para nota fiscal-----------------------------------//
function gerarNotaFiscal(nome, email, endereco) {
  const dataCompra = new Date().toLocaleDateString("pt-BR");
  const entrega = new Date();
  entrega.setDate(entrega.getDate() + 5); // estimativa: 5 dias úteis
  const dataEntrega = entrega.toLocaleDateString("pt-BR");

  const total = carrinho.reduce((soma, livro) => soma + livro.preco, 0).toFixed(2);

  const livrosHTML = carrinho.map(livro => `
    <li>${livro.titulo} - R$ ${livro.preco.toFixed(2)}</li>
  `).join("");

  const nota = `
    <div class="nota-fiscal-card">
      <h2>Nota Fiscal - Livreiro do Carrão</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Endereço:</strong> ${endereco}</p>
      <p><strong>Data da compra:</strong> ${dataCompra}</p>
      <ul>${livrosHTML}</ul>
      <p><strong>Total:</strong> R$ ${total}</p>
      <p><strong>Previsão de entrega:</strong> até ${dataEntrega}</p>
      <button onclick="fecharNotaFiscal()">Fechar</button>
    </div>
  `;

  document.getElementById("notaFiscal").innerHTML = nota;
  document.getElementById("notaFiscalContainer").style.display = "flex";
}

// Adiciona o CSS para estilizar o card da nota fiscal
const notaFiscalStyle = document.createElement('style');
notaFiscalStyle.innerHTML = `
.nota-fiscal-card {
  background: #f5e9da; /* bege claro */
  color: #4b2e13;
  font-family: "Cormorant Garamond", serif;
  box-shadow: 0 4px 24px 0 rgba(128, 0, 32, 0.25); /* vinho */
  border-radius: 14px;
  padding: 32px 28px;
  max-width: 420px;
  margin: auto;
  text-align: left;
}
.nota-fiscal-card h2 {
  color: #800020; /* vinho */
  margin-bottom: 18px;
  font-family: "Cormorant Garamond", serif;
}
.nota-fiscal-card button {
  background: #800020;
  color: #fff;
  border: none;
  padding: 10px 0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 18px;
  width: 100%;
  font-family: "Cormorant Garamond", serif;
}
.nota-fiscal-card button:hover {
  background: #a0524d;
}
.nota-fiscal-card ul {
  margin: 12px 0 18px 0;
  padding-left: 18px;
}
.nota-fiscal-card p, .nota-fiscal-card li {
  font-size: 1.1rem;
  font-family: "Cormorant Garamond", serif;
}
`;
document.head.appendChild(notaFiscalStyle);

// -------------------------------------função nota fiscal-----------------------------------------//

function fecharNotaFiscal() {
  document.getElementById("notaFiscalContainer").style.display = "none";
}
