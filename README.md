# Petfinder

Front de una app para reportar mascotas perdidas, hecho con React y TypeScript.

## Webapp

https://petfinder-pget.onrender.com

> La API está en un plan gratuito y se duerme cuando nadie la usa. La primera acción
> (por ejemplo, iniciar sesión) puede tardar cerca de un minuto en responder.

## Funcionalidades

- Ver mascotas perdidas cerca de tu ubicación y avisar si viste una.
- Registro e inicio de sesión.
- Reportar una mascota con foto y ubicación en el mapa.
- Ver, editar, marcar como encontradas y eliminar tus mascotas reportadas.

## Tecnologías

React, TypeScript, React Router, Recoil, css-modules, webpack y react-map-gl con MapLibre.

## Estructura del proyecto

- `src/index.tsx`: inicializa la app y monta el router.
- `src/router`: configuración de las rutas.
- `src/pages`: un componente por cada ruta.
- `src/components`: partes funcionales de la app (header, menú, formularios, tarjetas).
- `src/ui`: componentes básicos (botón, campo de texto, textos, mapa, selector de foto).
- `src/hooks`: custom hooks que usan Recoil y acceden a los datos.
- `src/lib`: llamadas a la API.

## Cómo correrlo en tu compu

    npm install
    npm run dev

Para generar la versión de producción: `npm run build`.

## API

El backend está en otro repositorio: https://github.com/Ema9812/pet-finder