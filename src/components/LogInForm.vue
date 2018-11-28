<template>
  <div class="right">
    <h1 style="text-align: center;">Belépés</h1>
    <p v-if="this.authenticated.auth">Belépve {{this.user.email}}</p>
    <p v-if="this.errorMessage">{{this.errorMessage}}</p>
    <!-- <p>Belépve {{this.user.email}}</p> -->
    <form action="/login" method="post">
      <div class="form-group">
        <legend>Email</legend>
        <input type="text" class="form-control" name="email" v-model="localEmail">
      </div>
      <div class="form-group">
        <legend>Jelszó</legend>
        <input type="password" class="form-control" name="password" v-model="localPassword">
      </div>
      <button style="item-align: center;" class="btn btn-warning btn-lg" @click="handleSubmit">Belépés</button>
    </form>
    <p>
      <a id="forgot" href="/forgot">Elfelejtett jelszó</a>
    </p>
  </div>
</template>


<script>
export default {
  name: "LogInForm",
  props: {
    user: {
      type: Object
    },
    authenticated: {
      type: Object
    }
  },
  data() {
    return {
      localEmail: null,
      localPassword: null,
      errorMessage: null
    }
  },
  methods: {
    handleSubmit: async function(e){
      e.preventDefault();
      this.errorMessage = '';
      await this.$http.post('/login', {
      email: this.localEmail,
      password: this.localPassword
      })
      .then(response => {
        if(response.data.error) {
          return this.errorMessage = response.data.error;
        }

        if(response.data.auth) {
          console.log(response);
          localStorage.henkelToken = response.data.token;
          this.user.email = response.data.user.email;
          this.authenticated.auth = response.data.auth;
        }
          })
          .catch(function (error) {
              console.error(error.response);
          });
    }
  }
};
</script>


<style scoped>
</style>


