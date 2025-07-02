// js/login.js

// const form = document.getElementById("login-form");
// const msg = document.getElementById("mensagem");

// // Configuração do administrador
// const adminEmail = "richard@gmail.com";
// const adminSenha = "123456";

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const email = document.getElementById("email").value.trim();
//   const senha = document.getElementById("senha").value.trim();

//   if (email === adminEmail && senha === adminSenha) {
//     window.location.href = "admin.html";
//   } else {
//     // Simplesmente redireciona para index
//     window.location.href = "index.html";
//   }
// });





const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton && signUpButton.addEventListener('click', () => {
  container && container.classList.add("right-panel-active");
});

signInButton && signInButton.addEventListener('click', () => {
  container && container.classList.remove("right-panel-active");
});

function showOverlayCard(message, callback) {
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
  overlay.style.zIndex = 9999;

  const card = document.createElement('div');
  card.style.background = '#f5f5dc';
  card.style.boxShadow = '0 4px 24px 0 #800020';
  card.style.padding = '32px 48px';
  card.style.borderRadius = '12px';
  card.style.textAlign = 'center';
  card.style.fontSize = '1.2rem';
  card.style.color = '#333';
  card.innerText = message;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // Remove overlay after 2 seconds and call callback
  setTimeout(() => {
    document.body.removeChild(overlay);
    if (typeof callback === 'function') callback();
  }, 2000);
}

const entreBtn = document.querySelector('button.botão1');
const cadastreBtn = document.querySelector('button.botao02');

if (entreBtn) {
  entreBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const senha = document.getElementById("senha")?.value.trim();

    if (email === "richard@gmail.com" && senha === "123456") {
      showOverlayCard('Entrada feita com sucesso!', function() {
        window.location.href = "index.html";
      });
    } else {
      showOverlayCard('Entrada feita com sucesso!');
    }
  });
}

if (cadastreBtn) {
  cadastreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showOverlayCard('Cadastro feito com sucesso!!');
  });
}
