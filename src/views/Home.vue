<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="recipe in recipes">
      <h2>Title: {{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="">
      <p>Prep time: {{ recipe.prep_time }}</p>
    </div>
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Hello World",
      recipes: []
    };
  },
  created: function() {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function() {
      axios.get("/api/recipes").then(response => {
        console.log("All Recipes:", response.data);
        this.recipes = response.data;
      });
    }
  }
};
</script>
