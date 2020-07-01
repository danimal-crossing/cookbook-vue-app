<template>
  <div class="home">
    <h1>New Recipe</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <button v-on:click="createRecipe()">Create</button>
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
      recipes: [],
      errors: []
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
    },
    createRecipe: function() {
      var params = {
        title: "example title",
        ingredients: "example ingredients",
        directions: "example directions",
        prep_time: "example prep_time",
        image_url: "example image_url"
      };

      axios
        .post("/api/recipes", params)
        .then(response => {
          console.log("Success", response.data);
          this.recipes.push(response.data);
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
