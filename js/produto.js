const cardDetalhes = document.getElementById("cardDetalhes");
const cardCompra = document.getElementById("cardCompra");

const livro = JSON.parse(localStorage.getItem("livroSelecionado"));
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarContadorCarrinho() {
  const contador = document.getElementById("carrinho-contador");
  contador.textContent = carrinho.length;
  contador.style.display = carrinho.length > 0 ? "inline-block" : "none";
}

function mostrarDetalhes() {
  if (!livro) {
    cardDetalhes.innerHTML = "<p>Livro não encontrado.</p>";
    return;
  }

  cardDetalhes.innerHTML = `
    <img src="${livro.imagem}" alt="${livro.titulo}" style="max-width: 100%;">
    <h2>${livro.titulo}</h2>
    <p><strong>Autor:</strong> ${livro.autor}</p>
    <p><strong>Gênero:</strong> ${livro.genero}</p>
    <p><strong>Estado:</strong> ${livro.estado === 'novo' ? 'Novo 📗' : 'Usado 📘'}</p>
    <p><strong>Descrição:</strong> ${livro.descricao || "Sem descrição"}</p>
  `;

  cardCompra.innerHTML = `
    <h3>R$ ${parseFloat(livro.preco).toFixed(2)}</h3>
    <button onclick="adicionarAoCarrinho()">Adicionar ao Carrinho</button>
    <button onclick="finalizarCompra()">Comprar Agora</button>
  `;
}

function adicionarAoCarrinho() {
  if (!livro) return;

  carrinho.push(livro);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();

  const contador = document.getElementById("carrinho-contador");
  contador.classList.add("pulse");
  setTimeout(() => contador.classList.remove("pulse"), 500);

  setTimeout(() => window.location.href = "livros.html", 1000);
}

function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(livro);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = "carrinho.html";
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarDetalhes();
  atualizarContadorCarrinho();
});