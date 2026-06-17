// ==========================================
// 1. SELEÇÃO DE ELEMENTOS DO DOM
// ==========================================
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const formContato = document.getElementById('form-contato');

// ==========================================
// 2. MENU MOBILE
// ==========================================
// Abre/Fecha menu no celular
mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Fecha o menu mobile automaticamente ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('show');
  });
});

// ==========================================
// 3. ENVIO DE FORMULÁRIO (WHATSAPP)
// ==========================================
formContato.addEventListener('submit', (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById('nome').value,
    tel: document.getElementById('tel').value,
    email: document.getElementById('email').value || "Não informado",
    assunto: document.getElementById('assunto').value,
    msg: document.getElementById('msg').value || "Nenhuma mensagem adicional."
  };

  const texto = `*Novo Contato via Site*\n\n*Nome:* ${dados.nome}\n*Telefone:* ${dados.tel}\n*E-mail:* ${dados.email}\n*Assunto:* ${dados.assunto}\n*Situação:* ${dados.msg}`;

  // Monta e abre a URL do WhatsApp para o número configurado
  window.open(`https://web.whatsapp.com/send?phone=5571989525751&text=${encodeURIComponent(texto)}`, '_blank');
});