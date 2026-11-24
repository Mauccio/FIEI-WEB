(() => {
  const loginPath = "../login/index.html";
  const hardcodedUsers = {
    1: { id: 1, code: "2025024891", fullName: "Mauricio Sebastián Fonseca Pizarro", role: "estudiante" },
    2: { id: 2, code: "9000000001", fullName: "Docente de Prueba", role: "docente" },
    3: { id: 3, code: "9000000002", fullName: "Administrador", role: "admin" }
  };
  const activeSessionId = Number(sessionStorage.getItem("fiei-tic-session"));
  const activeSessionUser = hardcodedUsers[activeSessionId];
  if (!activeSessionUser) {
    window.location.replace(loginPath);
  } else if (activeSessionUser.role !== "estudiante") {
    window.location.replace(activeSessionUser.role === "docente" ? "../docente/index.html" : "../administracion/index.html");
  } else {
    document.querySelectorAll(".sidebar-welcome").forEach((node) => { node.textContent = `Bienvenido, ${activeSessionUser.fullName}`; });
    document.querySelectorAll("[data-current-user]").forEach((node) => { node.textContent = activeSessionUser.fullName; });
    document.querySelectorAll("[data-current-code]").forEach((node) => { node.textContent = activeSessionUser.code; });
    document.querySelectorAll("[data-profile-code]").forEach((node) => { node.textContent = activeSessionUser.code; });
    document.querySelectorAll("[data-profile-email]").forEach((node) => { node.textContent = `${activeSessionUser.code}@unfv.edu.pe`; });
  }

  const securityTrigger = document.querySelector("#security-trigger");
  const securityForm = document.querySelector("#security-form");
  const passwordForm = document.querySelector("#password-form");
  if (securityTrigger && securityForm && passwordForm && activeSessionUser) {
    const setSecurityOpen = (open) => {
      securityForm.hidden = !open;
      securityTrigger.setAttribute("aria-expanded", String(open));
      if (open) {
        document.querySelector("#security-status").textContent = "";
        passwordForm.reset();
        securityForm.scrollIntoView({ behavior: "smooth", block: "center" });
        passwordForm.elements.currentPassword.focus({ preventScroll: true });
      }
    };
    securityTrigger.addEventListener("click", () => setSecurityOpen(securityForm.hidden));
    document.querySelector("#security-cancel").addEventListener("click", () => setSecurityOpen(false));
    passwordForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const currentPassword = passwordForm.elements.currentPassword.value;
      const newPassword = passwordForm.elements.newPassword.value;
      const confirmPassword = passwordForm.elements.confirmPassword.value;
      let overrides = {};
      try { overrides = JSON.parse(localStorage.getItem("siscad.passwords.v1") || "{}"); } catch (_) {}
      const currentExpected = overrides[activeSessionUser.code] ||
        ({ "2025024891": "SiscadDemo2026!", "9000000001": "SiscadDemo2026!", "9000000002": "SiscadDemo2026!" }[activeSessionUser.code]);
      if (currentPassword !== currentExpected) {
        document.querySelector("#security-status").textContent = "La contraseña actual no es correcta.";
        return;
      }
      if (newPassword !== confirmPassword) {
        document.querySelector("#security-status").textContent = "Las contraseñas nuevas no coinciden.";
        return;
      }
      overrides[activeSessionUser.code] = newPassword;
      localStorage.setItem("siscad.passwords.v1", JSON.stringify(overrides));
      passwordForm.reset();
      document.querySelector("#security-status").textContent = "Contraseña cambiada correctamente.";
    });
  }
  const campusEvents = [
    { id: "realidad-virtual", title: "Realidad virtual y experiencias inmersivas", category: "Tecnología", date: "Vida universitaria", summary: "La realidad virtual abre nuevas formas de explorar entornos digitales y acercar la tecnología a experiencias de aprendizaje.", image: "banner1.jpg", alt: "Estudiante explorando una interfaz de realidad virtual" },
    { id: "transformacion-digital", title: "Transformación digital en la ingeniería", category: "Innovación", date: "Comunidad FIEI", summary: "Las tecnologías digitales amplían los campos profesionales de la ingeniería, la informática y las telecomunicaciones.", image: "banner2.jpg", alt: "Perfil de una persona frente a gráficos digitales" },
    { id: "recursos-digitales", title: "Recursos digitales para aprender", category: "Vida universitaria", date: "Comunidad FIEI", summary: "Las herramientas digitales forman parte del trabajo académico, la colaboración y el intercambio de conocimientos.", image: "banner3.jpg", alt: "Persona utilizando una tableta con recursos digitales" },
    { id: "robotica", title: "Automatización y robótica", category: "Ingeniería", date: "Comunidad FIEI", summary: "Los sistemas automatizados integran mecánica, electrónica, control e informática para resolver retos de la industria.", image: "banner4.jpg", alt: "Brazo robótico industrial" },
    { id: "electronica-hardware", title: "Electrónica y hardware", category: "Tecnología", date: "Comunidad FIEI", summary: "Conoce componentes y procesos que forman parte del diseño, armado y mantenimiento de equipos electrónicos.", image: "banner5.jpg", alt: "Montaje de componentes electrónicos en una placa" },
    { id: "investigacion", title: "Investigación e innovación tecnológica", category: "Investigación", date: "Comunidad FIEI", summary: "La investigación conecta conocimientos científicos y tecnológicos con nuevas preguntas y proyectos.", image: "banner6.jpg", alt: "Entorno tecnológico de investigación" },
    { id: "servicios-nube", title: "Servicios en la nube y conectividad", category: "Tecnología", date: "Comunidad FIEI", summary: "El acceso a servicios digitales y la conectividad son parte de los sistemas que usamos cada día.", image: "banner7.jpg", alt: "Interfaz digital de servicios en la nube" },
    { id: "mantenimiento-equipos", title: "Mantenimiento y soporte de equipos", category: "Ingeniería", date: "Comunidad FIEI", summary: "El diagnóstico y cuidado del hardware ayuda a mantener los equipos de cómputo en funcionamiento.", image: "banner8.jpg", alt: "Técnico revisando el hardware de una computadora" },
    { id: "aniversario-fiei", title: "Programa de aniversario FIEI", category: "Aniversario", date: "25 de octubre – 5 de noviembre", summary: "El programa incluye actividades deportivas, conferencias, visitas técnicas, un talent show y la ceremonia central por el aniversario de la facultad.", image: "programa-aniversario-fiei.png", alt: "Programa de aniversario de la FIEI con actividades académicas, deportivas y culturales" },
    { id: "futsal-fiei", title: "Campeonato de futsal por el aniversario FIEI", category: "Deportes", date: "Sábado 31 de octubre de 2026", summary: "La convocatoria indica inscripciones hasta el 28 de octubre y reunión con delegados el 30 de octubre, a las 14:00, en Jr. Iquique 127, Breña.", image: "campeonato-futsal-fiei.png", alt: "Afiche del campeonato de futsal por el XXIX aniversario de la FIEI" }
  ];
  document.querySelectorAll(".sidebar-exit").forEach((link) => link.addEventListener("click", async (event) => {
    event.preventDefault();
    sessionStorage.removeItem("fiei-tic-session");
    try { await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }); }
    finally { window.location.assign(link.href); }
  }));

  const courseGrid = document.querySelector(".course-grid[aria-label='Cursos matriculados']");
  if (courseGrid) fetch("/api/courses", { credentials: "same-origin" }).then(async (response) => {
    if (!response.ok) return;
    const { courses } = await response.json();
    courseGrid.replaceChildren();
    courses.forEach((course) => {
      const card = document.createElement("article");
      card.className = "course-card";
      const code = document.createElement("span"); code.className = "pill"; code.textContent = course.code;
      const title = document.createElement("h2"); title.textContent = course.name;
      const details = document.createElement("p"); details.className = "course-code"; details.textContent = `Sección ${course.section}`;
      const meta = document.createElement("div"); meta.className = "course-meta";
      const periodLabel = document.createElement("span"); periodLabel.textContent = "Periodo académico";
      const period = document.createElement("span"); period.textContent = course.term;
      meta.append(periodLabel, period);
      const footer = document.createElement("div"); footer.className = "course-card-footer";
      const status = document.createElement("span"); status.className = "pill ready"; status.textContent = "En curso";
      footer.append(status);
      card.append(code, title, details, meta, footer);
      courseGrid.append(card);
    });
    document.querySelectorAll(".summary-grid .summary-card:first-child strong").forEach((node) => { node.textContent = String(courses.length); });
    document.querySelectorAll(".summary-grid .summary-card:nth-child(2) strong").forEach((node) => { node.textContent = String(courses.length); });
  }).catch(() => {});

  const page = document.body.dataset.page;
  const appShell = document.querySelector(".app-shell");
  const sidebarToggle = document.querySelector("#sidebar-toggle");
  const startsCollapsed = new URLSearchParams(window.location.search).get("nav") === "collapsed";
  if (appShell && startsCollapsed) appShell.classList.add("sidebar-collapsed");

  const studentNav = document.querySelector(".side-nav");
  const coursesLink = studentNav?.querySelector('[data-page-link="cursos"]');
  if (studentNav && coursesLink && !studentNav.querySelector('[data-page-link="tareas"]')) {
    const tasksLink = document.createElement("a");
    tasksLink.dataset.pageLink = "tareas";
    tasksLink.setAttribute("aria-label", "Tareas");
    tasksLink.title = "Tareas";
    tasksLink.innerHTML = '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/><path d="M9 3h6v4H9zM8 13h8M8 17h5"/></svg><span class="nav-label">Tareas</span>';
    coursesLink.insertAdjacentElement("afterend", tasksLink);
  }
  if (studentNav && !studentNav.querySelector('[data-page-link="eventos"]')) {
    const eventsLink = document.createElement("a");
    eventsLink.dataset.pageLink = "eventos";
    eventsLink.setAttribute("aria-label", "Eventos");
    eventsLink.title = "Eventos";
    eventsLink.innerHTML = '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 15l2 2 4-4"/></svg><span class="nav-label">Eventos</span>';
    studentNav.append(eventsLink);
  }
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    const target = link.dataset.pageLink;
    const path = target === "dashboard" ? "../dashboard/index.html" :
      target === "perfil" ? "../perfil/index.html" :
      target === "cursos" ? "../cursos/index.html" :
      target === "tareas" ? "../tareas/index.html" :
      target === "notas" ? "../notas/index.html" :
      target === "tramites" ? "../tramites/index.html" :
      target === "horario" ? "../horario/index.html" :
      target === "eventos" ? "../eventos/index.html" : "#";
    link.href = path + (startsCollapsed ? "?nav=collapsed" : "");
    if (target === page) link.setAttribute("aria-current", "page");
  });

  const sidebarTitle = document.querySelector(".sidebar-title");
  if (sidebarTitle) sidebarTitle.remove();

  const institutionalHeader = document.querySelector(".institutional-header-wrap");
  const institutionalBrand = institutionalHeader?.querySelector(".institutional-brand");
  if (institutionalHeader && institutionalBrand && !institutionalHeader.querySelector(".siscad-header-logo")) {
    const siscadLogo = document.createElement("img");
    siscadLogo.className = "siscad-header-logo";
    siscadLogo.src = "../login/img/siscad_logo.png";
    siscadLogo.alt = "SISCAD — Sistema de Control Académico Digital";
    institutionalBrand.insertAdjacentElement("afterend", siscadLogo);
  }

  const notificationList = document.querySelector(".notification-list");
  if (notificationList) {
    notificationList.innerHTML = `
      <li data-new="true"><span class="unread-dot" aria-hidden="true"></span><div><p><strong>Se publicó la nota de PP en Física</strong></p><p class="subtle">Hace 2 horas</p></div></li>
      <li data-new="true"><span class="unread-dot" aria-hidden="true"></span><div><p><strong>Ya puedes calcular tu EF pendiente en Cálculo integral</strong></p><p class="subtle">Hace 5 horas</p></div></li>
      <li data-new="false"><span class="unread-dot read" aria-hidden="true"></span><div><p>Se publicó la proyección de EF para Matemática discreta</p><p class="subtle">Hace 2 días</p></div></li>
      <li data-new="false"><span class="unread-dot read" aria-hidden="true"></span><div><p>Se actualizó tu libreta de notas del periodo 2026-II</p><p class="subtle">Hace 3 días</p></div></li>
    `;
  }

  const unread = document.querySelectorAll(".notification-list li[data-new='true']").length;
  const unreadText = document.querySelector("[data-unread-count]");
  if (unreadText) unreadText.textContent = unread === 0 ? "No tienes notificaciones nuevas." : `Tienes ${unread} sin leer.`;

  const notificationPanel = document.querySelector(".notification-panel");
  if (notificationPanel && page !== "eventos" && !notificationPanel.querySelector(".notification-photo-banner")) {
    const banner = document.createElement("section");
    banner.className = "notification-photo-banner";
    banner.setAttribute("aria-label", "Banner de la Facultad");
    banner.innerHTML = '<a class="notification-banner-link"><figure class="notification-banner"><img alt=""><figcaption><span class="banner-kicker"></span><strong class="banner-title"></strong><span class="banner-summary"></span><span class="banner-action">Leer noticia <span aria-hidden="true">→</span></span></figcaption></figure></a>';
    const bannerLink = banner.querySelector(".notification-banner-link");
    const bannerTitle = banner.querySelector(".banner-title");
    const bannerSummary = banner.querySelector(".banner-summary");
    const bannerKicker = banner.querySelector(".banner-kicker");
    const image = banner.querySelector("img");
    const showEvent = (index) => {
      const event = campusEvents[index];
      image.src = `../assets-estudiante/banners/${event.image}`;
      image.alt = event.alt;
      bannerKicker.textContent = event.category;
      bannerTitle.textContent = event.title;
      bannerSummary.textContent = event.summary;
      bannerLink.href = `../eventos/index.html?evento=${encodeURIComponent(event.id)}`;
      bannerLink.setAttribute("aria-label", `Leer noticia: ${event.title}`);
    };
    showEvent(0);
    notificationPanel.appendChild(banner);
    let firstImage = 0;
    window.setInterval(() => {
      firstImage = (firstImage + 1) % campusEvents.length;
      image.classList.add("is-changing");
      window.setTimeout(() => {
        showEvent(firstImage);
        image.classList.remove("is-changing");
      }, 220);
    }, 6500);
  }

  const eventsGrid = document.querySelector("#events-grid");
  const featuredEvent = document.querySelector("#featured-event");
  if (eventsGrid && featuredEvent) {
    const selectedId = new URLSearchParams(window.location.search).get("evento");
    const selectedEvent = campusEvents.find((event) => event.id === selectedId) || campusEvents[0];
    const featuredImage = document.createElement("img");
    featuredImage.className = "event-feature-image";
    featuredImage.src = `../assets-estudiante/banners/${selectedEvent.image}`;
    featuredImage.alt = selectedEvent.alt;
    const featuredCopy = document.createElement("div");
    featuredCopy.className = "event-feature-copy";
    const featuredCategory = document.createElement("p");
    featuredCategory.className = "event-category";
    featuredCategory.textContent = `${selectedEvent.category} · ${selectedEvent.date}`;
    const featuredTitle = document.createElement("h2");
    featuredTitle.textContent = selectedEvent.title;
    const featuredSummary = document.createElement("p");
    featuredSummary.textContent = selectedEvent.summary;
    featuredCopy.append(featuredCategory, featuredTitle, featuredSummary);
    featuredEvent.replaceChildren(featuredImage, featuredCopy);

    campusEvents.forEach((event) => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.id = `evento-${event.id}`;
      const link = document.createElement("a");
      link.href = `../eventos/index.html?evento=${encodeURIComponent(event.id)}`;
      link.setAttribute("aria-label", `Ver noticia: ${event.title}`);
      const cardImage = document.createElement("img");
      cardImage.src = `../assets-estudiante/banners/${event.image}`;
      cardImage.alt = event.alt;
      const cardCopy = document.createElement("div");
      cardCopy.className = "event-card-copy";
      const category = document.createElement("p");
      category.className = "event-category";
      category.textContent = event.category;
      const title = document.createElement("h3");
      title.textContent = event.title;
      const summary = document.createElement("p");
      summary.textContent = event.summary;
      const date = document.createElement("span");
      date.className = "event-date";
      date.textContent = event.date;
      cardCopy.append(category, title, summary, date);
      link.append(cardImage, cardCopy);
      card.append(link);
      if (event.id === selectedEvent.id) card.classList.add("is-selected");
      eventsGrid.append(card);
    });
  }

  if (sidebarToggle) {
    if (startsCollapsed) {
      sidebarToggle.setAttribute("aria-expanded", "false");
      sidebarToggle.setAttribute("aria-label", "Desplegar menú");
      sidebarToggle.setAttribute("title", "Desplegar menú");
      sidebarToggle.querySelector("svg path").setAttribute("d", "M5 12h14m-7-7 7 7-7 7");
    }
    sidebarToggle.addEventListener("click", () => {
      const collapsed = appShell.classList.toggle("sidebar-collapsed");
      sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
      const label = collapsed ? "Desplegar menú" : "Contraer menú";
      sidebarToggle.setAttribute("aria-label", label);
      sidebarToggle.setAttribute("title", label);
      sidebarToggle.querySelector("svg path").setAttribute(
        "d",
        collapsed ? "M5 12h14m-7-7 7 7-7 7" : "M19 12H5m7 7-7-7 7-7"
      );
      document.querySelectorAll("[data-page-link]").forEach((link) => {
        const path = link.href.split("?")[0];
        link.href = path + (collapsed ? "?nav=collapsed" : "");
      });
    });
  }

  const participantsTitle = document.querySelector("[data-course-title]");
  if (participantsTitle) {
    const courseData = {
      fisica: { name: "Física", section: "A", count: 12, code: "100560", credits: 4, teacher: "Isaías Severo Tafur Mallqui" },
      ingles: { name: "Inglés II", section: "A", count: 9, code: "100382", credits: 1, teacher: "Miguel Vladimir Pérez Samanamud" },
      sociologia: { name: "Sociología", section: "A", count: 10, code: "100442", credits: 2, teacher: "Lilly del Pilar Palomino Paz" },
      liderazgo: { name: "Liderazgo y desarrollo personal", section: "A", count: 8, code: "100555", credits: 3, teacher: "Tito Aguilar Díaz" },
      ambiente: { name: "Medio ambiente y desarrollo sostenible", section: "A", count: 11, code: "100556", credits: 3, teacher: "Anna Katiuska Grados Espinoza" },
      calculo: { name: "Cálculo integral", section: "A", count: 10, code: "100558", credits: 4, teacher: "Carlos Héctor Cerna Gonzáles" },
      discreta: { name: "Matemática discreta para informática", section: "A", count: 9, code: "101009", credits: 3, teacher: "Ramiro Amador Flores Eulogio" },
      tic: { name: "Tecnologías de la información y comunicación", section: "A", count: 12, code: "100557", credits: 2, teacher: "Ciro Rodríguez Rodríguez" }
    };
    const selectedCourse = courseData[new URLSearchParams(window.location.search).get("curso")] || courseData.fisica;
    participantsTitle.textContent = `Participantes · ${selectedCourse.name}`;
    document.querySelector("[data-course-section]").textContent = selectedCourse.section;
    document.querySelector("[data-course-count]").textContent = selectedCourse.count;
    document.querySelector("[data-course-code]").textContent = selectedCourse.code;
    document.querySelector("[data-course-credits]").textContent = selectedCourse.credits;
    document.querySelector("[data-course-teacher]").textContent = selectedCourse.teacher;
    const participantsList = document.querySelector("[data-participants]");
    participantsList.innerHTML = "";
    const firstParticipant = document.createElement("li");
    const firstPhoto = document.createElement("img");
    firstPhoto.className = "roster-avatar";
    firstPhoto.src = "../assets-estudiante/mauccio.jpeg";
    firstPhoto.alt = "Foto de Mauricio Sebastián Fonseca Pizarro";
    const firstName = document.createElement("span");
    firstName.textContent = "Mauricio Sebastián Fonseca Pizarro";
    firstParticipant.append(firstPhoto, firstName);
    participantsList.appendChild(firstParticipant);
    for (let index = 2; index <= selectedCourse.count; index += 1) {
      const item = document.createElement("li");
      const photo = document.createElement("img");
      photo.className = "roster-avatar";
      photo.src = "../panel/perfil/img/avatar.png";
      photo.alt = "";
      const name = document.createElement("span");
      name.textContent = `Estudiante de muestra ${selectedCourse.section}-${String(index).padStart(2, "0")}`;
      item.append(photo, name);
      participantsList.appendChild(item);
    }
  }

  const schedule = document.querySelector("[data-schedule]");
  if (!schedule) return;

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const sessions = [
    { name: "Cálculo Integral", category: "Específicos", day: 0, start: "08:00", end: "09:40", teacher: "Carlos Héctor Cerna Gonzáles", room: "120" },
    { name: "Tecnologías de la información y comunicación", category: "Especializados", day: 1, start: "08:00", end: "11:20", teacher: "Rodríguez Rodríguez", room: "LAB1 Iquique" },
    { name: "Medio ambiente y desarrollo sostenible", category: "Generales", day: 2, start: "08:00", end: "11:20", teacher: "Anna Katiuska Grados Espinoza", room: "111" },
    { name: "Sociología", category: "Generales", day: 3, start: "08:00", end: "11:20", teacher: "Lilly del Pilar Palomino Paz", room: "111" },
    { name: "Liderazgo y desarrollo personal", category: "Generales", day: 4, start: "08:00", end: "11:20", teacher: "Tito Aguilar Díaz", room: "111" },
    { name: "Matemática discreta para informática", category: "Específicos", day: 5, start: "08:00", end: "11:20", teacher: "Flores Eulogio", room: "LAB1 Iquique" },
    { name: "Física", category: "Generales", day: 0, start: "11:20", end: "12:10", teacher: "Isaías Severo Tafur Mallqui", room: "111" },
    { name: "Física", category: "Generales", day: 2, start: "11:20", end: "12:10", teacher: "Isaías Severo Tafur Mallqui", room: "111" },
    { name: "Inglés II", category: "Generales", day: 3, start: "11:20", end: "12:10", teacher: "Pérez Samanamud", room: "111" },
    { name: "Física", category: "Generales", day: 0, start: "13:00", end: "14:40", teacher: "Isaías Severo Tafur Mallqui", room: "111" },
    { name: "Física", category: "Generales", day: 2, start: "13:00", end: "14:40", teacher: "Isaías Severo Tafur Mallqui", room: "111" },
    { name: "Inglés II", category: "Generales", day: 3, start: "13:00", end: "13:50", teacher: "Pérez Samanamud", room: "111" },
    { name: "Cálculo Integral", category: "Específicos", day: 3, start: "13:50", end: "16:20", teacher: "Carlos Héctor Cerna Gonzáles", room: "111" }
  ];
  const classNames = { Generales: "class-tic", Específicos: "class-calculo", Especializados: "class-ia" };
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];
  const baseMonday = new Date(2026, 9, 19);
  let weekOffset = 0;
  let filter = "Todos";

  function weekRange(offset) {
    const start = new Date(baseMonday);
    start.setDate(start.getDate() + offset * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 5);
    if (start.getMonth() === end.getMonth()) return `${start.getDate()} – ${end.getDate()} de ${months[start.getMonth()]}`;
    return `${start.getDate()} de ${months[start.getMonth()]} – ${end.getDate()} de ${months[end.getMonth()]}`;
  }

  function renderSchedule() {
    const range = document.querySelector("[data-week-range]");
    range.textContent = weekRange(weekOffset);
    const body = schedule.querySelector("tbody");
    const hourLabels = Array.from({ length: 9 }, (_, hour) => `<span style="top:${hour * 68}px">${String(8 + hour).padStart(2, "0")}:00</span>`).join("");
    const dayColumns = days.map((day, dayIndex) => {
      const blocks = sessions
        .filter((session) => session.day === dayIndex && (filter === "Todos" || session.category === filter))
        .map((session) => {
          const [startHour, startMinute] = session.start.split(":").map(Number);
          const [endHour, endMinute] = session.end.split(":").map(Number);
          const startOffset = (startHour * 60 + startMinute - 8 * 60) * (68 / 60);
          const duration = (endHour * 60 + endMinute - startHour * 60 - startMinute) * (68 / 60);
          return `<article class="schedule-class ${classNames[session.category]}" style="top:${startOffset}px;height:${duration}px" title="${session.name} · ${session.teacher} · ${session.start}–${session.end}"><p>${session.name}</p><small>${session.start}–${session.end} · ${session.category}</small><small>Aula ${session.room} | Código —</small></article>`;
        }).join("");
      return `<div class="schedule-day-column" role="cell" aria-label="${day}">${blocks}</div>`;
    }).join("");
    schedule.innerHTML = `<div class="schedule-corner" role="columnheader">Hora</div>${days.map((day) => `<div class="schedule-day-heading" role="columnheader">${day}</div>`).join("")}<div class="schedule-time-axis" role="rowheader">${hourLabels}</div>${dayColumns}`;
  }

  document.querySelector("[data-week-prev]").addEventListener("click", () => { weekOffset -= 1; renderSchedule(); });
  document.querySelector("[data-week-next]").addEventListener("click", () => { weekOffset += 1; renderSchedule(); });
  document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    renderSchedule();
  }));
  renderSchedule();
})();
