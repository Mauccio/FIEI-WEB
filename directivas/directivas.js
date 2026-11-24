(function () {
  var buttons = Array.from(document.querySelectorAll("[data-document]"));
  var viewer = document.getElementById("pdf-viewer-container");
  var viewerTitle = document.getElementById("pdf-viewer-title");
  var iframe = document.getElementById("pdf-iframe");
  var downloadLink = document.getElementById("pdf-download");
  var closeButton = document.getElementById("close-document");
  var activeButton = null;

  function closeDocument() {
    if (!activeButton) return;
    activeButton.setAttribute("aria-expanded", "false");
    activeButton.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Ver documento';
    activeButton = null;
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    window.setTimeout(function () {
      if (!viewer.classList.contains("is-open")) iframe.src = "about:blank";
    }, 350);
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (activeButton === button) {
        closeDocument();
        return;
      }
      if (activeButton) {
        activeButton.setAttribute("aria-expanded", "false");
        activeButton.innerHTML = '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Ver documento';
      }
      activeButton = button;
      activeButton.setAttribute("aria-expanded", "true");
      activeButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i> Cerrar documento';
      viewerTitle.textContent = button.dataset.title;
      iframe.src = button.dataset.document;
      downloadLink.href = button.dataset.document;
      viewer.classList.add("is-open");
      viewer.setAttribute("aria-hidden", "false");
      viewer.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  closeButton.addEventListener("click", closeDocument);
})();
