<template>
    <div class="left">
            <h1 style="text-align: center;">Regisztráció</h1>
            <!-- <div v-if="errors.length">
              <p :key="error" v-for="error in errors">{{ error }}</p>
            </div> -->
            <form id="registration" action="/signup" method="post" novalidate="true">
              <table style="width:100%">
                <tr>
                  <td>
                    <legend>Vezetéknév*:</legend>
                    <input type="text" value="" v-model="user.lastName">
                    <i v-if="!localUserError.lastName" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.lastName" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                  <td>
                    <legend>Keresztnév*:</legend>
                    <input type="text" value="" v-model="user.firstName">
                    <i v-if="!localUserError.firstName" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.firstName" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Irányítószám*:</legend>
                    <input type="text" value="" v-mask="'####'" v-model="user.zipCode">
                    <i v-if="!localUserError.zipCode" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.zipCode" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                  <td>
                    <legend>Település*:</legend>
                    <input type="text" value="" v-model="user.city">
                    <i v-if="!localUserError.city" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.city" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Utca*:</legend>
                    <input type="text" value="" v-model="user.street">
                    <i v-if="!localUserError.street" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.street" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                  <td>
                    <legend>Házszám*:</legend>
                    <input type="text" value="" v-model="user.houseNumber">
                    <i v-if="!localUserError.houseNumber" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.houseNumber" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Telefon*:</legend>

                    <div>
                      <div style="float: left; width: 29px; padding-top: 6px;">
                        <span>
                          +36 
                        </span>
                      </div>
                      <div style="margin-left: 29px; background-color: red;">
                        <input style="width: 90%; padding: 5px;" type="text" v-mask="'(##) ###-##-##'" v-model="user.phoneNumber" placeholder="(00) 000-00-00">
                      </div>
                    </div>
                    <i v-if="!localUserError.phoneNumber" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.phoneNumber" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                  <td>
                    <legend>Email*:</legend>
                    <input type="text" value="" name="email" v-model="user.email">
                    <i v-if="!localUserError.email" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.email" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Jelszó*:</legend>
                    <input type="text" value="" name="password" v-model="user.password">
                    <i v-if="!localUserError.password" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.password" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                  </td>
                  <td>
                    <legend>Jelszó megerősítése*:</legend>
                    <input type="text" value="" name="passwordtwo" v-model="user.passwordTwo">
                    <i v-if="!localUserError.passwordTwo" style="color: green;" class="material-icons">check_circle_outline</i>
                    <i title="Kérlek add meg a kersztneved." v-if="localUserError.passwordTwo" style="color: #ed1b24;" class="material-icons">notifications_none</i>
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
      localUserError: {
        email: true,
        password: true,
        passwordTwo: true,
        firstName: true,
        lastName: true,
        zipCode: true,
        city: true,
        street: true,
        houseNumber: true,
        phoneNumber: true,
        acceptedToU: true,
        correctAge: true
      }
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
  },
  watch: {
    user: {
      handler: function(val) {
        if (val.firstName.length >= 4) {
          this.localUserError.firstName = false;
        } else {
          this.localUserError.firstName = true;
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>

i {
  position: absolute;
  bottom: 3px;
  right: 2vw;
}

td {
  position: relative;
}

input::placeholder {
  color: #000000;
}

</style>


