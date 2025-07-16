

const firebaseConfig = {
  apiKey: "AIzaSyCN9aRnLqIwhsWg_LGjvvNlkXHVudxZBhY",
  authDomain: "iniccs17.firebaseapp.com",
  projectId: "iniccs17",
  storageBucket: "iniccs17.appspot.com",
  messagingSenderId: "341022346967",
  appId: "1:341022346967:web:2925f89ee06bc2cf032a9",
  measurementId: "G-D9GZXNZMFH"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

customElements.define('login-box', class extends HTMLElement {
  connectedCallback() {
    auth.signOut();
    // Agrega clase al body para aplicar estilos de login
    document.body.classList.add('login-page');

    this.innerHTML = `
      <header-gob></header-gob>
      <main class="login-main">
          <div class="background-image"></div>
          <section class="login-wrapper">
          <h2 class="login-title">Inicia sesión</h2>
          <form id="login-form" class="login-form">
              <label for="email">Correo electrónico</label>
              <input type="email" id="email" name="email" placeholder="ejemplo@mail.com" required />

              <label for="password">Contraseña</label>
              <input type="password" id="password" name="password" placeholder="********" required />

              <p id="login-error" style="color:red;"></p>
              <button type="submit">Ingresar</button>
          </form>
          </section>
      </main>
      <footer-gob></footer-gob>
    `;

    const form = this.querySelector("#login-form");
    const errorText = this.querySelector("#login-error");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = this.querySelector("#email").value;
      const password = this.querySelector("#password").value;

      try {
        await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        await auth.signInWithEmailAndPassword(email, password);
        errorText.textContent = '';
      } catch (error) {
        errorText.textContent = 'Credenciales incorrectas o usuario no registrado.';
        console.error(error);
      }
    });

    auth.onAuthStateChanged((user) => {
      const loginContainer = document.getElementById('login-container');
      const appSection = document.getElementById('app');
      if (user) {
        document.body.classList.remove('login-page');
        loginContainer.style.display = 'none';
        appSection.style.display = 'block';
        if (window.map) window.map.resize();
      } else {
        document.body.classList.add('login-page');
        loginContainer.style.display = 'block';
        appSection.style.display = 'none';
      }
    });
  }
});
