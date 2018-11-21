<template>
  <div class="right">
    <h1 style="text-align: center;">Belépés</h1>
    <form action="/login" method="post">
      <div class="form-group">
        <legend>Email</legend>
        <input type="text" class="form-control" name="email" v-model="user.email">
      </div>
      <div class="form-group">
        <legend>Jelszó</legend>
        <input type="password" class="form-control" name="password" v-model="user.password">
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
    }
  },
  data() {
    return {
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
      email: this.user.email,
      password: this.user.password
      })
      .then(response => {
        this.user.auth = response.data.auth;
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


