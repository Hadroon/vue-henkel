<template>
    <div class="left">
            <h1 style="text-align: center;">Regisztráció</h1>
            <form id="registration" action="/signup" method="post">
              <table style="width:100%">
                <tr>
                  <td>
                    <legend>Vezetéknév:</legend>
                    <input type="text" value="" v-model="user.lastName">
                  </td>
                  <td>
                    <legend>Keresztnév:</legend>
                    <input type="text" value="" v-model="user.firstName">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Irányítószám:</legend>
                    <input type="text" value="" v-model="user.zipCode">
                  </td>
                  <td>
                    <legend>Település:</legend>
                    <input type="text" value="" v-model="user.city">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Utca:</legend>
                    <input type="text" value="" v-model="user.street">
                  </td>
                  <td>
                    <legend>Házszám:</legend>
                    <input type="text" value="" v-model="user.houseNumber">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Telefon:</legend>
                    <span>+36 </span><input style="width: 80%;" type="text" value="" v-model="user.phoneNumber">
                  </td>
                  <td>
                    <legend>Email:</legend>
                    <input type="text" value="" name="email" v-model="user.email">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Jelszó:</legend>
                    <input type="text" value="" name="password" v-model="user.password">
                  </td>
                  <td>
                    <legend>Jelszó megerősítése:</legend>
                    <input type="text" value="" name="passwordtwo" v-model="user.passwordTwo">
                  </td>
                </tr>
              </table>
              <p><input type="checkbox" name="eula" value="1" v-model="user.acceptedToU"> Elolvastam és elfogadom a <a href="#">Szabályzatot</a>,
                valamint az <a href="#">Adatvédelmi tájékoztatót</a>.</p>
              <p><input type="checkbox" name="gdpr" value="1" v-model="user.correctAge"> Nyilatokzom, hogy elmúltam 18 éves.</p>
              <div style="align-items: center;">
                <!-- <input id="regbutt" style="margin: 0px auto" type="submit" value="Regisztráció"> -->
                <button id="regbutt" form="registration" value="Submit">Regisztráció</button>
              </div>
            </form>
    </div>
</template>



<script>
export default {
  name: 'RegistrationForm',
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    handleSubmit(e){
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
</style>


