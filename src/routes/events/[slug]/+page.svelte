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
// @ts-nocheck
  import Map from '$lib/Map.svelte'; 
  import { calculateRatingFromReviews, ratingCategory } from '/src/utilities/ratings.js';
  import { fly, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { writable } from 'svelte/store';
  

  function toggleDescription(id) {
    openDescriptions.update(openDescs => {
      if (openDescs.has(id)) {
        openDescs.delete(id);
      } else {
        openDescs.add(id);
      }
      return new Set(openDescs);
    });
  }
  
  const event = {
    name: 'Cerro Metropolitano',
    city: 'Santiago',
    sector: 'Providencia'
  };
  
  const indicators = [
    { name: 'Recorrido', value: '4.0', reviews: 73 },
    { name: 'Ubicación', value: '1.0', reviews: 80 },
    { name: 'Disponibilidad', value: '4.5', reviews: 150 }
  ];

  const descriptions = [
    {
      id: 0,
      name: "Duración",
      value: "2 horas",
      icon: "clock"
    },
    {
      id: 1,
      name: "Precio",
      value: "Gratis",
      icon: "coin"
    },
    {
      id: 2,
      name: "Horario",
      value: "9:00 - 18:00, Todos los días",
      icon: "calendar"
    },
    {
      id: 3,
      name: "Recomendaciones",
      value: "Llevar agua",
      icon: "thumbs-up"
    }
  ]
  
  const comments = [
    {
      name: 'Tania Andrew',
      role: 'Lead Frontend Developer',
      message: 'This is an excellent product, \
      the documentation is excellent and helped\
      me get things done more efficiently.',
      rating: 5
    },
    {
      name: 'Tania Andrew',
      role: 'Lead Frontend Developer',
      message: 'This is an excellent product, \
      the documentation is excellent and helped\
      me get things done more efficiently.',
      rating: 5
    },
    {
      name: 'Tania Andrew',
      role: 'Lead Frontend Developer',
      message: 'This is an excellent product, \
      the documentation is excellent and helped\
      me get things done more efficiently.',
      rating: 5
    }
  ];
  
  const openDescriptions = writable(new Set());
  let totalRating = calculateRatingFromReviews(indicators);
  let ratingCtg = ratingCategory(totalRating);
</script>


<div class="main-container">
  <div class="main-info">
    <div class="indicators" in:fly={{ x:100, duration: 1000 }}>
      <div class="mb-10 pl-10">
        <h1>{event.name}</h1>
        <p>{event.city}, {event.sector}</p>
      </div>
      <div class="flex items-center mb-5 px-10">
        <p class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-3 rounded dark:bg-blue-200 dark:text-blue-800">{totalRating}</p>
        <p class="ml-3 font-medium text-gray-900 dark:text-white">{ratingCtg}</p>
      </div>
      {#each indicators as indicator}
        <div class="flex items-center pl-10" in:fly={{ x:100, duration: 1000 }}>
          <h2>{indicator.name}</h2>
          <div class="grid w-full overflow-x-hidden rounded-lg p-6 lg:overflow-visible">
            <div class="flex items-center gap-2 font-bold text-blue-gray-500">
              {indicator.value}
              <div class="inline-flex items-center">
                {#each Array.from({ length: 5 }) as _, i}
                  {#if i + 1 <= +indicator.value}
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="lightblue" class="w-6 h-6">
                        <path
                          d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z">
                        </path>
                      </svg>
                    </span>
                  {:else if i + 1 > +indicator.value}
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightblue"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z">
                        </path>
                      </svg>
                    </span>
                  {/if}
                {/each}
              </div>
              <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
                {indicator.reviews} Reviews
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="descriptions" in:fly={{ y:100, delay: 500, duration: 1000 }}>
      <div class="descriptions-content">
        <h2 class="p-4">Información de utilidad</h2>
        {#each descriptions as description (description.id)}
          <div class="description-item" animate:flip={{ duration: 200, easing: quintOut }}>
            <button class="accordion" on:click={() => toggleDescription(description.id)}>
              <div class="accordion-title">
                <div class="flex items-center">
                  <img src={`/src/lib/icons/descriptions/${description.icon}.png`} alt="Icon" class="w-6 h-6" />
                  <p class="ml-2">{description.name}</p>
                </div>
              </div>
              <span class="accordion-icon">
                <img src={$openDescriptions.has(description.id) ? '/src/lib/icons/minus.svg' : '/src/lib/icons/plus.svg'} alt="Toggle" class="w-6 h-6" />
              </span>
            </button>
            {#if $openDescriptions.has(description.id)}
              <div class="description">
                <p>{description.value}</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="flex w-full justify-center">
    <Map lng={-70.633156} lat={-33.424427} zoom={14}/>
  </div>
  <div class="flex w-full mb-20" in:fly={{ x:-100, delay:1000, duration: 1000 }}>
    {#each comments as comment}
      <div class="flex flex-col items-center px-8 text-center">
        <h2 class="w-1/2 mb-6 block font-sans text-xl sm:text-xs font-small leading-[1.3] tracking-normal text-blue-gray-900 antialiased">
          "{comment.message}"
        </h2>
        <img
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
          alt="image"
          class="relative inline-block h-10 w-10 rounded-full object-cover object-center "
        />
        <h6 class="block mt-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          {comment.name}
        </h6>
        <p class="block mb-4 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          {comment.role}
        </p>
        <div class="inline-flex items-center">
          {#each Array.from({ length: comment.rating }) as _, i}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-yellow-700 cursor-pointer"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1% 0;
  }
  .main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1% 0;
  }
  .indicators {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .descriptions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10% 0;
    width: 100%;
  }
  .descriptions-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 1%;
    width: 80%;
    border-radius: 2%;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  }
  .description-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .description {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
  }
  .accordion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #e9e9e9;
    border-radius: 5px;
    margin: 5px 0;
  }
  @media (min-width: 768px) {
    .main-info {
      flex-direction: row;
      margin: 2% 0 4% 0;
      width: 100%;
    }
    .indicators {
      width: 50%;
    } 
    .descriptions {
      width: 50%;
      margin: 5% 0;
    }
  }
</style>