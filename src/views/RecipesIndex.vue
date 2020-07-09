<template>
  <div class="recipes-index">
    <div
      v-if="$parent.flashMessage"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {{ $parent.flashMessage }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div v-for="recipe in recipes">
      <h2>{{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="">
      <p>Prep time: {{ recipe.prep_time }}</p>
      <router-link v-bind:to="`/recipes/${recipe.id}`">More Info</router-link>
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