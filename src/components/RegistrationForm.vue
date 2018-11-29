<template>
    <div>
      <div class="left" v-if="succesMessage">
        <p>
          {{ succesMessage }}
        </p>
      </div>

      <div class="left" v-if="!succesMessage">
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
                <p><input type="checkbox" name="eula" value="1" v-model="user.eula"> Elolvastam és elfogadom a <a href="#">Szabályzatot</a>,
                  valamint az <a href="#">Adatvédelmi tájékoztatót</a>.</p>
                <p><input type="checkbox" name="gdpr" value="1" v-model="user.correctAge"> Nyilatokzom, hogy elmúltam 18 éves.</p>
                <div style="align-items: center;">
                  <button id="regbutt" @click="handleSubmit">Regisztráció</button>
                  <!-- <button id="regbutt" :disabled="checkValami" @click="handleSubmit">Regisztráció</button> -->
                </div>
              </form>
      </div>
    </div>
</template>



<script>

export default {
  name: 'RegistrationForm',
    components: {
    },
  props: {
  },
  data() {
    return {
      user: {
          email: null,
          password: null,
          passwordTwo: null,
          firstName: null,
          lastName: null,
          zipCode: null,
          city: null,
          street: null,
          houseNumber: null,
          phoneNumber: null,
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
        acceptedToU: true,
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
      this.error = null;
      await this.$http.post('/reg', {
      user: this.user
      })
      .then(response => {
        if (response.data.error) {
          return this.error = response.data.error;
        }
        if (response.data.succesMessage) {
          this.succesMessage = response.data.succesMessage;
        }
          })
          .catch(function (error) {
              console.error(error.response);
              console.error(error.response.data);
          });
        },

    checkValami: function() {
      for (var key in this.localUserError) {
        // if (this.localUserError.hasOwnProperty(key)) {
        //   console.log(key + " -> " + this.localUserError[key]);
        if (this.localUserError[key] === true) return this.preventSendReg = true;
        // }
        // console.log(key);
        // console.log(this.localUserError[key]);
      }
        // return this.preventSendReg = false;
        this.$set(this.preventSendReg, 'b', 2);
    }
  },
  computed: {
  },
  watch: {
    user: {
      handler: function(val) {

        if (val.firstName && val.firstName.length >= 4) {
          this.localUserError.firstName = false;
        } else {
          this.localUserError.firstName = true;
        }

        if (val.lastName && val.lastName.length >= 4) {
          this.localUserError.lastName = false;
        } else {
          this.localUserError.lastName = true;
        }

        if (val.zipCode && val.zipCode.length >= 4) {
          this.localUserError.zipCode = false;
        } else {
          this.localUserError.zipCode = true;
        }

        if (val.city && val.city.length >= 4) {
          this.localUserError.city = false;
        } else {
          this.localUserError.city = true;
        }

        if (val.street && val.street.length >= 4) {
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
            // return done(null, false, req.flash('signupMessage', 'Kérlek ellenőrizd a megadott email címet.'));
        }

        if (isValidEmail) {
          this.localUserError.email = false;
            // return done(null, false, req.flash('signupMessage', 'Kérlek ellenőrizd a megadott email címet.'));
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


        // console.log('Ez az every: ');
        // console.log(this.localUserError.every(val => val === false));


        this.checkValami();
        
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


