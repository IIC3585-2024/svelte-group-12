<script>
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let city = {};
  export let hotEvents = writable([]);

  const fetchCityData = async (slug) => {
    try {
      const response = await fetch(`http://52.2.71.125:8000/cities/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch city data');
      }
      return await response.json();
    } catch (error) {
      console.error("Error loading city data:", error);
      return {};
    }
  };

  const fetchEventsData = async (cityId) => {
    try {
      const response = await fetch(`http://52.2.71.125:8000/events/?city_id=${cityId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events data');
      }
      return await response.json();
    } catch (error) {
      console.error("Error loading events data:", error);
      return [];
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await fetch('http://52.2.71.125:8000/events/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error('Failed to add event');
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  onMount(async () => {
    const slug = window.location.pathname.split('/').pop();
    const cityData = await fetchCityData(slug);
    const eventsData = await fetchEventsData(cityData.id);

    city = cityData;
    hotEvents.set(eventsData);
  });

  let newEvent = {
    name: '',
    image: 'https://via.placeholder.com/150',
    sector: '',
    address: '',
    phone: '',
    email: '',
    additional_info: '',
    city_id: city.id,
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    newEvent.city_id = city.id;
    const addedEvent = await addEvent(newEvent);
    if (addedEvent) {
      hotEvents.update(events => [...events, addedEvent]);
      newEvent = {
        name: '',
        image: 'https://via.placeholder.com/150',
        sector: '',
        address: '',
        phone: '',
        email: '',
        additional_info: '',
        city_id: city.id,
      };
    }
  };
</script>

<svelte:head>
  <title>Cities</title>
  <meta name="description" content="Cities" />
</svelte:head>

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
        {#each $hotEvents as event (event.id)}
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
  </div>
</div>
<form on:submit={handleFormSubmit}>
  <div>
    <label>
      Nombre del Evento:
      <input type="text" bind:value={newEvent.name} required />
    </label>
  </div>
  <div>
    <label>
      Sector:
      <input type="text" bind:value={newEvent.sector} required />
    </label>
  </div>
  <div>
    <label>
      Dirección:
      <input type="text" bind:value={newEvent.address} required />
    </label>
  </div>
  <div>
    <label>
      Teléfono:
      <input type="text" bind:value={newEvent.phone} required />
    </label>
  </div>
  <div>
    <label>
      Correo Electrónico:
      <input type="email" bind:value={newEvent.email} required />
    </label>
  </div>
  <div>
    <label>
      Información Adicional:
      <textarea bind:value={newEvent.additional_info} required></textarea>
    </label>
  </div>
  <div>
    <button type="submit">Agregar Evento</button>
  </div>
</form>


<style>
  form {
    margin-top: 2rem;
    padding: 2rem;
    background-color: #f7f7f7;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  label {
    display: block;
    margin-bottom: 1rem;
  }

  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-top: 1rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #45a049;
  }
</style>
