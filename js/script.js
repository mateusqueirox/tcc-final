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

// ---------------------------------------carrossel---------------------------------------------//

// Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper"),
  carousel = document.querySelector(".carousel"),
  images = document.querySelectorAll("img"),
  buttons = document.querySelectorAll(".button");
let imageIndex = 1,
  intervalId;
// Define function to start automatic image slider
const autoSlide = () => {
  // Start the slideshow by calling slideImage() every 2 seconds
  intervalId = setInterval(() => slideImage(++imageIndex), 2000);
};
// Call autoSlide function on page load
autoSlide();
// A function that updates the carousel display to show the specified image
const slideImage = () => {
  // Calculate the updated image index
  imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  // Update the carousel display to show the specified image
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};
// A function that updates the carousel display to show the next or previous image
const updateClick = (e) => {
  // Stop the automatic slideshow
  clearInterval(intervalId);
  // Calculate the updated image index based on the button clicked
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
  // Restart the automatic slideshow
  autoSlide();
};
// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));
// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
// Add mouseleave event listener to wrapper element to start auto sliding again
wrapper.addEventListener("mouseleave", autoSlide);


// ---------------------------------------card em cima da tela---------------------------------------------// 



// Seleciona todas as divs de livros (agora usando .col-4)
const bookCols = document.querySelectorAll('.col-4');

// Cria o overlay e o card (apenas uma vez)
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.background = 'rgba(0,0,0,0.6)';
overlay.style.display = 'flex';
overlay.style.alignItems = 'center';
overlay.style.justifyContent = 'center';
overlay.style.zIndex = 1000;
overlay.style.visibility = 'hidden';

const card = document.createElement('div');
card.style.background = '#8B4513'; // cor de fundo alterada
card.style.borderRadius = '10px';
card.style.boxShadow = '0 2px 16px rgba(0,0,0,0.3)';
card.style.padding = '32px 24px';
card.style.maxWidth = '400px';
card.style.width = '90vw';
card.style.position = 'relative';
card.style.display = 'flex';
card.style.flexDirection = 'column';
card.style.alignItems = 'center';

// Botão de fechar
const closeBtn = document.createElement('span');
closeBtn.textContent = '×';
closeBtn.style.position = 'absolute';
closeBtn.style.top = '12px';
closeBtn.style.right = '18px';
closeBtn.style.fontSize = '2rem';
closeBtn.style.cursor = 'pointer';
closeBtn.style.userSelect = 'none';
closeBtn.style.color = '#fff';

closeBtn.addEventListener('click', () => {
  overlay.style.visibility = 'hidden';
});

// Ícone de carrinho (SVG)
const cartBtn = document.createElement('span');
cartBtn.innerHTML = `
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="display:block" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 20c.828 0 1.5.672 1.5 1.5S7.828 23 7 23s-1.5-.672-1.5-1.5S6.172 20 7 20zm10 0c.828 0 1.5.672 1.5 1.5S17.828 23 17 23s-1.5-.672-1.5-1.5S16.172 20 17 20zm-9.83-3l.94-2h8.72l.94 2H7.17zM6.16 15l-1.1-2.32A1 1 0 0 1 6 11h12a1 1 0 0 1 .94 1.68L17.84 15H6.16zM6 7V5a3 3 0 0 1 6 0v2h2V5a5 5 0 0 0-10 0v2h2zm2 0V5a1 1 0 0 1 2 0v2H8z" fill="#fff"/>
  </svg>
`;
cartBtn.style.position = 'absolute';
cartBtn.style.top = '12px';
cartBtn.style.right = '48px';
cartBtn.style.cursor = 'pointer';
cartBtn.title = 'Adicionar ao carrinho';

// Função para adicionar ao carrinho (localStorage)
function addToCart(bookData) {
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {}
  cart.push(bookData);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Evento do carrinho: transfere o card para carrinho.html
cartBtn.addEventListener('click', () => {
  if (!cartBtn.bookData) return;

  // Salva o HTML do card (sem cor de fundo) no localStorage
  const cardClone = card.cloneNode(true);

  // Remove o background do card clonado
  cardClone.style.background = 'none';

  // Remove botões do card clonado (fechar e carrinho)
  const close = cardClone.querySelector('span');
  if (close) close.remove();
  const cartIcon = cardClone.querySelector('span');
  if (cartIcon) cartIcon.remove();

  // Salva o HTML do card clonado
  localStorage.setItem('cartCardHtml', cardClone.outerHTML);

  // Também salva os dados do livro no carrinho (opcional)
  addToCart(cartBtn.bookData);

  // Redireciona para carrinho.html
  window.location.href = 'carrinho.html';
});

overlay.appendChild(card);
card.appendChild(closeBtn);
card.appendChild(cartBtn);
document.body.appendChild(overlay);

// Função para preencher e mostrar o card
function showBookCard(bookDiv) {
  // Pega informações do livro da div .col-4
  const img = bookDiv.querySelector('img');
  const title = bookDiv.querySelector('.book-title')?.textContent || 'Título não informado';
  const author = bookDiv.querySelector('.book-author')?.textContent || 'Autor desconhecido';
  const genre = bookDiv.querySelector('.book-genre')?.textContent || 'Gênero não informado';
  const price = bookDiv.querySelector('.book-price')?.textContent || 'Preço não informado';
  const condition = bookDiv.querySelector('.book-condition')?.textContent || 'Condição não informada';
  const synopsis = bookDiv.querySelector('.book-synopsis')?.textContent || 'Sinopse não disponível';
  const imgSrc = img?.getAttribute('src') || '';

  // Limpa o card (exceto o botão de fechar e carrinho)
  while (card.children.length > 2) card.removeChild(card.lastChild);

  // Adiciona a imagem do livro, se existir
  if (img) {
    const imgClone = img.cloneNode(true);
    imgClone.style.maxWidth = '180px';
    imgClone.style.maxHeight = '240px';
    imgClone.style.marginBottom = '16px';
    card.appendChild(imgClone);
  }

  // Adiciona informações
  const infoHtml = `
    <h2 style="margin: 0 0 8px 0; font-size: 1.3rem; color: #fff;">${title}</h2>
    <p style="margin: 0 0 4px 0; color: #fff;"><strong>Autor:</strong> ${author}</p>
    <p style="margin: 0 0 4px 0; color: #fff;"><strong>Gênero:</strong> ${genre}</p>
    <p style="margin: 0 0 4px 0; color: #fff;"><strong>Preço:</strong> ${price}</p>
    <p style="margin: 0 0 4px 0; color: #fff;"><strong>Condição:</strong> ${condition}</p>
    <p style="margin: 12px 0 0 0; color: #fff;"><strong>Sinopse:</strong> ${synopsis}</p>
  `;
  const infoDiv = document.createElement('div');
  infoDiv.innerHTML = infoHtml;
  card.appendChild(infoDiv);

  // Prepara os dados do livro para o carrinho
  cartBtn.bookData = {
    title,
    author,
    genre,
    price,
    condition,
    synopsis,
    imgSrc
  };

  overlay.style.visibility = 'visible';
}

// Adiciona evento de clique para cada livro (.col-4)
bookCols.forEach(col => {
  col.addEventListener('click', (e) => {
    // Evita abrir o card se clicar em um botão/link dentro do livro
    if (['A', 'BUTTON'].includes(e.target.tagName)) return;
    showBookCard(col);
  });
});

// Fecha o card ao clicar fora dele
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.style.visibility = 'hidden';
});
