<template>
  <div class="home">
    <h1>New Recipe</h1>
    <ul>
      <li v-for="error in createErrors">{{ error }}</li>
    </ul>

    <div>
      Title: <input type="text" v-model="newRecipeTitle" /> <br />
      Ingredients: <input type="text" v-model="newRecipeIngredients" /> <br />
      Directions: <input type="text" v-model="newRecipeDirections" /> <br />
      Prep Time: <input type="text" v-model="newRecipePrepTime" /> <br />
      Image Url: <input type="text" v-model="newRecipeImageUrl" /> <br />
      <button v-on:click="createRecipe()">Create</button>
    </div>

    <div v-for="recipe in recipes">
      <h2>{{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="" />
      <p>Prep time: {{ recipe.prep_time }}</p>
      <button v-on:click="showRecipe(recipe)">More Info</button>
    </div>

    <dialog id="recipe-details">
      <form method="dialog">
        <h1>Recipe Info</h1>
        <!-- <ul>
          <li v-for="error in updateErrors">{{ error }}</li>
        </ul> -->
        <p>Title: <input type="text" v-model="currentRecipe.title" /></p>
        <p>
          Ingredients: <input type="text" v-model="currentRecipe.ingredients" />
        </p>
        <p>
          Directions: <input type="text" v-model="currentRecipe.directions" />
        </p>
        <p>
          Prep Time: <input type="text" v-model="currentRecipe.prep_time" />
        </p>
        <p>
          Image Url: <input type="text" v-model="currentRecipe.image_url" />
        </p>
        <button v-on:click="updateRecipe(currentRecipe)">Update</button>
        <button v-on:click="destroyRecipe(currentRecipe)">Delete</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
img {
  width: 400px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recipes: [],
      createErrors: [],
      // updateErrors: [],
      newRecipeTitle: "",
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipePrepTime: "",
      newRecipeImageUrl: "",
      currentRecipe: {},
    };
  },
  created: function() {
    this.indexRecipes();
  },
  methods: {
    indexRecipes: function() {
      axios.get("/api/recipes").then((response) => {
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
        image_url: this.newRecipeImageUrl,
      };
      axios
        .post("/api/recipes", params)
        .then((response) => {
          console.log("Success", response.data);
          this.recipes.push(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.createErrors = error.response.data.errors;
        });
    },
    showRecipe: function(recipe) {
      console.log(recipe);
      this.currentRecipe = recipe;
      document.querySelector("#recipe-details").showModal();
    },
    updateRecipe: function(recipe) {
      var params = {
        title: recipe.title,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        prep_time: recipe.prep_time,
        image_url: recipe.image_url,
      };
      axios
        .patch(`/api/recipes/${recipe.id}`, params)
        .then((response) => {
          console.log("Successfully Updated", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          // this.updateErrors = error.response.data.errors;
        });
    },
    destroyRecipe: function(recipe) {
      axios.delete(`/api/recipes/${recipe.id}`).then((response) => {
        console.log("Successfully destroyed", response.data);
        var index = this.recipes.indexOf(recipe);
        this.recipes.splice(index, 1);
      });
    },
  },
};
</script>
