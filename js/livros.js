const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

menuToggle.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    navMenu.classList.toggle('active');
  }
});

// ------------------ Importação -------------------------//
import { livros as livrosFixos } from "./data.js"; // renomeado para evitar conflito com variável abaixo

// ------------------ Elementos do DOM -------------------
const container = document.getElementById("listaLivros");
const filtro = document.getElementById("filtroCategoria");
const campoBusca = document.getElementById("busca");
const ordenarPor = document.getElementById("ordenarPor");
const filtroEstado = document.getElementById("filtroEstado");

// ------------------ Carrinho ---------------------------//
function atualizarContadorCarrinho() {
  const contador = document.getElementById("carrinho-contador");
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length > 0) {
    contador.textContent = carrinho.length;
    contador.style.display = "inline-block";
  } else {
    contador.style.display = "none";
  }
}
// ------------------ Estilos para o card ------------------//
const estiloCard = document.createElement("style");
estiloCard.textContent = `
  .livro-card {
    transition: box-shadow 0.3s ease;
  }
  .livro-card:hover {
    border: 2px solid #d4af37; /* Antique gold color */
    box-shadow: 0 0 10px #d4af37; /* Antique gold color */
  }
`;
document.head.appendChild(estiloCard); // Append the style to the document head

// ------------------ Carregar Livros ---------------------//
const livrosSalvos = JSON.parse(localStorage.getItem("livros")) || [];
const livros = [...livrosSalvos.reverse(), ...livrosFixos];
let livrosFiltrados = [...livros]; // base para filtros

// ------------------ Criação dos cards -------------------//
function criarCardLivro(livro) {
  return `
    <div class="livro-card" onclick="verDetalhes('${livro.titulo}')">
      <img src="${livro.imagem}" alt="${livro.titulo}">
      <h2>${livro.titulo}</h2>
      <p>Autor: ${livro.autor}</p>
      <p>Gênero: ${livro.genero}</p>
      <p><strong>Preço:</strong> R$ ${livro.preco.toFixed(2)}</p>
      <p><strong>Estado:</strong> ${livro.estado === 'novo' ? 'Novo 📗' : 'Usado 📘'}</p>
    </div>
  `;
}

function exibirLivros(lista) {
  if (lista.length === 0) {
    container.innerHTML = `<p style="font-size: 18px; padding: 20px;">Livro não encontrado.</p>`;
  } else {
    container.innerHTML = lista.map(criarCardLivro).join("");
  }
}

// ------------------ Filtros e busca ---------------------
function aplicarFiltros() {
  const categoria = filtro.value;
  const estado = filtroEstado.value;
  const busca = campoBusca.value.toLowerCase();
  const ordem = ordenarPor.value;

  livrosFiltrados = livros.filter(livro => {
    const combinaGenero = categoria === "todos" || livro.genero === categoria;
    const combinaEstado = estado === "todos" || livro.estado === estado;
    const combinaBusca = livro.titulo.toLowerCase().includes(busca) || livro.autor.toLowerCase().includes(busca);
    return combinaGenero && combinaEstado && combinaBusca;
  });

  // Ordenação
  if (ordem === "titulo") {
    livrosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
  } else if (ordem === "autor") {
    livrosFiltrados.sort((a, b) => a.autor.localeCompare(b.autor));
  } else if (ordem === "preco-asc") {
    livrosFiltrados.sort((a, b) => a.preco - b.preco);
  } else if (ordem === "preco-desc") {
    livrosFiltrados.sort((a, b) => b.preco - a.preco);
  }

  exibirLivros(livrosFiltrados);
}

// ------------------ Redirecionar para detalhes ----------
function verDetalhes(titulo) {
  const livroSelecionado = livros.find(livro => livro.titulo === titulo);
  localStorage.setItem("livroSelecionado", JSON.stringify(livroSelecionado));
  window.location.href = "produto.html";
}

// ------------------ Inicialização -----------------------
document.addEventListener("DOMContentLoaded", () => {
  atualizarContadorCarrinho();
  exibirLivros(livros); // agora com todos os livros carregados
});

window.verDetalhes = verDetalhes;

// ------------------ Listeners dos filtros ----------------
filtroEstado.addEventListener("change", aplicarFiltros);
filtro.addEventListener("change", aplicarFiltros);
campoBusca.addEventListener("input", aplicarFiltros);
ordenarPor.addEventListener("change", aplicarFiltros);


