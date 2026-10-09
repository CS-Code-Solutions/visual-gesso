import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Referências do DOM
const loginForm = document.getElementById('login-form');
const adminPanel = document.getElementById('admin-panel');
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');

// Monitorização do Estado de Autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Utilizador logado: oculta formulário, mostra painel
        loginForm.style.display = 'none';
        adminPanel.style.display = 'block';
    } else {
        // Utilizador não logado: mostra formulário, oculta painel
        loginForm.style.display = 'block';
        adminPanel.style.display = 'none';
    }
});

// Função de Login
btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Acesso autorizado.");
    } catch (error) {
        alert("Erro na autenticação: " + error.message);
    }
});

// Função de Logout
btnLogout.addEventListener('click', () => {
    signOut(auth);
});
