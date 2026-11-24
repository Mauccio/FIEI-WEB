(() => {
  const buttons = document.querySelectorAll('.course-card button');
  const availableCodes = new Set([
    '100003',
    '100375',
    '100382',
    '100387',
    '100549',
    '100550',
    '100551',
    '100552',
    '100553',
    '100555',
    '100556',
    '100557',
    '100558',
    '100560',
    '101007',
    '101008',
    '101009',
    '101011',
    '101012',
    '101020',
    '101023',
    '101030',
    '101031',
    '101040',
    '101043',
    '101061'
  ]);

  function setUnavailable(
    button,
    label,
    message = 'El sílabo todavía no está disponible',
    buttonText = 'No Disponible'
  ) {
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
    button.title = message;
    label.textContent = buttonText;
    button.style.background = '#eee8e2';
    button.style.color = '#756b63';
    button.style.cursor = 'not-allowed';
    button.onclick = null;
  }

  buttons.forEach((button) => {
    const label = button.querySelector('.btn-text');
    const code = button.dataset.code ||
      (button.getAttribute('onclick') || '').match(/toggleSyllabus\('([^']+)'/)?.[1];
    if (!label) return;

    if (code && availableCodes.has(code)) {
      button.disabled = false;
      button.removeAttribute('aria-disabled');
      button.title = 'Abrir sílabo';
      label.textContent = 'Ver Sílabo';
      button.style.background = '#7A1C30';
      button.style.color = '#ffffff';
      button.style.cursor = 'pointer';
    } else {
      setUnavailable(button, label);
    }
  });
})();
