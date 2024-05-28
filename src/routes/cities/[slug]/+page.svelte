<!-- <script context="module">
// @ts-ignore
  export async function load({ page, fetch }) {
    const { slug } = page.params;
    // Aquí puedes cargar los datos del lugar basado en el slug
    // Por ejemplo, podrías hacer una solicitud a una API
    const res = await fetch(`api/url/${slug}`);
    const data = await res.json();

    return {
      props: {
        place: data
      }
    };
  }
</script> -->

<script>
  import { fly } from 'svelte/transition';

  const city = {
    name: 'Santiago',
    country: 'Chile',
    description: 'Descripción del lugar'
  };

  let main_events = [
    { name: 'Evento 1', description: 'Descripción del evento 1', sector: 'Sector 1' },
    { name: 'Evento 2', description: 'Descripción del evento 2', sector: 'Sector 2' },
    { name: 'Evento 3', description: 'Descripción del evento 3', sector: 'Sector 3' }
  ];

  let hot_events = [
    { name: 'Evento 1', description: 'Descripción del evento 1', sector: 'Sector 1' },
    { name: 'Evento 2', description: 'Descripción del evento 2', sector: 'Sector 2' },
    { name: 'Evento 3', description: 'Descripción del evento 3', sector: 'Sector 3' }
  ];
</script>

<div class="main-container">
  <h1 class="mb-10 pl-10">{city.name}</h1>
  <div class="main-info flex flex-col md:flex-row ">
    <div class="city-info md:w-auto w-full">
      <div class="city-description" in:fly={{ duration:1000, y:100 }}>
        <h1 class="text-xl w-full flex-grow">Lo más buscado</h1>
        <div class="space-y-6 border-l-2 border-dashed">
          {#each main_events as event}
            <div class="relative w-full pr-8 hover:bg-gray-100">
              <div class="ml-6">
                <h4 class="font-bold text-blue-500">{event.name}</h4>
                <p class="mt-2 max-w-screen-sm text-sm text-gray-500">{event.description}</p>
                <span class="inline-flex items-center mt-2 px-3 py-2 rounded-full text-xs bg-blue-100 text-blue-400">
                  {event.sector}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div>
        <img class="map-image" src="https://picsum.photos/200/300" alt="Mapa de la ciudad">
      </div>
    </div>
    <div class="hot-trends w-full md:w-auto">
      <div class="hot-events" in:fly={{ delay:500, duration:1000, y:100 }}>
        <h1 class="text-xl w-full flex-grow">Lo más buscado</h1>
        <div class="space-y-6 border-l-2 border-dashed">
          {#each hot_events as event}
            <div class="relative w-full hover:bg-gray-100">
              <div class="ml-6">
                <h4 class="font-bold text-green-500">{event.name}</h4>
                <p class="mt-2 max-w-screen-sm text-sm text-gray-500">{event.description}</p>
                <span class="inline-flex items-center mt-2 px-3 py-2 rounded-full text-xs bg-green-100 text-green-400">
                  {event.sector}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div class="late-events" in:fly={{ delay:1000, duration:1000, y:100 }}>
        <h1 class="text-xl w-full flex-grow">Lo último</h1>
        <div class="space-y-6 border-l-2 border-dashed">
          {#each main_events as event}
            <div class="relative w-full hover:bg-gray-100">
              <div class="ml-6">
                <h4 class="font-bold text-green-500">{event.name}</h4>
                <p class="mt-2 max-w-screen-sm text-sm text-gray-500">{event.description}</p>
                <span class="inline-flex items-center mt-2 px-3 py-2 rounded-full text-xs bg-green-100 text-green-400">
                  {event.sector}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>
  </div>
  </div>
  <div class="video" in:fly={{ x:100, delay:1000, duration:2000 }}>
    <iframe 
      class="shadow-lg rounded-lg" 
      src="https://www.youtube.com/embed/4ppmoxk2HT4" 
      title="The Best Way to Play 1.20.1" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
    </iframe>
  </div>
</div>

<style>
  .video {
    display: flex;
    justify-content: center;
    margin: 4% 0;
  }
  iframe {
    height: calc(9/16 * 70vw);
    width: 70vw;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    padding-top: 3%;
    width: 100%;
    height: 100%;
  }
  .main-info {
    display: flex;
    width: 100%;
  }
  .city-info {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
  .city-description {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
  .hot-trends {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10%;
    margin-bottom: 20%;
  }
  .hot-events {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    margin-left: 20px;
    width: 50%;
  }
  .late-events {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    margin-left: 20px;
    width: 50%;
  }
  .map-image {
    min-width: 200px;
    max-height: 400px;
    height: 100%;
  }
  @media (min-width: 768px) {
  .city-info {
    width: 50%;
  }
  .hot-trends {
    width: 50%;
    margin: 0;
  }
}
</style>