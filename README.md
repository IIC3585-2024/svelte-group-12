
# GRUPO 12 - OUTDOORLIFE | SVELTE

## Miembros

- Cristóbal Pérez-Cotapos
- Sebastián Cavagnaro
- Benjamín Vásquez

## Correr en ambiente local

```bash

npm install; npm run dev

# o si se desea también abrir en el navegador
npm install; npm run dev -- --open
```

## Para buildear la aplicación

```bash
npm run build
```

## Consideraciones

- La aplicación se centro principalmente en las componentes visuales, es expositiva, pero cuenta con una
API externa creada por nosotros de la cual se alimenta para servir la gran parte de la información.
- El Navbar cuenta con tres links, uno para el Home, otro para la sección de "about", y por último un menú de categorías.
- El mapa al interior de la vista de evento, es interactivo, y muestra la ubicación del evento en cuestión. Pero nos faltó
incluir dentro de los datos de la API la latitud y longitud de los eventos, por lo que no se muestra otro lugar que no sea
el Cerro Metropolitano.
- Hay algunas ciudades del Home sin eventos: Valparíso, Curicó.
- La sección de INFORMACION de los eventos no es específica de cada evento, es consumida por la API, pero no se utiliza para todos los eventos. No así la sección de información al costado del mapa, esa sí corresponde al evento en particular.

## Vistas
- `/`: las imágenes al clickearlas llevan al link con la información de los eventos de la ciudad, además te da la posibilidad de crear un evento para dicha ciudad.
- `/about`: es una sección expositiva de la página.
- `/topics`: sección que muestra hasta 6 categorías distintas. La primera de ellas es el foro, donde pensabamos incluir
chatrooms de discusión (esto sí se implementó en VUE). La segunda, es un buscador de ciudades, tiene un prellenado de
y te redirige a la ciudad que desees visitar.
- `/blogs`: sección que muestra los blogs de la página, aquí se pensaba implementar los chatrooms, es una página estática.
- `/cities`: sección del buscador de ciudades.
- `/cities/:city_name`: sección de la ciudad, aquí se muestra la información de la ciudad, los eventos, y la posibilidad de crear un evento. 
- `/events/:event_id`: sección de un evento en particular, aquí se muestra la información del evento, ubicación y la posibilidad de crear comentarios en él.

## Componentes
- `Caroussel`: componente que muestra las imágenes de la ciudad en el Home. Fue adaptado de una página de componentes en CSS puro.
- `Footer`: corresponde al barra de navegación de la página.
- `Map`: se encuentra dentro de lib, por problemas de ruteo (no encontraba nunca el componente si estaba dentro de la carpeta de componentes), se utilizó Maptiler (librería + API Externa) para el mapa, y se adaptó a Svelte.
- Algunas imágenes como íconos, o imágenes de fondo, fueron sacadas de la página de [Flaticon](https://www.flaticon.com/), y [Unsplash](https://unsplash.com/).