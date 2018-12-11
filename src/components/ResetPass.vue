<template>
  <div class="right">
      <p v-if="errorMessage">{{this.errorMessage}}</p>
    <form action="/login" method="post">
      <div class="form-group">
        <legend>Jelszó:</legend>
        <input type="password" class="form-control" name="email" v-model="localPassOne">
      </div>
      <div class="form-group">
        <legend>Jelszó megerősítése:</legend>
        <input type="password" class="form-control" name="password" v-model="localPassTwo">
      </div>
      <button
        style="item-align: center;"
        class="btn btn-warning btn-lg"
        @click="handleSubmit">Belépés</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "reset-pass",
  props: {
    authenticated: Object
  },
  data() {
    return {
      localPassOne: null,
      localPassTwo: null,
      errorMessage: null
    };
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault();
      this.errorMessage = "";
      await this.$http
        .post("/resetpass", {
          passone: this.localPassOne,
          passtwo: this.localPassTwo,
          token: this.$route.params.passwordtoken
        })
        .then(response => {
          if (response.data.error) {
            return (this.errorMessage = response.data.error);
          }

          if (response.data.auth) {
            localStorage.henkeltoken = response.data.token;
            this.authenticated.auth = response.data.auth;
            this.authenticated.name = response.data.name;
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
