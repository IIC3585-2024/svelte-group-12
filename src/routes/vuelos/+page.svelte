<!-- <script context="module">
  // @ts-ignore
  export async function load({ fetch }) {
    // Solicitud a la API para obtener datos de vuelos
    const res = await fetch(`https://api.arkairlines.me/flights/`);
    const data = await res.json();

    return {
      props: {
        flights: data
      }
    };
  }
</script> -->

<svelte:head>
  <title>Vuelos</title>
  <meta name="description" content="Información de Vuelos" />
</svelte:head>

<script>
  import { fade, fly } from 'svelte/transition'

  let flights = await

</script>

<div class="flights-container">
  <div class="flights-title" in:fade={{ duration:1500 }}>
    <h1 class="title">Vuelos</h1>
    <p>descubre los vuelos disponibles</p>
  </div>  
  <div class="sm:mx-6 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal" in:fly={{ y:200, duration:1000 }}>
            <thead>
                <tr>
                    <th
                        class="px-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Aerolínea
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Salida
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Llegada
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Precio
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Duración
                    </th>
                </tr>
            </thead>
            <tbody>
              {#each flights as flight, i}
                <tr class="hover:bg-gray-100">
                  <td class="px-10 py-5 border-b border-gray-200 text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                          <img class="w-full h-full rounded-full" src="{flight.airline_logo}" alt="{flight.airline}" />
                      </div>
                      <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                              { flight.airline }
                          </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{ flight.departure_airport.name } ({ flight.departure_airport.id })</p>
                    <p class="text-gray-600 whitespace-no-wrap">{ flight.departure_airport.time }</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{ flight.arrival_airport.name } ({ flight.arrival_airport.id })</p>
                    <p class="text-gray-600 whitespace-no-wrap">{ flight.arrival_airport.time }</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{ flight.price } $</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{ Math.floor(flight.duration / 60) }h { flight.duration % 60 }m</p>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
    </div>
  </div>
</div>

<style>
  .flights-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    width: 100%;
    height: 100%;
  }
  .flights-title {
    display: flex;
    flex-direction: column;
    margin: 20px 0 20px 60px;
  }
</style>
