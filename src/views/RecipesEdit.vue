<template>
  <div class="recipes-edit">
    
    <form v-on:submit.prevent="editRecipe()">
      <h1>Edit Recipe</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="recipe.title">
      </div>
      <div class="form-group">
        <label>Ingredients:</label>
        <input type="text" class="form-control" v-model="recipe.ingredients">
      </div>
      <div class="form-group">
        <label>Directions:</label>
        <input type="text" class="form-control" v-model="recipe.directions">
      </div>
      <div class="form-group">
        <label>Prep Time:</label>
        <input type="text" class="form-control" v-model="recipe.prep_time">
      </div>
      <div class="form-group">
        <label>Image Url:</label>
        <input type="text" class="form-control" v-model="recipe.image_url">
      </div>
      <input type="submit" class="btn btn-primary" value="Update">
    </form>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      errors: [],
      recipe: {}
    };
  },
  created: function() {
    axios.get(`/api/recipes/${this.$route.params.id}`).then(response => {
      this.recipe = response.data;
      console.log(this.recipe);
    });
  },
  methods: {
    editRecipe: function() {
      var params = {
        title: this.recipe.title,
        ingredients: this.recipe.ingredients,
        directions: this.recipe.directions,
        prep_time: this.recipe.prep_time,
        image_url: this.recipe.image_url
      };
      axios
        .patch(`/api/recipes/${this.recipe.id}`, params)
        .then(response => {
          // redirect to recipes show
          this.$router.push(`/recipes/${response.data.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>