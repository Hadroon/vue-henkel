<template>
    <div>
      <div class="left" v-if="spinner.loading">
        <grid-loader :loading="spinner.loading" :color="spinner.color" :size="spinner.size"></grid-loader>
      </div>

      <div class="left" v-if="succesMessage && !spinner.loading">
        <p>
          {{ succesMessage }}
        </p>
      </div>

      <div class="left" v-if="!succesMessage && !spinner.loading">
              <h1 style="text-align: center;">Regisztráció</h1>
              <p v-if="error">{{ error }}</p>
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
                      <input type="password" value="" name="password" v-model="user.password">
                      <i v-if="!localUserError.password" style="color: green;" class="material-icons">check_circle_outline</i>
                      <i title="Kérlek add meg a kersztneved." v-if="localUserError.password" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                    </td>
                    <td>
                      <legend>Jelszó megerősítése*:</legend>
                      <input type="password" value="" name="passwordtwo" v-model="user.passwordTwo">
                      <i v-if="!localUserError.passwordTwo" style="color: green;" class="material-icons">check_circle_outline</i>
                      <i title="Kérlek add meg a kersztneved." v-if="localUserError.passwordTwo" style="color: #ed1b24;" class="material-icons">notifications_none</i>
                    </td>
                  </tr>
                </table>
                <p><input type="checkbox" name="eula" value="1" v-model="user.eula"> Elolvastam és elfogadom a <a href="#">Szabályzatot</a>,
                  valamint az <a href="#">Adatvédelmi tájékoztatót</a>.</p>
                <p><input type="checkbox" name="gdpr" value="1" v-model="user.correctAge"> Nyilatokzom, hogy elmúltam 18 éves.</p>
                <div style="align-items: center;">
                  <!-- <button id="regbutt" @click="handleSubmit">Regisztráció</button> -->
                  <button id="regbutt" :disabled="canEnableRegistration" @click="handleSubmit">Regisztráció</button>
                </div>
              </form>
      </div>
    </div>
</template>

<script>
import GridLoader from "vue-spinner/src/GridLoader.vue";

export default {
  name: 'RegistrationForm',
  components: {
    GridLoader
  },
  props: {
  },
  data() {
    return {
      spinner: {
        loading: false,
        color: "blue",
        size: "50px"
      },
      user: {
          email: '',
          password: '',
          passwordTwo: '',
          firstName: '',
          lastName: '',
          zipCode: '',
          city: '',
          street: '',
          houseNumber: '',
          phoneNumber: '',
          eula: null,
          correctAge: null
        },
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
        eula: true,
        correctAge: true
      },
      preventSendReg: false,
      succesMessage: null,
      error: null
    }
  }, 
  methods: {
    handleSubmit: async function(e){
      e.preventDefault();
      this.spinner.loading = true;
      this.error = null;
      try {
        let response = await this.$http.post('/reg', {user: this.user});
        if(response.data.succesMessage) {
          this.succesMessage = response.data.succesMessage;
          this.spinner.loading = false;
          return;
        } else if (response.data.error) {
          this.error = response.data.error;
          this.spinner.loading = false;
          return;
        }
      } catch (err) {
        this.spinner.loading = false;
        console.log(err);
        return; 
      }
    }
  },
  computed: {
    canEnableRegistration: function() {
      var valuesOfErrors = Object.values(this.localUserError);
      var value = valuesOfErrors.includes(true);
      return value;
    }
  },
  watch: {
    user: {
      handler: function(val) {
        console.log(val);

        if (val.firstName && val.firstName.length >= 2) {
          this.localUserError.firstName = false;
        } else {
          this.localUserError.firstName = true;
        }

        if (val.lastName && val.lastName.length >= 2) {
          this.localUserError.lastName = false;
        } else {
          this.localUserError.lastName = true;
        }

        if (val.zipCode && val.zipCode.length >= 4) {
          this.localUserError.zipCode = false;
        } else {
          this.localUserError.zipCode = true;
        }

        if (val.city && val.city.length >= 2) {
          this.localUserError.city = false;
        } else {
          this.localUserError.city = true;
        }

        if (val.street && val.street.length >= 2) {
          this.localUserError.street = false;
        } else {
          this.localUserError.street = true;
        }

        if (val.houseNumber && val.houseNumber.length >= 1) {
          this.localUserError.houseNumber = false;
        } else {
          this.localUserError.houseNumber = true;
        }

        var regexPatt = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        var isValidEmail = regexPatt.test(val.email);

        if (!isValidEmail) {
          this.localUserError.email = true;
        }

        if (isValidEmail) {
          this.localUserError.email = false;
        }

        if (val.password && val.password.length >= 6) {
          this.localUserError.password = false;
        } else {
          this.localUserError.password = true;
        }

        if (val.passwordTwo && val.passwordTwo.length >= 6) {
          this.localUserError.passwordTwo = false;
        } else {
          this.localUserError.passwordTwo = true;
        }

        if (val.phoneNumber && val.phoneNumber.length >= 9) {
          this.localUserError.phoneNumber = false;
        } else {
          this.localUserError.phoneNumber = true;
        }

        if (val.eula) {
          this.localUserError.eula = false;
        } else {
          this.localUserError.eula = true;
        }

        if (val.correctAge) {
          this.localUserError.correctAge = false;
        } else {
          this.localUserError.correctAge = true;
        }


        // this.canEnableRegistration();
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

.v-spinner {
  margin: 0px auto;
}

</style>


