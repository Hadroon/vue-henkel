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
      errorMessage: 'tesztimesszi'
    }
  },
  methods: {
    handleSubmitSajat: function(e){
      this.user.email = '';
      this.user.password = '';
      e.preventDefault();
    },
    handleSubmit: async function(e){
      e.preventDefault();

      await this.$http.post('http://localhost:8080/login', {
      email: this.localEmail,
      password: this.localPassword
      })
      .then(response => {
        console.log('login megjött :)');
        // this.user.auth = response.data.auth;
        // this.user.auth = response.data.auth;
        // if (response.data.error) {
        //   console.log('hiba');
        //   return this.errorMessage = response.data.error;
        // }
        console.log('ez lefutott????');
        localStorage.henkelToken = response.data.token;
        this.user = response.data.user;
        this.authenticated.auth = response.data.auth;
        // localStorage.setItem('user',JSON.stringify(response.data.user));
        // localStorage.setItem('jwt',response.data.token);
          },
          (err) => {
            console.log('bejöt valami errorba');
            console.log(err);
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


