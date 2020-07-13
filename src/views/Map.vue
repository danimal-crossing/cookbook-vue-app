<template>
  <div class="map">
    <h1>Mapbox Map</h1>
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  top: 0;
  bottom: 0;
  height: 600px;
  width: 100%;
}
</style>

<script>
export default {
  data: function() {
    return {};
  },
  mounted: function() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [-122.4194, 37.7749], // starting position [lng, lat]
      zoom: 13 // starting zoom
    });
  },
  methods: {}
};
</script>
