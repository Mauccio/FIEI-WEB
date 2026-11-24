(() => {
  const page = document.body.dataset.page;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  async function request(url, options = {}) {
    const response = await fetch(url, { credentials: "same-origin", ...options });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "No se pudo completar la operación.");
    return result;
  }

  const feedback = (message, kind = "") => {
    const element = document.querySelector("[data-feedback]");
    if (!element) return;
    element.className = `admin-feedback ${kind}`.trim();
    element.textContent = message;
  };

  function setupShell(user) {
    document.querySelector(".sidebar-welcome").textContent = `Bienvenido, ${user.fullName}`;
    document.querySelectorAll(".side-nav a[data-page]").forEach((link) => {
      if (link.dataset.page === page) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
    document.querySelector(".sidebar-exit").addEventListener("click", async (event) => {
      event.preventDefault();
      const loginUrl = event.currentTarget.href;
      try { await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }); }
      finally { window.location.assign(loginUrl); }
    });
    const toggle = document.querySelector(".sidebar-toggle");
    toggle.addEventListener("click", () => {
      const collapsed = document.querySelector(".app-shell").classList.toggle("sidebar-collapsed");
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.setAttribute("aria-label", collapsed ? "Desplegar menú" : "Contraer menú");
      toggle.title = collapsed ? "Desplegar menú" : "Contraer menú";
    });
  }

  async function initHome() {
    const [coursesResult, teachersResult] = await Promise.all([
      request("/api/courses"), request("/api/users?role=docente")
    ]);
    const courses = coursesResult.courses;
    document.querySelector("[data-total-courses]").textContent = String(courses.length);
    document.querySelector("[data-assigned-courses]").textContent = String(courses.filter((course) => course.teacherId).length);
    document.querySelector("[data-total-teachers]").textContent = String(teachersResult.users.length);
  }

  async function initCourses() {
    const form = document.getElementById("course-form");
    const list = document.getElementById("courses-list");
    const teacherSelect = form.elements.teacherId;
    const submit = form.querySelector('[type="submit"]');
    const cancel = document.querySelector("[data-course-cancel]");
    const cycleFilter = document.querySelector("[data-cycle-filter]");
    const enrollmentDialog = document.getElementById("enrollment-dialog");
    const enrollmentForm = document.getElementById("enrollment-form");
    const enrollmentRoster = document.querySelector("[data-enrollment-roster]");
    let selectedCourse = null;
    let courses = [];

    const cycleName = (cycle) => ({ 1: "1.er ciclo", 2: "2.º ciclo", 3: "3.er ciclo", 4: "4.º ciclo", 5: "5.º ciclo", 6: "6.º ciclo", 7: "7.º ciclo", 8: "8.º ciclo", 9: "9.º ciclo", 10: "10.º ciclo" })[cycle] || "Sin definir";

    function renderCourses() {
      const visible = cycleFilter.value === "all" ? courses : courses.filter((course) => String(course.cycle || "") === cycleFilter.value);
      list.innerHTML = visible.length ? visible.map((course) => `<tr>
        <th scope="row"><strong>${esc(course.name)}</strong><span class="subtle">${esc(course.code)}</span></th>
        <td>${esc(cycleName(course.cycle))}</td><td>${esc(course.term)}</td><td>${esc(course.section)}</td>
        <td>${course.teacherName ? esc(course.teacherName) : '<span class="unassigned">Sin asignar</span>'}</td>
        <td>${Number(course.studentCount || 0)}</td>
        <td class="actions-cell"><button type="button" class="small-action" data-course-enroll="${course.id}">Matrícula</button><button type="button" class="small-action" data-course-edit="${course.id}">Editar</button><button type="button" class="small-action danger-action" data-course-delete="${course.id}">Eliminar</button></td></tr>`).join("")
        : '<tr><td colspan="7" class="empty-state">No hay secciones para este ciclo.</td></tr>';
    }

    async function load() {
      const [coursesResult, teacherResult] = await Promise.all([request("/api/courses"), request("/api/users?role=docente")]);
      courses = coursesResult.courses;
      teacherSelect.innerHTML = '<option value="">Selecciona un docente</option>' + teacherResult.users.map((teacher) =>
        `<option value="${teacher.id}">${esc(teacher.fullName)} · ${esc(teacher.code)}</option>`).join("");
      document.querySelector("[data-course-total]").textContent = String(courses.length);
      renderCourses();
    }

    async function loadRoster(courseId) {
      enrollmentRoster.innerHTML = '<tr><td colspan="2" class="empty-state">Cargando lista…</td></tr>';
      const { students } = await request(`/api/courses/${courseId}/students`);
      enrollmentRoster.innerHTML = students.length ? students.map((student) => `<tr><td>${esc(student.code)}</td><td>${esc(student.fullName)}</td></tr>`).join("") : '<tr><td colspan="2" class="empty-state">Aún no hay estudiantes matriculados.</td></tr>';
    }

    function parseCodes(value) {
      return [...new Set(String(value).split(/[\s,;]+/).map((code) => code.trim()).filter(Boolean))];
    }

    list.addEventListener("click", async (event) => {
      const enroll = event.target.closest("[data-course-enroll]");
      if (!enroll) return;
      selectedCourse = courses.find((item) => item.id === Number(enroll.dataset.courseEnroll));
      if (!selectedCourse) return;
      enrollmentForm.reset();
      document.querySelector("[data-enrollment-course]").textContent = `${selectedCourse.name} · ${selectedCourse.code} · ${cycleName(selectedCourse.cycle)} · Sección ${selectedCourse.section} · ${selectedCourse.term}`;
      document.querySelector("[data-enrollment-feedback]").textContent = "";
      enrollmentDialog.showModal();
      try { await loadRoster(selectedCourse.id); }
      catch (error) { enrollmentRoster.innerHTML = `<tr><td colspan="2" class="empty-state">${esc(error.message)}</td></tr>`; }
    });
    cycleFilter.addEventListener("change", renderCourses);

    document.querySelector("[data-enrollment-file]").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const content = (await file.text()).replace(/^\uFEFF/, "");
        const firstLine = content.split(/\r?\n/, 1)[0] || "";
        const delimiter = [",", ";", "\t"].sort((a, b) => firstLine.split(b).length - firstLine.split(a).length)[0];
        const codes = content.split(/\r?\n/).map((line) => (line.split(delimiter)[0] || "").replace(/^\s*"|"\s*$/g, "").trim()).filter((cell) => /^\d{6,20}$/.test(cell));
        enrollmentForm.elements.codes.value = [...new Set([...parseCodes(enrollmentForm.elements.codes.value), ...codes])].join("\n");
        document.querySelector("[data-enrollment-feedback]").textContent = `Se cargaron ${codes.length} códigos del archivo.`;
      } catch { document.querySelector("[data-enrollment-feedback]").textContent = "No se pudo leer el archivo. Usa un CSV con el código del estudiante en la primera columna."; }
    });

    enrollmentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!selectedCourse) return;
      const codes = parseCodes(enrollmentForm.elements.codes.value);
      const message = document.querySelector("[data-enrollment-feedback]");
      if (!codes.length) { message.textContent = "Escribe un código o carga un archivo CSV."; return; }
      if (codes.some((code) => !/^\d{6,20}$/.test(code))) { message.textContent = "Revisa la lista: cada estudiante debe tener un código numérico válido."; return; }
      const button = enrollmentForm.querySelector('[type="submit"]');
      button.disabled = true;
      try {
        const result = await request(`/api/courses/${selectedCourse.id}/enrollments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ codes }) });
        const unknown = result.notFound?.length ? ` No encontrados: ${result.notFound.join(", ")}.` : "";
        const conflicts = result.conflicts?.length ? ` Ya matriculados en otra sección (${result.conflicts.map((item) => `${item.code}: ${item.section}`).join(", ")}).` : "";
        message.textContent = `Agregados: ${result.added}. Ya estaban matriculados: ${result.alreadyEnrolled}.${unknown}${conflicts}`;
        message.className = `admin-feedback ${result.notFound?.length || result.conflicts?.length ? "error" : "success"}`;
        await loadRoster(selectedCourse.id);
        await load();
      } catch (error) { message.textContent = error.message; message.className = "admin-feedback error"; }
      finally { button.disabled = false; }
    });
    enrollmentDialog.querySelectorAll("[data-enrollment-close]").forEach((button) => button.addEventListener("click", () => enrollmentDialog.close()));

    function reset() {
      form.reset();
      form.elements.id.value = "";
      form.elements.term.value = "2026-II";
      submit.textContent = "Registrar sección";
      cancel.hidden = true;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form));
      const id = data.id;
      delete data.id;
      data.teacherId = Number(data.teacherId);
      submit.disabled = true;
      feedback(id ? "Guardando cambios…" : "Guardando sección…");
      try {
        const result = await request(id ? `/api/courses/${id}` : "/api/courses", {
          method: id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        });
        reset();
        feedback(id ? "Curso actualizado." : result.reactivated ? "Sección reactivada con sus datos actualizados." : "Sección registrada y docente asignado.", "success");
        await load();
      } catch (error) { feedback(error.message, "error"); }
      finally { submit.disabled = false; }
    });
    cancel.addEventListener("click", reset);
    list.addEventListener("click", async (event) => {
      const edit = event.target.closest("[data-course-edit]");
      const remove = event.target.closest("[data-course-delete]");
      if (edit) {
        const course = courses.find((item) => item.id === Number(edit.dataset.courseEdit));
        if (!course) return;
        form.elements.id.value = course.id;
        form.elements.code.value = course.code;
        form.elements.name.value = course.name;
        form.elements.cycle.value = course.cycle || "";
        form.elements.term.value = course.term;
        form.elements.section.value = course.section;
        form.elements.teacherId.value = course.teacherId || "";
        submit.textContent = "Guardar cambios";
        cancel.hidden = false;
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (remove) {
        const course = courses.find((item) => item.id === Number(remove.dataset.courseDelete));
        if (!course || !window.confirm(`¿Desactivar ${course.name}, sección ${course.section}, periodo ${course.term}? Se conservará el historial.`)) return;
        try {
          await request(`/api/courses/${course.id}`, { method: "DELETE" });
          reset();
          feedback("Curso desactivado; su historial se conserva.", "success");
          await load();
        } catch (error) { feedback(error.message, "error"); }
      }
    });
    await load();
  }

  async function initAccounts() {
    const teacherForm = document.getElementById("teacher-form");
    const studentForm = document.getElementById("student-form");
    const accountForm = document.getElementById("account-edit-form");
    const dialog = document.getElementById("account-dialog");
    let teachers = [];
    let students = [];

    async function load() {
      const [teacherResult, studentResult] = await Promise.all([request("/api/users?role=docente"), request("/api/users?role=estudiante")]);
      teachers = teacherResult.users;
      students = studentResult.users;
      const rows = (accounts) => accounts.length ? accounts.map((account) => `<tr><td>${esc(account.code)}</td><td>${esc(account.fullName)}</td><td class="actions-cell"><button type="button" class="small-action" data-account-edit="${account.id}" data-role="${account.role}">Editar</button><button type="button" class="small-action danger-action" data-account-delete="${account.id}" data-role="${account.role}">Eliminar</button></td></tr>`).join("") : '<tr><td colspan="3" class="empty-state">No hay cuentas activas.</td></tr>';
      document.getElementById("teachers-list").innerHTML = rows(teachers);
      document.getElementById("students-list").innerHTML = rows(students);
      document.querySelector("[data-teacher-total]").textContent = String(teachers.length);
      document.querySelector("[data-student-total]").textContent = String(students.length);
    }

    async function createAccount(form, role) {
      if (!form.reportValidity()) return;
      const button = form.querySelector('[type="submit"]');
      button.disabled = true;
      feedback(`Guardando cuenta de ${role === "docente" ? "docente" : "estudiante"}…`);
      try {
        const data = Object.fromEntries(new FormData(form));
        data.role = role;
        const result = await request("/api/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        form.reset();
        feedback(result.reactivated ? "Cuenta reactivada y datos actualizados." : "Cuenta creada.", "success");
        await load();
      } catch (error) { feedback(error.message, "error"); }
      finally { button.disabled = false; }
    }

    teacherForm.addEventListener("submit", (event) => { event.preventDefault(); createAccount(teacherForm, "docente"); });
    studentForm.addEventListener("submit", (event) => { event.preventDefault(); createAccount(studentForm, "estudiante"); });
    document.getElementById("accounts-lists").addEventListener("click", async (event) => {
      const edit = event.target.closest("[data-account-edit]");
      const remove = event.target.closest("[data-account-delete]");
      if (edit) {
        const role = edit.dataset.role;
        const account = (role === "docente" ? teachers : students).find((item) => item.id === Number(edit.dataset.accountEdit));
        if (!account) return;
        accountForm.elements.id.value = account.id;
        accountForm.elements.role.value = account.role;
        accountForm.elements.code.value = account.code;
        accountForm.elements.fullName.value = account.fullName;
        accountForm.elements.password.value = "";
        dialog.showModal();
      } else if (remove) {
        const role = remove.dataset.role;
        const account = (role === "docente" ? teachers : students).find((item) => item.id === Number(remove.dataset.accountDelete));
        if (!account || !window.confirm(`¿Desactivar la cuenta de ${account.fullName}? Se conservarán sus registros académicos.`)) return;
        try {
          await request(`/api/users/${account.id}`, { method: "DELETE" });
          feedback(`${role === "docente" ? "Docente" : "Estudiante"} desactivado; se conservó su historial.`, "success");
          await load();
        } catch (error) { feedback(error.message, "error"); }
      }
    });
    accountForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!accountForm.reportValidity()) return;
      const data = Object.fromEntries(new FormData(accountForm));
      const id = data.id;
      delete data.id;
      delete data.role;
      const button = accountForm.querySelector('[type="submit"]');
      button.disabled = true;
      try {
        await request(`/api/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        dialog.close();
        feedback("Cuenta actualizada.", "success");
        await load();
      } catch (error) { feedback(error.message, "error"); }
      finally { button.disabled = false; }
    });
    dialog.querySelectorAll("[data-dialog-close]").forEach((button) => button.addEventListener("click", () => dialog.close()));
    await load();
  }

  request("/api/auth/me").then(({ user }) => {
    if (user.role !== "admin") {
      window.location.replace(user.role === "docente" ? "../docente/index.html" : "../dashboard/index.html");
      return;
    }
    setupShell(user);
    if (page === "cursos") return initCourses();
    if (page === "cuentas") return initAccounts();
    return initHome();
  }).catch((error) => {
    if (error.message.includes("Inicia sesión")) window.location.replace("../login/index.html");
    else feedback(error.message, "error");
  });
})();
