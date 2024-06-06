<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	type Flight = {
		id: number;
		created_at: string;
		departure_airport: { name: string; id: string; time: string };
		arrival_airport: { name: string; id: string; time: string };
		price: number;
		duration: number;
	};

	// Create writable stores to hold the flight data and loading state
	const flights = writable<Flight[]>([]);
	const isLoading = writable<boolean>(true);

	const fetchFlights = async () => {
		try {
			const response = await fetch(`https://api.arkairlines.me/flights/`);
			if (!response.ok) {
				throw new Error('Failed to fetch flight data');
			}
			const flightData = await response.json();
			console.log(flightData); // Verificar la estructura de los datos
			if (Array.isArray(flightData.results)) {
				flights.set(flightData.results as Flight[]);
			} else {
				throw new Error('Flight data is not an array');
			}
		} catch (error) {
			console.error(error);
		} finally {
			isLoading.set(false); // Set loading state to false when fetch completes
		}
	};

	onMount(() => {
		fetchFlights();
	});
</script>

{#if $isLoading}
	<!-- Loading indicator -->
	<div>Loading...</div>
{:else}
	<section class="py-8 antialiased">
		<div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
			<div class="flights-container">
				<div class="flights-title" in:fade={{ duration: 1500 }}>
					<h1 class="title">Vuelos</h1>
					<p>Descubre los vuelos disponibles</p>
				</div>
				<div class="sm:mx-6 px-4 sm:px-8 py-4 overflow-x-auto">
					<div class="min-w-full shadow rounded-lg overflow-hidden">
						<table class="min-w-full leading-normal" in:fly={{ y: 200, duration: 1000 }}>
							<thead>
								<tr>
									<th class="px-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Aerolínea
									</th>
									<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Salida
									</th>
									<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Llegada
									</th>
									<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Precio
									</th>
									<th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
										Duración
									</th>
								</tr>
							</thead>
							<tbody>
								{#each $flights as flight}
									<tr class="hover:bg-gray-100">
										<td class="px-10 py-5 border-b border-gray-200 text-sm">
											<div class="flex items-center">
												<div class="flex-shrink-0 w-10 h-10">
													<img class="w-full h-full rounded-full" src="{flight.airline_logo}" alt="{flight.airline}" />
												</div>
												<div class="ml-3">
													<p class="text-gray-900 whitespace-no-wrap">
														{flight.airline}
													</p>
												</div>
											</div>
										</td>
										<td class="px-5 py-5 border-b border-gray-200 text-sm">
											<p class="text-gray-900 whitespace-no-wrap">{flight.departure_airport.name} ({flight.departure_airport.id})</p>
											<p class="text-gray-600 whitespace-no-wrap">{flight.departure_airport.time}</p>
										</td>
										<td class="px-5 py-5 border-b border-gray-200 text-sm">
											<p class="text-gray-900 whitespace-no-wrap">{flight.arrival_airport.name} ({flight.arrival_airport.id})</p>
											<p class="text-gray-600 whitespace-no-wrap">{flight.arrival_airport.time}</p>
										</td>
										<td class="px-5 py-5 border-b border-gray-200 text-sm">
											<p class="text-gray-900 whitespace-no-wrap">{flight.price} $</p>
										</td>
										<td class="px-5 py-5 border-b border-gray-200 text-sm">
											<p class="text-gray-900 whitespace-no-wrap">{Math.floor(flight.duration / 60)}h {flight.duration % 60}m</p>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

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
