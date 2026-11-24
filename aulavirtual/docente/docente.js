(() => {
  const page = document.body.dataset.page;
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const request = async (url) => {
    const response = await fetch(url, { credentials: "same-origin" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "No se pudo cargar la información.");
    return result;
  };

  const renderCourse = (course) => {
    const count = Number(course.studentCount || 0);
    const state = count ? '<span class="pill ready">Lista cargada</span>' : '<span class="pill roster-pending">Lista oficial pendiente</span>';
    if (page === "cursos") {
      const preview = course.studentPreview || [];
      const avatars = preview.map((student) => {
        const initials = student.fullName.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
        return `<span class="student-avatar" title="${escapeHtml(student.fullName)}" aria-label="${escapeHtml(student.fullName)}">${escapeHtml(initials)}</span>`;
      }).join("");
      const remaining = Math.max(0, count - preview.length);
      const participants = count
        ? `<div class="course-participants" aria-label="Estudiantes de la sección"><div class="student-avatar-stack">${avatars}${remaining ? `<span class="student-avatar student-avatar-more" title="${remaining} estudiantes más">+${remaining}</span>` : ""}</div><span class="participant-count">${count} estudiante${count === 1 ? "" : "s"}</span></div>`
        : '<span class="course-empty-roster">Lista pendiente</span>';
      return `<article class="course-card" data-course-id="${course.id}">${state}<h2>${escapeHtml(course.name)}</h2><p class="course-code">${escapeHtml(course.code)} · Sección ${escapeHtml(course.section)}</p><div class="course-meta"><span>Periodo académico</span><span>${escapeHtml(course.term)}</span></div><div class="course-meta"><span>Estudiantes</span><span>${count}</span></div><footer class="course-card-footer"><div class="course-participants-area">${participants}</div><button class="button-link course-details-button" type="button" data-course-details="${course.id}">Detalles</button></footer></article>`;
    }
    return `<article class="teacher-data-row"><div><strong>${escapeHtml(course.name)}</strong><span class="subtle">${escapeHtml(course.code)} · Sección ${escapeHtml(course.section)} · ${escapeHtml(course.term)}</span></div><div>${count ? `${count} estudiantes` : '<span class="unassigned">A la espera de la lista oficial</span>'}</div></article>`;
  };

  const activeLink = document.querySelector(`.side-nav a[data-section="${page}"]`);
  activeLink?.classList.add("active");
  activeLink?.setAttribute("aria-current", "page");

  const detailsDialog = document.querySelector("[data-course-details-dialog]");
  if (detailsDialog) {
    document.querySelector("[data-teacher-courses]").addEventListener("click", (event) => {
      const button = event.target.closest("[data-course-details]");
      if (!button) return;
      const course = window.teacherCourses?.find((item) => item.id === Number(button.dataset.courseDetails));
      if (!course) return;
      detailsDialog.querySelector("[data-course-details-title]").textContent = course.name;
      detailsDialog.querySelector("[data-course-details-meta]").textContent = `${course.code} · Sección ${course.section} · Periodo ${course.term}`;
      detailsDialog.querySelector("[data-course-details-count]").textContent = `${Number(course.studentCount || 0)} estudiante${Number(course.studentCount || 0) === 1 ? "" : "s"} matriculado${Number(course.studentCount || 0) === 1 ? "" : "s"}.`;
      const roster = course.studentPreview || [];
      detailsDialog.querySelector("[data-course-details-students]").innerHTML = roster.length
        ? roster.map((student) => `<li>${escapeHtml(student.fullName)}</li>`).join("")
        : "<li>Aún no hay estudiantes en esta sección.</li>";
      if (Number(course.studentCount || 0) > roster.length) detailsDialog.querySelector("[data-course-details-students]").insertAdjacentHTML("beforeend", `<li class="roster-more">Y ${Number(course.studentCount) - roster.length} estudiante${Number(course.studentCount) - roster.length === 1 ? "" : "s"} más.</li>`);
      detailsDialog.showModal();
    });
    detailsDialog.querySelectorAll("[data-course-details-close]").forEach((button) => button.addEventListener("click", () => detailsDialog.close()));
  }

  const toggle = document.querySelector(".sidebar-toggle");
  toggle?.addEventListener("click", () => {
    const collapsed = document.querySelector(".app-shell").classList.toggle("sidebar-collapsed");
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Desplegar menú" : "Contraer menú");
    toggle.title = collapsed ? "Desplegar menú" : "Contraer menú";
  });

  document.querySelector(".sidebar-exit")?.addEventListener("click", async (event) => {
    event.preventDefault();
    const loginUrl = event.currentTarget.href;
    try { await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }); }
    finally { window.location.assign(loginUrl); }
  });

  request("/api/auth/me").then(async ({ user }) => {
    if (user.role !== "docente") {
      window.location.replace(user.role === "admin" ? "../administracion/index.html" : "../dashboard/index.html");
      return null;
    }
    document.querySelectorAll(".sidebar-welcome").forEach((node) => { node.textContent = `Bienvenido, ${user.fullName}`; });
    const { courses } = await request("/api/courses");
    window.teacherCourses = courses;
    const studentTotal = courses.reduce((total, course) => total + Number(course.studentCount || 0), 0);
    const count = document.querySelector("[data-teacher-course-count]");
    const students = document.querySelector("[data-teacher-student-count]");
    const pending = document.querySelector("[data-teacher-roster-pending]");
    if (count) count.textContent = String(courses.length);
    if (students) students.textContent = String(studentTotal);
    if (pending) pending.textContent = String(courses.filter((course) => !Number(course.studentCount)).length);
    const term = document.querySelector("[data-current-term]");
    if (term) term.textContent = courses.length ? [...new Set(courses.map((course) => course.term))].join(", ") : "Aún no tienes cursos asignados.";
    const containers = document.querySelectorAll("[data-teacher-courses]");
    containers.forEach((container) => {
      container.innerHTML = courses.length ? courses.map(renderCourse).join("") : '<p class="section-note">No tienes cursos asignados. Cuando administración te asigne una sección, aparecerá aquí.</p>';
    });
    const intro = document.querySelector("[data-page-intro]");
    if (intro) intro.textContent = `${user.fullName} · Este es el resumen de tu actividad académica.`;
  }).catch((error) => {
    if (error.message.includes("Inicia sesión")) window.location.replace("../login/index.html");
    else document.querySelectorAll("[data-teacher-courses]").forEach((container) => { container.innerHTML = '<p class="section-note">No se pudo cargar la información. Recarga la página.</p>'; });
  });
})();
