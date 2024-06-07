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
          </div>
        </div>
      </div>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
  <div class="hot-trends w-full md:w-auto">
    <div class="hot-events" in:fly={{ delay: 500, duration: 1000, y: 100 }}>
      <h1 class="text-xl w-full">Eventos Destacados dentro de la ciudad:</h1>
      <div class="space-y-6 border-l-2 border-dashed">
        {#each $hotEvents as event (event.id)}
          <div class="event-card relative w-full hover:bg-gray-100">
            <a href="/events/{event.id}">
              <div class="event-content ml-6">
                <h4 class="font-bold text-green-500">{event.name}</h4>
                <span class="event-sector inline-flex items-center mt-2 px-3 py-2 rounded-full text-xs bg-green-100 text-green-400">{event.sector}</span>
              </div>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
<h1>Agregar un Evento:</h1>
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

  .hot-events {
    margin: 2rem 0;
  }

  .event-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s ease-in-out;
  }

  .event-card:hover {
    background-color: #edf2f7;
  }

  .event-content {
    padding: 1rem;
  }

  .event-sector {
    background-color: #c6f6d5;
    color: #2f855a;
  }
</style>
