<template>
  <div class="recipes-index">
    <div v-for="recipe in recipes">
      <h2>{{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="">
      <p>Prep time: {{ recipe.prep_time }}</p>
      <button>More Info</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recipes: []
    };
  },
  created: function() {
    axios.get("/api/recipes").then(response => {
      console.log("All Recipes:", response.data);
      this.recipes = response.data;
    });
  },
  methods: {}
};
</script>