<template>
  <div class="recipes-show">
    
    <h2>{{ recipe.title }}</h2>
    <img :src="recipe.image_url" alt="" />
    <p>Ingredients: {{ recipe.ingredients }}</p>
    <p>Directions: {{ recipe.directions }}</p>
    <p>Prep Time: {{ recipe.prep_time }}</p>
    <p>Author: {{ recipe.user.name }}</p>

    <!-- Logged in User Id: {{ $parent.getUserId() }} <br />
    Recipe User Id: {{ recipe.user.id }} -->

    <br />

    <div v-if="recipe.owner">
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editRecipeModal">
        Edit
      </button>
      <button class="btn btn-primary" v-on:click="destroyRecipe()">Delete</button>
    </div>

    <!-- Edit Recipe Modal -->
    <div class="modal fade" id="editRecipeModal" tabindex="-1" role="dialog" aria-labelledby="editRecipeModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editRecipeModalLabel">Edit Recipe</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="editRecipe()">
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
        </div>
      </div>
    </div>

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
      console.log(response.data);
      this.recipe = response.data;
    });
  },
  methods: {
    destroyRecipe: function() {
      if (confirm("Are you sure you want to delete this recipe?")) {
        axios.delete(`/api/recipes/${this.recipe.id}`).then(response => {
          console.log("Successfully destroyed", response.data);
          this.$router.push("/recipes");
        });
      }
    },
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
          // close the modal
          $("#editRecipeModal").modal("hide");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
