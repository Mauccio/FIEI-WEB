(function () {
  var pageHeading = document.querySelector("#contenido-principal h1");
  var pageLead = document.querySelector("#contenido-principal .page-lead");
  var description = document.querySelector('meta[name="description"]');

  if (pageHeading && pageHeading.textContent.trim()) {
    document.title = pageHeading.textContent.trim() + " | FIEI – UNFV";
  }
  if (pageLead && description) {
    description.setAttribute("content", pageLead.textContent.trim());
  }

  var menu = document.getElementById("menu");
  var menuButton = document.getElementById("menu-btn");
  if (!menu || !menuButton) return;

  menuButton.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", function (event) {
    var dropdownButton = event.target.closest("button[aria-haspopup='true']");
    if (dropdownButton) {
      var dropdown = dropdownButton.nextElementSibling;
      var isOpen = dropdown.classList.toggle("open");
      dropdownButton.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    if (event.target.closest("a") && menu.classList.contains("open")) {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
})();
