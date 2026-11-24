(function () {
  const STORAGE_KEY = "fiei-tic-siscad-v1";
  const SESSION_KEY = "fiei-tic-session";
  const demoPassword = "SiscadDemo2026!";

  const clone = (value) => JSON.parse(JSON.stringify(value));

  function initialState() {
    const users = [
      { id: 1, code: "2025024891", fullName: "Mauricio Sebastián Fonseca Pizarro", role: "estudiante", active: true, password: demoPassword },
      { id: 2, code: "9000000001", fullName: "Docente de Prueba", role: "docente", active: true, password: demoPassword },
      { id: 3, code: "9000000002", fullName: "Administrador", role: "admin", active: true, password: demoPassword }
    ];
    const courses = [
      { id: 1, code: "100560", name: "Física", section: "A", cycle: 2, term: "2026-II", teacherId: 2, active: true },
      { id: 2, code: "100442", name: "Sociología", section: "A", cycle: 2, term: "2026-II", teacherId: 2, active: true }
    ];
    return { users, courses, enrollments: [{ courseId: 1, studentId: 1 }, { courseId: 2, studentId: 1 }], nextUserId: 4, nextCourseId: 3 };
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    const state = initialState();
    saveState(state);
    return state;
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  let state = loadState();

  function currentUser() {
    const id = Number(sessionStorage.getItem(SESSION_KEY));
    return id ? state.users.find((user) => user.id === id && user.active) : null;
  }

  function publicUser(user) {
    if (!user) return null;
    return { id: user.id, code: user.code, fullName: user.fullName, role: user.role };
  }

  function response(status, body) {
    return Promise.resolve(new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" }
    }));
  }

  function teacherForCourse(course) {
    const teacher = state.users.find((user) => user.id === course.teacherId && user.active);
    return teacher ? teacher.fullName : null;
  }

  function courseView(course, includePreview) {
    const students = state.enrollments
      .filter((item) => item.courseId === course.id)
      .map((item) => state.users.find((user) => user.id === item.studentId && user.active))
      .filter(Boolean);
    const view = {
      id: course.id,
      code: course.code,
      name: course.name,
      section: course.section,
      cycle: course.cycle,
      term: course.term,
      teacherId: course.teacherId,
      teacherName: teacherForCourse(course),
      studentCount: students.length
    };
    if (includePreview) view.studentPreview = students.slice(0, 3).map(publicUser);
    return view;
  }

  async function readBody(options) {
    if (!options || !options.body) return {};
    try { return JSON.parse(options.body); } catch (_) { return {}; }
  }

  async function mockFetch(input, options) {
    const url = new URL(typeof input === "string" ? input : input.url, window.location.href);
    const path = url.pathname;
    const method = (options && options.method || "GET").toUpperCase();
    if (!path.startsWith("/api/")) return originalFetch(input, options);

    const user = currentUser();

    if (path === "/api/health") return response(200, { status: "ok", mode: "hardcoded" });
    if (path === "/api/setup/status") return response(200, { setupRequired: false });

    if (path === "/api/auth/login" && method === "POST") {
      const body = await readBody(options);
      const account = state.users.find((item) => item.code.toLowerCase() === String(body.code || "").trim().toLowerCase() && item.password === body.password && item.active);
      if (!account) return response(401, { error: "Código o contraseña incorrectos." });
      sessionStorage.setItem(SESSION_KEY, String(account.id));
      return response(200, { user: publicUser(account) });
    }
    if (path === "/api/auth/logout" && method === "POST") {
      sessionStorage.removeItem(SESSION_KEY);
      return response(200, { message: "Sesión cerrada." });
    }
    if (path === "/api/auth/me") {
      if (!user) return response(401, { error: "Inicia sesión para continuar." });
      return response(200, { user: publicUser(user) });
    }
    if (!user) return response(401, { error: "Inicia sesión para continuar." });

    if (path === "/api/student/overview") {
      if (user.role !== "estudiante") return response(403, { error: "Este resumen solo está disponible para cuentas de estudiante." });
      const courses = state.enrollments.filter((item) => item.studentId === user.id)
        .map((item) => state.courses.find((course) => course.id === item.courseId && course.active))
        .filter(Boolean).map((course) => courseView(course, false));
      return response(200, { user: publicUser(user), courses, modules: { grades: false, schedule: false, procedures: false } });
    }

    if (path === "/api/users" && method === "GET") {
      if (user.role !== "admin") return response(403, { error: "Solo administración puede gestionar cuentas." });
      const role = url.searchParams.get("role");
      const users = state.users.filter((item) => item.active && (role ? item.role === role : item.role !== "admin"));
      return response(200, { users: users.map(publicUser) });
    }

    if (path === "/api/users" && method === "POST") {
      if (user.role !== "admin") return response(403, { error: "Solo administración puede gestionar cuentas." });
      const body = await readBody(options);
      const code = String(body.code || "").trim();
      const fullName = String(body.fullName || "").trim();
      const role = String(body.role || "");
      const password = String(body.password || "");
      const validCode = role === "docente" ? /^[a-z0-9._-]{3,30}$/i.test(code) : /^\d{6,20}$/.test(code);
      if (!validCode || fullName.length < 3 || password.length < 12 || !["docente", "estudiante"].includes(role)) {
        return response(400, { error: "Verifica el código, el nombre y la contraseña de al menos 12 caracteres." });
      }
      const normalizedCode = role === "docente" ? code.toLowerCase() : code;
      const existing = state.users.find((item) => item.code === normalizedCode);
      if (existing) {
        if (existing.role !== role) return response(409, { error: "Ese código ya está reservado para otro tipo de cuenta." });
        if (existing.active) return response(409, { error: "Ya existe una cuenta activa con ese código." });
        Object.assign(existing, { fullName, password, role, active: true });
        saveState(state);
        return response(200, { user: publicUser(existing), reactivated: true });
      }
      const account = { id: state.nextUserId++, code: normalizedCode, fullName, role, password, active: true };
      state.users.push(account);
      saveState(state);
      return response(201, { user: publicUser(account) });
    }

    const userMatch = path.match(/^\/api\/users\/(\d+)$/);
    if (userMatch && ["PUT", "DELETE"].includes(method)) {
      if (user.role !== "admin") return response(403, { error: "Solo administración puede gestionar cuentas." });
      const account = state.users.find((item) => item.id === Number(userMatch[1]) && item.active);
      if (!account) return response(404, { error: "La cuenta no existe o ya está desactivada." });
      if (method === "DELETE") {
        account.active = false;
        saveState(state);
        return response(200, { message: "Cuenta desactivada." });
      }
      const body = await readBody(options);
      const code = String(body.code || account.code).trim();
      const fullName = String(body.fullName || account.fullName).trim();
      const password = String(body.password || "");
      if (password && password.length < 12) return response(400, { error: "La contraseña debe tener al menos 12 caracteres." });
      account.code = account.role === "docente" ? code.toLowerCase() : code;
      account.fullName = fullName;
      if (password) account.password = password;
      saveState(state);
      return response(200, { user: publicUser(account) });
    }

    if (path === "/api/courses" && method === "GET") {
      let courses;
      if (user.role === "docente") {
        courses = state.courses.filter((course) => course.active && course.teacherId === user.id);
      } else if (user.role === "estudiante") {
        const ids = state.enrollments.filter((item) => item.studentId === user.id).map((item) => item.courseId);
        courses = state.courses.filter((course) => course.active && ids.includes(course.id));
      } else {
        courses = state.courses.filter((course) => course.active);
      }
      return response(200, { courses: courses.map((course) => courseView(course, user.role === "docente")) });
    }

    if (path === "/api/courses" && method === "POST") {
      if (user.role !== "admin") return response(403, { error: "Solo administración puede crear cursos." });
      const body = await readBody(options);
      const course = {
        id: state.nextCourseId++, code: String(body.code || "").trim(), name: String(body.name || "").trim(),
        section: String(body.section || "").trim(), cycle: Number(body.cycle), term: String(body.term || "").trim(),
        teacherId: Number(body.teacherId), active: true
      };
      const teacher = state.users.find((item) => item.id === course.teacherId && item.role === "docente" && item.active);
      if (!course.code || !course.name || !course.section || !teacher || !course.term) {
        state.nextCourseId--;
        return response(400, { error: "Código, nombre, ciclo, periodo académico, sección y docente asignado son obligatorios." });
      }
      const duplicate = state.courses.find((item) => item.active && item.code === course.code && item.section === course.section && item.term === course.term);
      if (duplicate) {
        state.nextCourseId--;
        return response(409, { error: "Ya existe una sección activa con ese código, periodo y sección." });
      }
      state.courses.push(course);
      saveState(state);
      return response(201, { course: courseView(course, false) });
    }

    const courseStudents = path.match(/^\/api\/courses\/(\d+)\/students$/);
    if (courseStudents && method === "GET") {
      const course = state.courses.find((item) => item.id === Number(courseStudents[1]) && item.active);
      if (!course) return response(404, { error: "La sección no existe o está desactivada." });
      if (user.role !== "admin" && !(user.role === "docente" && course.teacherId === user.id)) {
        return response(403, { error: "No tienes permiso para ver esta lista." });
      }
      const students = state.enrollments.filter((item) => item.courseId === course.id)
        .map((item) => state.users.find((account) => account.id === item.studentId && account.active))
        .filter(Boolean).map(publicUser);
      return response(200, { students });
    }

    const courseEnrollments = path.match(/^\/api\/courses\/(\d+)\/enrollments$/);
    if (courseEnrollments && method === "POST") {
      if (user.role !== "admin") return response(403, { error: "Solo administración puede matricular estudiantes." });
      const course = state.courses.find((item) => item.id === Number(courseEnrollments[1]) && item.active);
      if (!course) return response(404, { error: "La sección no existe o está desactivada." });
      const body = await readBody(options);
      const codes = [...new Set((body.codes || []).map((code) => String(code).trim()))];
      let added = 0, alreadyEnrolled = 0;
      const notFound = [], conflicts = [];
      for (const code of codes) {
        const student = state.users.find((item) => item.role === "estudiante" && item.active && item.code === code);
        if (!student) { notFound.push(code); continue; }
        const conflict = state.enrollments.find((item) => {
          if (item.studentId !== student.id) return false;
          const other = state.courses.find((section) => section.id === item.courseId && section.active);
          return other && other.code === course.code && other.term === course.term && other.id !== course.id;
        });
        if (conflict) {
          const other = state.courses.find((section) => section.id === conflict.courseId);
          conflicts.push({ code, section: other.section });
          continue;
        }
        if (state.enrollments.some((item) => item.courseId === course.id && item.studentId === student.id)) {
          alreadyEnrolled++;
        } else {
          state.enrollments.push({ courseId: course.id, studentId: student.id });
          added++;
        }
      }
      saveState(state);
      return response(200, { added, alreadyEnrolled, notFound, conflicts });
    }

    const courseMatch = path.match(/^\/api\/courses\/(\d+)$/);
    if (courseMatch && ["PUT", "DELETE"].includes(method)) {
      if (user.role !== "admin") return response(403, { error: "Solo administración puede gestionar cursos." });
      const course = state.courses.find((item) => item.id === Number(courseMatch[1]) && item.active);
      if (!course) return response(404, { error: "El curso no existe o ya está desactivado." });
      if (method === "DELETE") {
        course.active = false;
        saveState(state);
        return response(200, { message: "Curso desactivado." });
      }
      const body = await readBody(options);
      Object.assign(course, {
        code: String(body.code || course.code).trim(),
        name: String(body.name || course.name).trim(),
        section: String(body.section || course.section).trim(),
        cycle: Number(body.cycle || course.cycle),
        term: String(body.term || course.term).trim(),
        teacherId: Number(body.teacherId || course.teacherId)
      });
      saveState(state);
      return response(200, { course: courseView(course, false) });
    }

    return response(404, { error: "Ruta no disponible en la versión sin backend." });
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = mockFetch;
})();
