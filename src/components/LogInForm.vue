<template>
  <div>
    <div v-if="!spinner.loading" class="right">
      <h1 style="text-align: center;">Belépés</h1>
      <p v-if="this.errorMessage">{{this.errorMessage}}</p>
      <form action="/login" method="post">
        <div class="form-group">
          <legend>Email:</legend>
          <input type="text" class="form-control" name="email" v-model="localEmail">
        </div>
        <div class="form-group">
          <legend>Jelszó:</legend>
          <input type="password" class="form-control" name="password" v-model="localPassword">
        </div>
        <button
          style="item-align: center;"
          class="btn btn-warning btn-lg"
          @click="handleSubmit">Belépés</button>
      </form>
      <p>
        <a v-on:click="toggleForgotPassword" id="forgot" href="#">Elfelejtett jelszó</a>
      </p>
      <p v-if="this.forgotMessage">{{this.forgotMessage}}</p>
      <form v-if="canShowForgot" action="/login" method="post">
        <div class="form-group">
          <legend>Email:</legend>
          <input type="text" class="form-control" name="email" v-model="localEmail">
        </div>
        <button
          style="item-align: center;"
          class="btn btn-warning btn-lg"
          @click="resetPassword">Elfelejtett jelszó</button>
      </form>
    </div>
    <div v-if="spinner.loading" class="right">
      <grid-loader :loading="spinner.loading" :color="spinner.color" :size="spinner.size"></grid-loader>
    </div>
  </div>
</template>


<script>
import GridLoader from "vue-spinner/src/GridLoader.vue";

export default {
  name: "LogInForm",
  props: {
    authenticated: {
      type: Object
    }
  },
  components: {
    GridLoader
  },
  data() {
    return {
      localEmail: null,
      localPassword: null,
      errorMessage: null,
      canShowForgot: false,
      forgotMessage: '',
      spinner: {
        loading: false,
        color: "white",
        size: "50px"
      },
    };
  },
  methods: {
    handleSubmit: async function(e) {
      e.preventDefault();
      this.errorMessage = "";
      await this.$http
        .post("/login", {
          email: this.localEmail,
          password: this.localPassword
        })
        .then(response => {
          console.log("response");
          console.log(response);
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
    },
    toggleForgotPassword: function(e) {
      e.preventDefault();
      if(this.canShowForgot) {
        this.canShowForgot = false;
      } else {
        this.canShowForgot = true;
      }
    },
    resetPassword: async function(e) {
      e.preventDefault();
      this.spinner.loading = true;
      this.canShowForgot = false;
      await this.$http.post("/reset", { email: this.localEmail }).then(response => {
        console.log(response);
        this.forgotMessage = response.data.forgotMessage;
        this.spinner.loading = false;
        }).catch(function(error) {console.error(error);});
    }
  }
};
</script>


<style scoped>

.btn {
  margin-top: 15px;
}

.v-spinner {
  margin: 0px auto;
}

</style>


