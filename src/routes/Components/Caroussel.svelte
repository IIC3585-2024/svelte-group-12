<script>
// @ts-nocheck
  import { blur } from "svelte/transition";
  export let duration;
  export let slides;

  let currentSlide = 0;
  const nextSlide = () => {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    timer();
  };
  const prevSlide = () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }
    timer();
  };
  const goToSlide = (i) => {
    currentSlide = i;
    timer();
  };
  let interval;
  const timer = () => {
    clearInterval(interval);
    interval = setInterval(nextSlide, duration);
  };
  timer();
</script>

<div class="slider">
  {#each slides as slide, i}
    {#if currentSlide === i}
    <a href={`/destinations/${slide.city}`}>
      <div class="slide" transition:blur={{ amount: 2 }}>
          <img class="background" src={slide.image} alt={`Slide ${i + 1}`} />
          <div class="slide-info">
            <h2>{slide.city}</h2>
            <p>{slide.location}</p>
          </div>
        </div>
      </a>
    {/if}
  {/each}
  <button class="next" on:click={nextSlide}>&gt</button>
  <button class="prev" on:click={prevSlide}>&lt</button>
  <div class="nav">
    {#each slides as slide, i}
      <button
        class="bubble"
        on:click={() => {
          goToSlide(i);
        }}
        class:current={i === currentSlide}
        class:onedown={i === currentSlide - 1}
        class:twodown={i === currentSlide - 2}
        class:oneup={i === currentSlide + 1}
        class:twoup={i === currentSlide + 2}
      />
    {/each}
  </div>
</div>

<style>
  .slider {
    width: 100%;
    height: calc(100vh - 98px);
    position: relative;
  }
  .slide {
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    color: #fff;
  }
  .slide-info {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1em;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
  }
  .slide-info h2 {
    margin: 0;
    font-size: 1.5em;
  }
  .slide-info p {
    margin: 0;
    font-size: 1em;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .next,
  .prev {
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .next {
    right: 20px;
  }
  .prev {
    left: 20px;
  }
  .nav {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 100px;
    z-index: 3;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .bubble {
    padding: 0;
    border: 0;
    height: 20px;
    width: 10px;
    border-radius: 100px;
    transition: all 0.3s ease-out;
    opacity: 0.2;
    cursor: pointer;
  }
  .current {
    height: 80px;
    opacity: 0.8;
  }
  .onedown,
  .oneup {
    height: 60px;
  }
  .twodown,
  .twoup {
    height: 40px;
  }
</style>