class Livro {
  constructor(titulo, autor, genero, imagem, preco, estado, descricao) {
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.imagem = imagem;
    this.preco = preco;
    this.estado = estado;
    this.descricao = descricao;
  }
}

// Função para carregar a lista
function carregarLivros() {
  const livros = JSON.parse(localStorage.getItem("livros")) || [];
  const lista = document.getElementById("listaLivrosAdmin");
  lista.innerHTML = "";

  if (livros.length === 0) {
    lista.innerHTML = "<p>Nenhum livro cadastrado.</p>";
    return;
  }

  livros.forEach((livro, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
        <img src="${livro.imagem}" alt="${livro.titulo}" style="height:80px;">
        <p><strong>${livro.titulo}</strong> - ${livro.autor}</p>
        <button data-index="${index}">Remover</button>
      </div>
    `;
    lista.appendChild(div);
  });

  document.querySelectorAll("#listaLivrosAdmin button").forEach(button => {
    button.addEventListener("click", e => {
      const index = e.target.getAttribute("data-index");
      const livros = JSON.parse(localStorage.getItem("livros")) || [];
      livros.splice(index, 1);
      localStorage.setItem("livros", JSON.stringify(livros));
      carregarLivros();
    });
  });
}

// Evento de cadastro
document.getElementById("formLivro").addEventListener("submit", function (e) {
  e.preventDefault();
  const titulo = this.titulo.value;
  const autor = this.autor.value;
  const genero = this.genero.value;
  const preco = parseFloat(this.preco.value);
  const estado = this.estado.value;
  const descricao = this.descricao.value;
  const imagemInput = document.getElementById("imagem");

  const reader = new FileReader();
  reader.onload = function () {
    const imagem = reader.result;
    const novoLivro = new Livro(titulo, autor, genero, imagem, preco, estado, descricao);
    const livros = JSON.parse(localStorage.getItem("livros")) || [];
    livros.push(novoLivro);
    localStorage.setItem("livros", JSON.stringify(livros));
    alert("Livro cadastrado com sucesso!");
    document.getElementById("formLivro").reset();
    document.getElementById("previewImagem").style.display = "none";
    carregarLivros();
  };

  if (imagemInput.files[0]) {
    reader.readAsDataURL(imagemInput.files[0]);
  } else {
    alert("Selecione uma imagem.");
  }
});

// Preview da imagem
document.getElementById("imagem").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const preview = document.getElementById("previewImagem");
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Carrega os livros salvos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarLivros);