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

    <div>Search: <input type="text" v-model="titleFilter" list="titles" /></div>
    <datalist id="titles">
      <option v-for="recipe in recipes">{{ recipe.title }}</option>
    </datalist>
    <div v-for="recipe in filterBy(recipes, titleFilter, 'title')">
      <h2>{{ recipe.title }}</h2>
      <img v-bind:src="recipe.image_url" alt="" />
      <p>Prep time: {{ recipe.prep_time }}</p>
      <p>Created {{ relativeDate(recipe.created_at) }}</p>
      <router-link v-bind:to="`/recipes/${recipe.id}`">More Info</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      recipes: [],
      titleFilter: "",
    };
  },
  created: function() {
    axios.get("/api/recipes").then((response) => {
      console.log("All Recipes:", response.data);
      this.recipes = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
