<script context="module">
  import { goto } from '$app/navigation';

  export async function fetchData({ page, fetch }) {
    const { slug } = page.params;

    try {
      const cityData = await fetchCityData(slug, fetch);
      const eventsData = await fetchEventsData(fetch);

      return {
        props: {
          city: cityData || {},
          hotEvents: eventsData || []
        }
      };
    } catch (error) {
      console.error("Error loading data:", error);
      return {
        props: {
          city: {},
          hotEvents: []
        }
      };
    }
  }

  async function fetchCityData(slug, fetch) {
    const response = await fetch(`http://52.2.71.125:8000/cities/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch city data');
    }
    return await response.json();
  }

  async function fetchEventsData(fetch) {
    const response = await fetch(`http://52.2.71.125:8000/events/`);
    if (!response.ok) {
      throw new Error('Failed to fetch events data');
    }
    return await response.json();
  }
</script>

<svelte:head>
  <title>Cities</title>
  <meta name="description" content="Cities" />
</svelte:head>

<script>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let city = {};
  export let hotEvents = [];

  onMount(async () => {
    // Aquí puedes añadir lógica que se ejecuta cuando el componente se monta
  });
</script>

<div class="main-container">
  {#if city && city.name}
    <h1 class="mb-10 pl-10">{city.name}</h1>
    <div class="main-info flex flex-col md:flex-row">
      <div class="px-10 py-16 mx-auto sm:max-w-xl md:max-w-full">
        <div class="grid gap-24 row-gap-8 lg:grid-cols-5">
          <div class="grid gap-8 lg:col-span-2" in:fly={{ x: -100, duration: 1000 }}>
            <div>
              <p class="mb-2 text-lg font-bold text-green-500">Al aire libre</p>
              <p class="text-gray-700">{city.description}</p>
            </div>
            <div>
              <p class="mb-2 text-lg font-bold text-green-500">Curiosidad</p>
              <p class="text-green-700">
                Sabías que {city.name} es la capital de {city.country} y una de las ciudades más grandes de América Latina.
              </p>
            </div>
          </div>
          <div class="grid border divide-y rounded lg:col-span-3 sm:grid-cols-2 sm:divide-y-0 sm:divide-x" in:fly={{ x: 100, duration: 1000, delay: 500 }}>
            <div class="flex flex-col justify-between p-10">
              <div>
                <p class="text-lg font-semibold text-green-600 sm:text-base">Población</p>
                <p class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">{city.population} M</p>
              </div>
              <div>
                <p class="text-lg font-semibold text-green-600 sm:text-base">Comunas</p>
                <p class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">{city.sectors}</p>
              </div>
              <div>
                <p class="text-lg font-semibold text-green-600 sm:text-base">Superficie</p>
                <p class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">{city.area} km²</p>
              </div>
            </div>
            <div class="flex flex-col justify-between p-10">
              <div>
                <p class="text-lg font-semibold text-green-600 sm:text-base">Cerros</p>
                <p class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">{city.hills}</p>
              </div>
              <div>
                <p class="text-lg font-semibold text-green-600 sm:text-base">Parques</p>
                <p class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">{city.parks}</p>
              </div>
              <div>
                <p class="text-lg font-semibold text-green-600 sm:text-base">Museos</p>
                <p class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl">{city.museums}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
  <div class="hot-trends w-full md:w-auto">
    <div class="hot-events" in:fly={{ delay: 500, duration: 1000, y: 100 }}>
      <h1 class="text-xl w-full">Lo más buscado</h1>
      <div class="space-y-6 border-l-2 border-dashed">
        {#each hotEvents as event}
          <div class="relative w-full hover:bg-gray-100">
            <a href="/events/{event.id}">
              <div class="ml-6">
                <h4 class="font-bold text-green-500">{event.name}</h4>
                <p class="mt-2 max-w-screen-sm text-sm text-gray-500">{event.description}</p>
                <span class="inline-flex items-center mt-2 px-3 py-2 rounded-full text-xs bg-green-100 text-green-400">{event.sector}</span>
              </div>
            </a>
          </div>
        {/each}
      </div>
    </div>
    <div class="park-events" in:fly={{ delay: 1000, duration: 1000, y: 100 }}>
      <h1 class="text-xl w-full">Parques</h1>
      <div class="space-y-6 border-l-2 border-dashed">
        {#each hotEvents as event}
          <div class="relative w-full hover:bg-gray-100">
            <div class="ml-6">
              <h4 class="font-bold text-green-500">{event.name}</h4>
              <p class="mt-2 max-w-screen-sm text-sm text-gray-500">{event.description}</p>
              <span class="inline-flex items-center mt-2 px-3 py-2 rounded-full text-xs bg-green-100 text-green-400">{event.sector}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="hill-events" in:fly={{ delay: 1000, duration: 1000, y: 100 }}>
      <h1 class="text-xl w-full">Cerros</h1>
      <div class="space-y-6 border-l-2 border-dashed">
        {#each hotEvents as event}
          <div class="relative w-full hover:bg-gray-100">
            <div class="ml-6">
              <h4 class="font-bold text-green-500">{event.name}</h4>
              <p class="mt-2 max-w-screen-sm text-sm text-gray-500">{event.description}</p>
              <span class="inline-flex items-center mt-2 px-3 py-2 rounded-full text-xs bg-green-100 text-green-400">{event.sector}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
    <div class="all-events" in:fly={{ delay: 1000, duration: 1000, y: 100 }}>
      <h1 class="text-xl w-full">Todos los eventos</h1>
      <div class="space-y-6 border-l-2 border-dashed">
        {#each hotEvents as event}
          <div class="relative w-full hover:bg-gray-100">
            <div class="ml-6">
              <h4 class="font-bold text-green-500">{event.name}</h4>
              <p class="mt-2 max-w-screen-sm text-sm text-gray-500">{event.description}</p>
              <span class="inline-flex items-center mt-2 px-3 py-2 rounded-full text-xs bg-green-100 text-green-400">{event.sector}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
<style>
  .video {
    display: flex;
    justify-content: center;
    margin-bottom: 15%;
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
  .hot-trends {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 10%;
    padding-right: 10%;
  }
  .hot-events, .park-events, .hill-events, .all-events {
    display: flex;
    flex-direction: column;
    padding-left: 5%;
    padding-right: 5%;
    width: 100%;
  }
</style>
