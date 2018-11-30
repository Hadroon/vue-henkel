<template>
  <div class="wrapper">
    <div class="header">
      <a href="/#forms" style="float:left;">
        <img style="max-width: 200px; margin-top: 4px;" src="@/assets/ap.jpg" alt>
      </a>
      <div class="nav">
        <i style="color: green;" class="material-icons">happy</i>
        <a href>Játékleírás</a>
        <a href>Nyeremények</a>
        <a href>Játékszabályzat</a>
        <a v-if="authenticated.auth" href>{{ authenticated.name }}</a>
      </div>
    </div>
    <div class="content">
      <div class="relative">
        <img src="@/assets/head.jpg" alt>
        <img class="separator" src="@/assets/separator.png" alt>
      </div>
      <div class="relative">
        <img src="@/assets/folyamat_2.jpg" alt>
        <img class="separator" src="@/assets/separator.png" alt>
      </div>
      <div v-if="spinner.loading" style="height: 200px; padding: 100px;">
        <grid-loader :loading="spinner.loading" :color="spinner.color" :size="spinner.size"></grid-loader>
      </div>
      <div id="forms" class="anchor"></div>
      <reg-log-wrapper v-if="!this.authenticated.auth && !spinner.loading" class="relative"/>
      <send-codes
        v-if="this.authenticated.auth && !spinner.loading"
        :authenticated="authenticated"
      />
      <div class="relative">
        <img class="separator-upper" src="@/assets/separator.png" alt>
        <img src="@/assets/nyeremenyek_3.jpg" alt>
        <img class="separator" src="@/assets/separator.png" alt>
      </div>

      <div>4</div>
      <div></div>
      <div class="box footer">Footer</div>
    </div>
  </div>
</template>

<script>
import GridLoader from "vue-spinner/src/GridLoader.vue";
import RegLogWrapper from "./RegLogWrapper.vue";
import SendCodes from "./SendCodes.vue";

export default {
  name: "MainView",
  components: {
    RegLogWrapper,
    GridLoader,
    SendCodes
  },
  data() {
    return {
      authenticated: {
        auth: false,
        name: null,
        id: null
      },
      spinner: {
        loading: true,
        color: "black",
        size: "50px"
      }
    };
  },
  methods: {
    upDate: function(email) {
      this.user.email = email;
    },
    checkUser: async function() {
      try {
        this.spinner.loading = true;
        if (this.authenticated.auth) {
          this.spinner.loading = false;
          return;
        }
        let response = await this.$http.post("/check", {
          token: localStorage.henkelToken
        });
        if (response.data.auth) {
          this.authenticated.auth = response.data.auth;
          this.authenticated.name = response.data.name;
          this.authenticated.id = response.data.id;
          this.spinner.loading = false;
          return;
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  },
  created() {
    this.checkUser();
  }
};
</script>

<style>
body {
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  margin: 0px;
  background-color: #ed1b24;
}

img {
  width: 100%;
}

p,
h1,
h2,
h3,
legend,
span {
  color: #ffffff;
  font: "Lucida Grande", Helvetica, Arial, sans-serif;
}

legend {
  margin-bottom: 2px;
  margin-top: 8px;
}

a {
  color: #ffffff;
  text-decoration: none;
}

div.anchor {
  display: block;
  position: relative;
  top: -60px;
  visibility: hidden;
}

td > input {
  width: 90%;
  padding: 5px;
}

/* input::placeholder {
  color: greey;
  text-align: right;
} */

/* input:invalid {
  border: 2px dashed green;
} */

/* input:valid {
  border: 2px solid black;
} */

a:target:before {
  top: -500px;
  display: block;
  position: relative;
  visibility: hidden;
}

.grid-forms {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: "left right";
}

.left {
  grid-area: left;
  padding: 35px 15px 55px 15px;
}

.right {
  grid-area: right;
  padding: 35px 15px 100px 15px;
}

.separator {
  position: absolute;
  left: 0px;
  bottom: -6vw;
  z-index: 1000;
  /* display: none; */
}

.separator-upper {
  position: absolute;
  left: 0px;
  top: -6vw;
  z-index: 1000;
  /* display: none; */
}

.relative {
  position: relative;
  /* display: block; */
}

.test {
  /* height: 300px; */
  padding: 20px;
}

.wrapper {
}

.nav {
  font-size: 18px;
  /* padding: 10px; */
  margin-top: 20px;
  text-align: right;
}

.nav > a {
  margin-right: 30px;
}

.sidebar {
  grid-area: sidebar;
}

.sidebar2 {
  grid-area: sidebar2;
}

.content {
  grid-area: content;
  margin-top: 49px;
}

.header {
  position: fixed;
  grid-area: header;
  z-index: 10000;
  background-color: #ed1b24;
  width: 100%;
  /* box-shadow: 0px 2px 2px 1px rgba(211,211,211, .9); */
  box-shadow: 0 5px 36px -2px #000;
}

.footer {
  grid-area: footer;
}

.wrapper {
  display: grid;
  grid-template-areas:
    "header"
    "sidebar"
    "content"
    "sidebar2"
    "footer";
}

@media only screen and (min-width: 500px) {
  .wrapper {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "content";
  }
}

@media only screen and (min-width: 600px) {
  .wrapper {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "content";
    max-width: 100%;
  }
}

.box {
}

.header,
.footer {
}

.sidebar2 {
}

#logic {
  margin-bottom: 20px;
}

.icon {
  width: 20px;
  color: green;
}
</style>


