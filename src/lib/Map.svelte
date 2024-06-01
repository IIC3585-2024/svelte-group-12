<script>
// @ts-nocheck
  import { onMount } from 'svelte'
  import {Map, MapStyle, Marker, config} from '@maptiler/sdk';
  import "@maptiler/sdk/dist/maptiler-sdk.css";

  export let lng;
  export let lat;
  export let zoom;
  
  let map;
  let mapContainer;

  config.apiKey = 'WBgbqjhXWd7QmmU7xJgU';

  onMount(() => {
    const initialState = { lng, lat, zoom };

    map = new Map({
      container: mapContainer,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    new Marker({color: "#FF0000"})
      .setLngLat([initialState.lng, initialState.lat])
      .addTo(map);
  });
</script>

<div class="map-wrap">
  <div class="map" bind:this={mapContainer}></div>
</div>

<style>
  .map-wrap {
    width: 100%;
    height: calc(50vh);
  }
  .map {
    width: 100%;
    height: 100%;
  }
</style>