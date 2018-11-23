<template>
    <div class="left">
            <h1 style="text-align: center;">Regisztráció</h1>
            <div v-if="errors.length">
              <p :key="error" v-for="error in errors">{{ error }}</p>
            </div>
            <form id="registration" action="/signup" method="post" novalidate="true">
              <table style="width:100%">
                <tr>
                  <td>
                    <legend>Vezetéknév*:</legend>
                    <input type="text" value="" v-model="user.lastName">
                    <i style="color: green;" class="material-icons">alarm-on</i>
                  </td>
                  <td>
                    <legend>Keresztnév*:</legend>
                    <input type="text" value="" v-model="user.firstName">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Irányítószám*:</legend>
                    <input type="text" value="" v-mask="'####'" v-model="user.zipCode">
                  </td>
                  <td>
                    <legend>Település*:</legend>
                    <input type="text" value="" v-model="user.city">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Utca*:</legend>
                    <input type="text" value="" v-model="user.street">
                  </td>
                  <td>
                    <legend>Házszám*:</legend>
                    <input type="text" value="" v-model="user.houseNumber">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Telefon*:</legend>
                    <span>+36 </span><input style="width: 80%;" type="text" v-mask="'(##) ###-##-##'" v-model="user.phoneNumber">
                  </td>
                  <td>
                    <legend>Email*:</legend>
                    <input type="text" value="" name="email" v-model="user.email">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Jelszó*:</legend>
                    <input type="text" value="" name="password" v-model="user.password">
                  </td>
                  <td>
                    <legend>Jelszó megerősítése*:</legend>
                    <input type="text" value="" name="passwordtwo" v-model="user.passwordTwo">
                  </td>
                </tr>
              </table>
              <p><input type="checkbox" name="eula" value="1" v-model="user.acceptedToU"> Elolvastam és elfogadom a <a href="#">Szabályzatot</a>,
                valamint az <a href="#">Adatvédelmi tájékoztatót</a>.</p>
              <p><input type="checkbox" name="gdpr" value="1" v-model="user.correctAge"> Nyilatokzom, hogy elmúltam 18 éves.</p>
              <div style="align-items: center;">
                <!-- <button disabled id="regbutt" @click="handleSubmit">Regisztráció</button> -->
                <button id="regbutt" @click="handleSubmit">Regisztráció</button>
              </div>
            </form>
    </div>
</template>



<script>
import IinputField from './IinputField';

export default {
  name: 'RegistrationForm',
    components: {
      IinputField
    },
  props: {
    user: {
      type: Object
    },
    regErrorMessages: {
      type: Object
    }
  },
  data() {
    return {
      errors: ['ez egy hibauzenet.'],
    }
  }, 
  methods: {
    handleSubmit: async function(e){

      // for (var key in p) {
      //   if (p.hasOwnProperty(key)) {
      //       console.log(key + " -> " + p[key]);
      //   }
      // }



      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.age) {
        this.errors.push('Age required.');
      }
      e.preventDefault();
      await this.$http.post('http://localhost:8080/reg', {
      user: this.user
      })
      .then(response => {
        console.log('koszi az adatot');
        this.user.auth = response.data.auth;
          })
          .catch(function (error) {
              console.error(error.response);
              console.error(error.response.data);
          });

    },
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.age) {
        this.errors.push('Age required.');
      }

      e.preventDefault();
    }
  }
};
</script>

<style scoped>
</style>


