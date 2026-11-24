# FIEI + SISCAD

Proyecto de modernización del sitio web de la Facultad de Ingeniería Electrónica e Informática (FIEI) y prototipo de su aula virtual SISCAD.

## Contenido

- Sitio institucional de FIEI: página principal, facultad, escuelas, departamento académico, oficinas, noticias y directivas.
- Aula virtual SISCAD: interfaces de estudiante, docente y administración.
- `aulavirtual-tic/`: versión simplificada para la presentación del curso de TIC.
- `NetlifyFIEI/`: copia visual estática para pruebas de publicación.

## Backend de SISCAD

El backend de pruebas está en `aulavirtual/backend/` y utiliza Node.js y SQLite. La base de datos local se crea al ejecutar el servidor y se mantiene fuera del repositorio.

Consulta las instrucciones de instalación y ejecución en `aulavirtual/backend/README.md`.

> Este proyecto es un prototipo académico independiente. No es un sistema oficial de la UNFV ni debe usarse con datos personales reales.

## Versión portátil FIEI-TIC

Esta copia no usa Node.js, npm ni SQLite. Todo el aula virtual funciona con datos simulados
guardados en el navegador mediante `localStorage` y `sessionStorage`.

1. Abre `index.html` para entrar al sitio institucional.
2. Usa el enlace de SISCAD o abre `aulavirtual/login/index.html`.
3. Para presentar los perfiles, utiliza estas cuentas:

| Rol | Código | Contraseña |
|---|---|---|
| Estudiante | `2025024891` | `SiscadDemo2026!` |
| Docente | `9000000001` | `SiscadDemo2026!` |
| Administración | `9000000002` | `SiscadDemo2026!` |
