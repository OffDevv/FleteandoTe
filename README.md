# FleteandoTe

Este repo tiene dos proyectos separados:

- La app Expo vive en la raíz.
- La API Node/Express vive en `backend/`.

## Comandos

### App móvil

```bash
npm start
```

### Backend

```bash
npm --prefix backend run dev
```

## Instalación

Instala dependencias en la raíz y en el backend por separado:

```bash
npm install
npm --prefix backend install
```

## Estructura

- `app/` contiene pantallas, componentes y navegación de la app.
- `backend/src/` contiene la API y la conexión a base de datos.