# Sitio FIEI: organización de páginas

## Recursos compartidos
- `index.html`: portada principal.
- `css/main.css`: estilos compartidos del sitio, menú, pie de página y páginas internas.
- `js/script.js`: genera el encabezado, el menú de escuelas, el pie de página y las interacciones compartidas.
- `img/`: logotipos y banners generales.

## Páginas de las escuelas
Cada subpágina vive en `escuelas/<escuela>/<sección>/index.html` y enlaza los recursos compartidos con rutas relativas. No se duplican CSS, JavaScript ni logotipos.

Las imágenes exclusivas de una subpágina pueden guardarse en su carpeta local `img/`. Las imágenes comunes deben permanecer en la carpeta raíz `img/`.

Las escuelas son `epie` (Electrónica), `epii` (Informática), `epim` (Mecatrónica) y `epit` (Telecomunicaciones). Cada una cuenta con perfil profesional, campo laboral, plan curricular, malla curricular y sílabos.
