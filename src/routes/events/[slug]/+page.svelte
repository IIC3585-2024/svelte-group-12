<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Map from '$lib/Map.svelte';
  import { calculateRatingFromReviews, ratingCategory } from '/src/utilities/ratings.js';
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';

  const event = writable({});
  const indicators = writable([]);
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
  const comments = writable([]);
  const openDescriptions = writable(new Set());
  const newComment = writable({ message: '', rating: 0 });

  const fetchEventData = async (id) => {
    try {
      const res = await fetch(`http://52.2.71.125:8000/events/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch event data');
      }
      return await res.json();
    } catch (error) {
      console.error("Error loading event data:", error);
      return {};
    }
  };

  const fetchIndicatorsData = async (eventId) => {
    try {
      const res = await fetch(`http://52.2.71.125:8000/indicators/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const indicators = await res.json();
      return indicators
    } catch (error) {
      console.error("Error fetching indicators:", error);
      return [];
    }
  };

  const postComment = async (comment) => {
    try {
      const res = await fetch('http://52.2.71.125:8000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      if (!res.ok) {
        throw new Error('Failed to post comment');
      }
      return await res.json();
    } catch (error) {
      console.error("Error posting comment:", error);
      return null;
    }
  };

  const fetchComments = async (id) => {
    try {
      const res = await fetch(`http://52.2.71.125:8000/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const comments = await res.json();
      return comments.filter((comment) => comment.event_id === id);
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  onMount(async () => {
    const id = window.location.pathname.split('/').pop();
    const data = await fetchEventData(id);
    const indicatorsData = await fetchIndicatorsData(id);
    const commentsData = await fetchComments(id);

    event.set(data);
    indicators.set(indicatorsData || []);
    comments.set(commentsData || []);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = window.location.pathname.split('/').pop();
    const commentData = { ...$newComment, event_id: id };
    const postedComment = await postComment(commentData);
    if (postedComment) {
      comments.update((existingComments) => [...existingComments, postedComment]);
      newComment.set({ message: '', rating: 0 });
    }
  };

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
</script>

<svelte:head>
  <title>{`Evento - ${$event.name || 'Cargando...'}`}</title>
  <meta name="description" content="Detalle del evento" />
</svelte:head>

<div class="main-container">
  <div class="main-info">
    <div class="indicators" in:fly={{ x:100, duration: 1000 }}>
      <div class="mb-10 pl-10">
        <h1>{$event.name}</h1>
        <p>{$event.sector}</p>
      </div>
      {#each $indicators as indicator}
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
                  {:else}
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightblue" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z">
                        </path>
                      </svg>
                    </span>
                  {/if}
                {/each}
              </div>
              <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
                100 Reviews
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
  <div class="flex w-full justify-center py-10" in:fade={{ duration: 1000 }}>
    <div class="map-info">
      <div class="map-title">
        <h1>¿Cómo llegar al lugar?</h1>
        <p>te tenemos algunos datos</p>
      </div>
      <div class="map-description">
        <p>{$event.address}</p>
        <p>{$event.phone}</p>
        <p>{$event.email}</p>
        <p>{$event.additional}</p>
      </div>
    </div>
    <Map lng={-70.633156} lat={-33.424427} zoom={14}/>
  </div>
  <div class="flex w-full mb-20" in:fly={{ x:-100, delay:1000, duration: 1000 }}>
    {#each $comments as comment}
      <div class="flex flex-col w-full items-center px-8 text-center">
        <h2 class="w-1/2 mb-6 block font-sans text-xl sm:text-xs font-small leading-[1.3] tracking-normal text-blue-gray-900 antialiased">
          "{comment.message}"
        </h2>
        <img
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
          alt="profile_image"
          class="relative inline-block h-10 w-10 rounded-full object-cover object-center "
        />
        <h6 class="block mt-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          Nombre genérico
        </h6>
        <p class="block mb-4 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Rol genérico
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
  <div class="comments-container mt-10">
    <form on:submit={handleSubmit}>
      <div class="form-group">
        <label for="message">Comentario:</label>
        <textarea id="message" bind:value={$newComment.message} required></textarea>
      </div>
      <div class="form-group">
        <label for="rating">Rating:</label>
        <input type="number" id="rating" bind:value={$newComment.rating} min="0" max="5" required />
      </div>
      <button class="submit-button" type="submit">Enviar</button>
    </form>
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
  .map-info {
    padding: 40px 0;
    width: 100%;
    border-top: gray 2px dashed;
    border-bottom: gray 2px dashed;
  }
  .map-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
  }
  .map-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10% 0;
    width: 100%;
  }
  .comments-container {
    width: 80%;
    margin: auto;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .Map_and_info_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .submit-button {
    padding: 25px 30px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .submit-button:hover {
    background-color: #0056b3;
  }
  @media (min-width: 768px) {
    .main-info {
      flex-direction: row;
      margin: 1% 0;
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
