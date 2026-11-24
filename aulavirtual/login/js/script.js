(() => {
  const password = document.getElementById("clave");
  const toggle = document.getElementById("toggle-password");
  const form = document.getElementById("login-form");
  const feedback = document.getElementById("login-feedback");
  const submit = form.querySelector('[type="submit"]');

  toggle.addEventListener("click", () => {
    const show = password.type === "password";
    password.type = show ? "text" : "password";
    toggle.textContent = show ? "Ocultar" : "Mostrar";
    toggle.setAttribute("aria-pressed", String(show));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const code = document.getElementById("codigo").value.trim().toLowerCase();
    const enteredPassword = password.value;
    feedback.textContent = "";
    submit.disabled = true;
    submit.textContent = "Ingresando…";
    const hardcodedAccounts = [
      { id: 1, code: "2025024891", password: "SiscadDemo2026!", role: "estudiante" },
      { id: 2, code: "9000000001", password: "SiscadDemo2026!", role: "docente" },
      { id: 3, code: "9000000002", password: "SiscadDemo2026!", role: "admin" }
    ];
    let passwordOverrides = {};
    try {
      passwordOverrides = JSON.parse(localStorage.getItem("siscad.passwords.v1") || "{}");
    } catch (_) {}
    const account = hardcodedAccounts.find((item) => {
      const expectedPassword = passwordOverrides[item.code] || item.password;
      return item.code === code && expectedPassword === enteredPassword;
    });

    if (!account) {
      submit.disabled = false;
      submit.textContent = "Ingresar";
      feedback.textContent = "Código o contraseña incorrectos.";
      return;
    }

    sessionStorage.setItem("fiei-tic-session", String(account.id));
    const destinations = {
      admin: "../administracion/index.html",
      docente: "../docente/index.html",
      estudiante: "../dashboard/index.html"
    };
    window.location.href = destinations[account.role];
  });
})();
