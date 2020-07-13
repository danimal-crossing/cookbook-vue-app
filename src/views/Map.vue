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
    return {
      places: [
        {
          long: -122.4211,
          lat: 37.79193,
          description: "Bob's donuts!"
        },
        {
          long: -122.42497,
          lat: 37.77858,
          description: "Johnny's Donuts!"
        },
        {
          long: -122.02575,
          lat: 36.9738,
          description: "Marini's Downtown Santa Cruz"
        },
        {
          long: -122.03712,
          lat: 37.97473,
          description: "Alpine bakery, Concord!"
        }
      ]
    };
  },
  mounted: function() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/dzaghian/cjxaqxm273umk1cqz0saddk4t", // stylesheet location
      center: [-122.4194, 37.7749], // starting position [lng, lat]
      zoom: 13 // starting zoom
    });
    this.places.forEach(place => {
      // create the popup
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(place.description);
      // create the marker
      var marker = new mapboxgl.Marker()
        .setLngLat([place.long, place.lat])
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    });
    // var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    // mapboxClient.geocoding
    //   .forwardGeocode({
    //     query: "Bob's Donuts, San Francisco",
    //     autocomplete: false,
    //     limit: 1
    //   })
    //   .send()
    //   .then(function(response) {
    //     if (
    //       response &&
    //       response.body &&
    //       response.body.features &&
    //       response.body.features.length
    //     ) {
    //       var feature = response.body.features[0];

    //       var map = new mapboxgl.Map({
    //         container: "map",
    //         style: "mapbox://styles/mapbox/streets-v11",
    //         center: feature.center,
    //         zoom: 10
    //       });
    //       new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    //     }
    //   });
  },
  methods: {}
};
</script>
