<template>
  <div class="home">
    <h1>New Recipe</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <div>
      Title: <input type="text" v-model="newRecipeTitle"> <br>
      Ingredients: <input type="text" v-model="newRecipeIngredients"> <br>
      Directions: <input type="text" v-model="newRecipeDirections"> <br>
      Prep Time: <input type="text" v-model="newRecipePrepTime"> <br>
      Image Url: <input type="text" v-model="newRecipeImageUrl"> <br>
      <button v-on:click="createRecipe()">Create</button>
    </div>

    <div v-for="recipe in recipes">
      <h2>{{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="">
      <p>Prep time: {{ recipe.prep_time }}</p>
      <button v-on:click="showRecipe(recipe)">More Info</button>
    </div>

    <dialog id="recipe-details">
      <form method="dialog">
        <h1>Recipe Info</h1>
        <p>Title: ...</p>
        <p>Directions: ...</p>
        <p>Ingredients: ...</p>
        <p>Prep Time: ...</p>
        <p>Image: ...</p>
        <button>Close</button>
      </form>
    </dialog>

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
      errors: [],
      newRecipeTitle: "",
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipePrepTime: "",
      newRecipeImageUrl: ""
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
        title: this.newRecipeTitle,
        ingredients: this.newRecipeIngredients,
        directions: this.newRecipeDirections,
        prep_time: this.newRecipePrepTime,
        image_url: this.newRecipeImageUrl
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
    },
    showRecipe: function(recipe) {
      console.log(recipe);
      document.querySelector("#recipe-details").showModal();
    }
  }
};
</script>
