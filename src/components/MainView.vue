<template>
  <div class="wrapper">
    <div class="header">
      <a href="/#forms" style="float:left;">
        <img style="max-width: 200px; margin-top: 4px;" src="@/assets/ap.jpg" alt="">
      </a>
      <div class="nav">
        <i style="color: green;" class="material-icons">happy</i>
        <a href="">Játékleírás</a>
        <a href="">Nyeremények</a>
        <a href="">Játékszabályzat</a>
      </div>
    </div>
    <div class="content">
      <div class="relative">
        <img src="@/assets/head.jpg" alt="">
        <img class="separator" src="@/assets/separator.png" alt="">
      </div>
      <div class="relative">
        <img src="@/assets/folyamat_2.jpg" alt="">
        <img class="separator" src="@/assets/separator.png" alt="">
      </div>
      <div id="forms" class="anchor"></div>
      <div class="relative">
        <div style="height: 500px; padding: 100px;">
        <!-- <PulseLoader /> -->
        <grid-loader :loading="loading" :color="color" :size="size"></grid-loader>
        </div>


        <!-- <div v-if="!this.authenticated.auth && !spinner" id="logic" class="grid-forms">
            <RegistrationForm />
            <LogInForm :authenticated="authenticated" v-on:sendingData="upDate($event)" />
        </div>
        <div v-if="this.authenticated.auth && !spinner" style="height: 500px; background: green;">

          <p> valami  {{this.authenticated.name}}</p>
          {{ this.authenticated.name }}


        </div> -->
      </div>
      <div class="relative">
        <img class="separator-upper" src="@/assets/separator.png" alt="">
        <img src="@/assets/nyeremenyek_3.jpg" alt="">
        <img class="separator" src="@/assets/separator.png" alt="">
      </div>

      <div>4</div>
      <div>
                  
            
      </div>
      <div class="box footer">Footer</div>
    </div>
  </div>
</template>

<script>
import RegistrationForm from './RegistrationForm';
import LogInForm from './LogInForm';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue';

// var GridLoader = VueSpinner.GridLoader

export default {
    name: 'MainView',
    components: {
        RegistrationForm,
        LogInForm,
        GridLoader
    },
    data() {
      return {
        authenticated: {
          auth: false,
          name: null
        },
        spinner: true,
        loading: true,
        color: 'white',
        size: '50px'
      }
    },
    methods: {
      upDate: function(email){
        this.user.email = email;
      },
      mounted() {
        console.log('created called.');
        console.log(this.$route);
        console.log('this: ');
        console.log(this);
      },
      checkUser() {
        if (this.authenticated.auth) return;
        console.log('van-e henkelToken?: ');
        console.log(localStorage.henkelToken);
        if (localStorage.henkelToken) {
          this.$http.post('/check', {
            token: localStorage.henkelToken 
            })
            .then(response => {
              if(response.data.error) {
                return;
              }

              if(response.data.auth) {
                this.authenticated.auth = response.data.auth;
                this.authenticated.name = response.data.name;
                console.log('auth: ');
                console.log(response.data.auth);
                console.log('name: ');
                console.log(response.data.name);
                return;
              }
              this.authenticated.auth = false;
              this.authenticated.name = '';
                })
                .catch(function (error) {
                    console.error(error.response);
                });
        }
      }
    },
    created: async function() {
    // this.property = 'Example property update.'
    // console.log('propertyComputed will update, as this.property is now reactive.')
    await this.checkUser();
    }
    
}
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

p, h1, h2, h3, legend, span {
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
  grid-template-areas:
  "left right";
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


