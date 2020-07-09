<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <div class="text-center">
        <h1>Signup</h1>
        <img v-if="status" :src="`https://http.cat/${status}`" alt="" />
      </div>

      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="name" />
        <small>{{ 20 - name.length }} characters remaining</small>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password" />
        <small
          class="text-danger"
          v-if="password.length > 0 && password.length < 6"
          >Must be at least 6 characters</small
        >
        <small class="text-danger" v-if="password.length > 20"
          >Cannot exceed 20 characters</small
        >
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="passwordConfirmation"
        />
        <small class="text-danger" v-if="passwordConfirmation !== password"
          >Must match password</small
        >
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      status: "",
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.$parent.flashMessage = "Successfully signed up!";
          this.$router.push("/login");
        })
        .catch((error) => {
          this.status = error.response.status;
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
