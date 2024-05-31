<script>
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';

  let isFocused = false;
  let searchValue = '';
  let options = ['Santiago', 'Curico', 'Valparaiso', 'Puerto Varas']; // Tus opciones precargadas

  function handleSubmit() {
    goto(`/cities/${searchValue}`);
  }

  function matchesSearchValue(option) {
    const regex = new RegExp(searchValue, 'ig'); // Crea una regex a partir de searchValue
    return regex.test(option); // Prueba si la opción coincide con la regex
  }
</script>


<div class="main-div">
  <video class:dim={isFocused} id="video" autoPlay muted loop>
    <source src="https://videos.pexels.com/video-files/8820216/8820216-hd_1280_720_25fps.mp4" type="video/mp4" />
  </video>
  <div id="search-bar" in:fly={{ y:100, duration: 1500}}>
    <form class="flex text-gray-600" on:submit|preventDefault={handleSubmit}>
      <input 
        bind:value={searchValue}
        type="search"
        name="search"
        placeholder="Busca una ciudad..."
        class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
        on:click={() => isFocused = true}
        on:blur={() => isFocused = false}
        >
      <button type="submit" class="ml-3 p-3 bg-blue-800 rounded-full">
        <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
          <path fill="white" d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
        </svg>
      </button>
    </form>
    <ul class="list-group">
      {#each options as option (option)}
        {#if matchesSearchValue(option) && searchValue !== option && searchValue !== ''}
          <li>
            <button class="list-group-item" value={option} on:click={() => searchValue = option} on:keydown={(event) => {if (event.key === 'Enter') searchValue = option;}}>{option}</button>
          </li>  
        {/if}
      {/each}
    </ul>
  </div>
</div>

<style>
  .main-div {
    height: 100vh;
    background-color: black;
    z-index: -1;
  }
  #video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  #search-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .list-group {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 10px;
    background-color: rgb(238, 238, 238);
    border-radius: 10px; 
    z-index: 2;
  }
  .list-group-item {
    padding: 10px;
    cursor: pointer;
  }
  .dim {
    opacity: 0.5;
  }
</style>
