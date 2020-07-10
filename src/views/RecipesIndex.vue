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

    <div class="form-group">
      <input class="form-control" v-model="titleFilter" list="titles" type="text" placeholder="Search">
    </div>
    <datalist id="titles">
      <option v-for="recipe in recipes">{{ recipe.title }}</option>
    </datalist>


    <div id="fh5co-work-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center fh5co-heading">
            <h2>All Recipes</h2>
            <p>Specially curated by demon cats for your taste buds</p>
          </div>
        </div>
        <div class="row">
          <div v-for="recipe in filterBy(recipes, titleFilter, 'title')" class="col-md-4">
            <router-link v-bind:to="`/recipes/${recipe.id}`" class="item-grid text-center">
              <div class="image" :style="`background-image: url(${recipe.image_url})`"></div>
              <div class="v-align">
                <div class="v-align-middle">
                  <h3 class="title">{{ recipe.title }}</h3>
                  <h5 class="category">Prep Time: {{ recipe.prep_time }}</h5>
                  <h5 class="category">Created {{ relativeDate(recipe.created_at) }}</h5>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
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
      titleFilter: ""
    };
  },
  created: function() {
    axios.get("/api/recipes").then(response => {
      console.log("All Recipes:", response.data);
      this.recipes = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    }
  }
};
</script>
