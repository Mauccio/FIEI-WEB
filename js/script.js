(function () {
  var rootPath = document.body.dataset.siteRoot || "";
  var categories = [
    { slug: "perfil-profesional", label: "Perfil Profesional" },
    { slug: "campo-laboral", label: "Campo Laboral" },
    { slug: "plan-curricular", label: "Plan Curricular" },
    { slug: "malla-curricular", label: "Malla Curricular" },
    { slug: "silabos", label: "Sílabos" }
  ];
  var schools = [
    { slug: "epie", name: "Escuela Profesional de Ingeniería Electrónica" },
    { slug: "epii", name: "Escuela Profesional de Ingeniería Informática" },
    { slug: "epim", name: "Escuela Profesional de Ingeniería Mecatrónica" },
    { slug: "epit", name: "Escuela Profesional de Ingeniería de Telecomunicaciones" }
  ];

  function schoolMenu() {
    return schools.map(function (school) {
      var links = categories.map(function (category) {
        return '<a href="' + rootPath + 'escuelas/' + school.slug + '/' + category.slug + '/index.html">' + category.label + '</a>';
      }).join("");
      var panelId = 'school-links-' + school.slug;
      return '<section class="school-menu"><button class="school-toggle" type="button" aria-expanded="false" aria-controls="' + panelId + '" data-school-toggle><span>' + school.name + '</span><span class="school-arrow" aria-hidden="true">⌄</span></button><div class="school-links" id="' + panelId + '">' + links + '</div></section>';
    }).join("");
  }

  var headerSlot = document.getElementById("site-header");
  if (headerSlot) {
    headerSlot.innerHTML =
      '<header class="nav fiei-nav"><div class="wrap">' +
      '<a class="brand" href="' + rootPath + 'index.html#inicio" aria-label="FIEI, página de inicio"><span class="brand-logo"><img src="' + rootPath + 'img/fiei_logo.png" alt="Facultad de Ingeniería Electrónica e Informática" width="300"></span></a>' +
      '<button id="menu-btn" type="button" aria-label="Abrir menú principal" aria-expanded="false" aria-controls="menu"><span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span></button>' +
      '<nav id="menu" aria-label="Principal"><ul>' +
      '<li><a href="' + rootPath + 'index.html#inicio">Inicio</a></li>' +
      '<li><a href="' + rootPath + 'facultad/index.html">Facultad</a></li>' +
      '<li class="schools-nav"><a href="' + rootPath + 'escuelas/index.html">Escuelas</a><button type="button" aria-label="Abrir categorías de escuelas" aria-haspopup="true" aria-expanded="false">▾</button><div class="dd schools-menu"><div class="sch">' + schoolMenu() + '</div></div></li>' +
      '<li><a href="' + rootPath + 'departamento-academico/index.html">Departamento Académico</a></li>' +
      '<li><a href="' + rootPath + 'oficinas/index.html">Oficinas</a></li>' +
      '<li><a href="' + rootPath + 'aulavirtual/login/index.html">Aula Virtual</a></li>' +
      '</ul></nav></div></header>';
  }

  var footerSlot = document.getElementById("site-footer");
  if (footerSlot) {
    footerSlot.innerHTML =
      '<section class="sedes" aria-label="Sedes y contacto"><div class="wrap">' +
      '<div><h3>Sede Breña</h3><p>Jr. Iquique N.º 127, Breña</p></div>' +
      '<div><h3>Sede Pueblo Libre</h3><p>Calle San Marcos N.º 351, Pueblo Libre</p></div>' +
      '<div><h3>Contacto</h3><p>(+51) 748-0888, anexo 980225</p></div>' +
      '</div></section><footer class="site-footer"><div class="wrap">' +
      '<span>© FIEI – Universidad Nacional Federico Villarreal</span>' +
      '</div></footer>';
  }

  var pageHeading = document.querySelector("#contenido-principal .page-heading h1");
  var pageLead = document.querySelector("#contenido-principal .page-lead");
  var description = document.querySelector('meta[name="description"]');
  if (pageHeading && pageHeading.textContent.trim()) {
    document.title = pageHeading.textContent.trim() + " | FIEI – UNFV";
  }
  if (pageLead && description) description.setAttribute("content", pageLead.textContent.trim());

  var serviceRoot = document.getElementById("svc");
  if (serviceRoot) {
    var B = "https://web.unfv.edu.pe/facultades/fiei/";
    var I = {
      phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
      users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 14a6 6 0 0 1 3 6"/>',
      book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5"/>',
      folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
      doc: '<path d="M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6"/>',
      bag: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>',
      cap: '<path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5"/>',
      cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
      search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/>',
      pen: '<path d="M4 20l1-5L16 4l4 4L9 19z"/>',
      shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'
    };
    var S = [
      ["Directorio telefónico", B + "servicios/directorio-telefonico", "phone"],
      ["Plana docente", "file:///c%3A/Users/mauri/OneDrive/Documents/FIEI/departamento-academico/index.html#plana-docente", "users"],
      ["Consultas bibliográficas", "http://web2.unfv.edu.pe/sitio/servicio-institucional/sistema-de-bibliotecas-unfv", "book"],
      ["Sílabos", rootPath + "servicios/silabos/index.html", "folder"],
      ["Trámites", B + "servicios/tramites", "doc"],
      ["Bolsa de trabajo", "http://web2.unfv.edu.pe/sitio/bolsa-de-trabajo", "bag"],
      ["Egresados", "http://siseu.sineace.gob.pe/", "cap"],
      ["Exámenes", B + "servicios/examenes", "pen"],
      ["Guía del estudiante", B + "images/guia_estudiante/guia_del_estudiante_2023.pdf", "doc"],
      ["Directivas", rootPath + "directivas/index.html", "shield"]
    ];
    serviceRoot.innerHTML = S.map(function (s) {
      var opensNewPage = /^https?:\/\//.test(s[1]);
      return '<a class="svc" href="' + s[1] + '"' + (opensNewPage ? ' target="_blank" rel="noopener"' : '') + '><svg viewBox="0 0 24 24" aria-hidden="true">' + I[s[2]] + "</svg>" + s[0] + "</a>";
    }).join("");
  }

  var menu = document.getElementById("menu");
  var menuButton = document.getElementById("menu-btn");
  if (menu && menuButton) {
    menuButton.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú principal" : "Abrir menú principal");
    });

    menu.addEventListener("click", function (event) {
      var target = event.target.closest ? event.target : event.target.parentElement;
      var dropdownButton = target.closest("button[aria-haspopup='true']");
      var schoolButton = target.closest("[data-school-toggle]");
      if (schoolButton) {
        var schoolPanel = document.getElementById(schoolButton.getAttribute("aria-controls"));
        var expandSchool = schoolButton.getAttribute("aria-expanded") !== "true";
        menu.querySelectorAll("[data-school-toggle]").forEach(function (button) {
          button.setAttribute("aria-expanded", "false");
          var panel = document.getElementById(button.getAttribute("aria-controls"));
          if (panel) panel.classList.remove("open");
        });
        schoolButton.setAttribute("aria-expanded", String(expandSchool));
        if (schoolPanel) schoolPanel.classList.toggle("open", expandSchool);
        return;
      }
      if (dropdownButton) {
        var dropdown = dropdownButton.nextElementSibling;
        var isOpen = dropdown.classList.toggle("open");
        dropdownButton.setAttribute("aria-expanded", String(isOpen));
        menu.querySelectorAll("button[aria-haspopup='true']").forEach(function (button) {
          if (button !== dropdownButton) {
            button.setAttribute("aria-expanded", "false");
            if (button.nextElementSibling) button.nextElementSibling.classList.remove("open");
          }
        });
        menu.querySelectorAll("[data-school-toggle]").forEach(function (button) {
          button.setAttribute("aria-expanded", "false");
          var panel = document.getElementById(button.getAttribute("aria-controls"));
          if (panel) panel.classList.remove("open");
        });
        return;
      }

      if (target.closest("a") && menu.classList.contains("open")) {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú principal");
      }
    });

    var desktopQuery = window.matchMedia("(min-width: 981px)");
    menu.querySelectorAll(":scope > ul > li").forEach(function (item) {
      item.addEventListener("mouseleave", function () {
        if (!desktopQuery.matches) return;
        var itemDropdown = item.querySelector(".dd");
        var itemButton = item.querySelector("button[aria-haspopup='true']");
        if (itemDropdown) itemDropdown.classList.remove("open");
        if (itemButton) itemButton.setAttribute("aria-expanded", "false");
        item.querySelectorAll("[data-school-toggle]").forEach(function (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        });
        item.querySelectorAll(".school-links.open").forEach(function (panel) {
          panel.classList.remove("open");
        });
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú principal");
        menu.querySelectorAll(".dd.open, .school-links.open").forEach(function (dropdown) { dropdown.classList.remove("open"); });
        menu.querySelectorAll("button[aria-haspopup='true'], [data-school-toggle]").forEach(function (button) { button.setAttribute("aria-expanded", "false"); });
      }
    });
  }

  var hero = document.querySelector(".hero");
  var slides = Array.from(document.querySelectorAll(".hero-slide"));
  var dots = Array.from(document.querySelectorAll(".hero-dot"));
  var heroCopy = document.querySelector(".hero-copy");
  var heroKicker = document.getElementById("hero-kicker");
  var heroTitle = document.getElementById("hero-title");
  var heroDescription = document.getElementById("hero-description");
  var slideCopy = [
    { kicker: "Ser FIEI es:", title: "Liderar el desarrollo tecnológico.", description: "#SoyFIEI" },
    { kicker: "Aquí", title: "Te preparamos para todos los futuros posibles.", description: "#SoyFIEI" },
    { kicker: "Estudiando nuestras carreras profesionales", title: "Serás el mejor a partir de tus ideas.", description: "#SoyFIEI" },
    { kicker: "Porque el mundo necesita cambios", title: "Y tú puedes cambiar el modelo.", description: "#SoyFIEI" },
    { kicker: "En la FIEI", title: "Potenciamos tus habilidades.", description: "#SoyFIEI" },
    { kicker: "FIEI · Innovación", title: "Transformamos tus ideas en innovación.", description: "#SoyFIEI" },
    { kicker: "Aquí", title: "Encontrarás aquello que te apasiona.", description: "#SoyFIEI" },
    { kicker: "Tu formación profesional", title: "Está garantizada.", description: "#SoyFIEI" }
  ];
  if (hero && slides.length && dots.length) {
    var current = 0,
      timer,
      copyTimer;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function showSlide(index, immediate) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (dot, i) {
        if (i === current) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
      var copy = slideCopy[current];
      if (copy && heroCopy && heroKicker && heroTitle && heroDescription) {
        window.clearTimeout(copyTimer);
        if (immediate) {
          heroKicker.textContent = copy.kicker;
          heroTitle.textContent = copy.title;
          heroDescription.textContent = copy.description;
          heroCopy.classList.remove("is-changing");
          return;
        }
        heroCopy.classList.add("is-changing");
        copyTimer = window.setTimeout(
          function () {
            heroKicker.textContent = copy.kicker;
            heroTitle.textContent = copy.title;
            heroDescription.textContent = copy.description;
            window.requestAnimationFrame(function () {
              heroCopy.classList.remove("is-changing");
            });
          },
          reducedMotion.matches ? 0 : 160,
        );
      }
    }
    // Sincroniza el primer texto con el carrusel inmediatamente al cargar.
    showSlide(0, true);
    function stopAuto() {
      window.clearInterval(timer);
    }
    function startAuto() {
      stopAuto();
      if (!reducedMotion.matches)
        timer = window.setInterval(function () {
          showSlide(current + 1);
        }, 5000);
    }
    hero.querySelectorAll("[data-slide]").forEach(function (control) {
      control.addEventListener("click", function () {
        var target = control.dataset.slide;
        showSlide(
          target === "next"
            ? current + 1
            : target === "previous"
              ? current - 1
              : Number(target),
        );
        startAuto();
      });
    });
    hero.addEventListener("focusin", function (event) {
      if (event.target.matches(":focus-visible")) stopAuto();
    });
    hero.addEventListener("focusout", startAuto);
    if (reducedMotion.addEventListener)
      reducedMotion.addEventListener("change", startAuto);
    startAuto();
  }
  var facultySearch = document.getElementById("faculty-search");
  var facultyRows = Array.from(document.querySelectorAll("#faculty-rows tr"));
  if (facultySearch && facultyRows.length) {
    facultySearch.addEventListener("input", function () {
      var query = facultySearch.value.trim().toLocaleLowerCase("es");
      var visibleCount = 0;
      facultyRows.forEach(function (row) {
        var matches = row.textContent.toLocaleLowerCase("es").indexOf(query) !== -1;
        row.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      var emptyMessage = document.getElementById("faculty-empty");
      if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    });
  }

  document.querySelectorAll(".department-sidebar a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.querySelectorAll(".department-sidebar a").forEach(function (item) { item.classList.remove("is-active"); });
      link.classList.add("is-active");
    });
  });

  var facultyQuickLinks = Array.from(document.querySelectorAll(".faculty-quicknav a[href^='#']"));
  var facultySections = facultyQuickLinks.map(function (link) { return document.querySelector(link.getAttribute("href")); }).filter(Boolean);
  function setFacultyActive(sectionId) {
    facultyQuickLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + sectionId) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  facultyQuickLinks.forEach(function (link) {
    link.addEventListener("click", function () { setFacultyActive(link.getAttribute("href").slice(1)); });
  });
  if (facultySections.length && "IntersectionObserver" in window) {
    var facultyObserver = new IntersectionObserver(function (entries) {
      var visibleSections = entries.filter(function (entry) { return entry.isIntersecting; }).sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (visibleSections.length) setFacultyActive(visibleSections[0].target.id);
    }, { rootMargin: "-110px 0px -58% 0px", threshold: 0 });
    facultySections.forEach(function (section) { facultyObserver.observe(section); });
  }
})();





