<template>
    <div class="left">
            <h1 style="text-align: center;">Regisztráció</h1>
            <form id="registration" action="/signup" method="post">
              <table style="width:100%">
                <tr>
                  <td>
                    <legend>Vezetéknév:</legend>
                    <input type="text" value="">
                  </td>
                  <td>
                    <legend>Keresztnév:</legend>
                    <input type="text" value="">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Irányítószám:</legend>
                    <input type="text" value="">
                  </td>
                  <td>
                    <legend>Település:</legend>
                    <input type="text" value="">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Utca:</legend>
                    <input type="text" value="">
                  </td>
                  <td>
                    <legend>Házszám:</legend>
                    <input type="text" value="">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Telefon:</legend>
                    <span>+36 </span><input style="width: 80%;" type="text" value="">
                  </td>
                  <td>
                    <legend>Email:</legend>
                    <input type="text" value="" name="email">
                  </td>
                </tr>
                <tr>
                  <td>
                    <legend>Jelszó:</legend>
                    <input type="text" value="" name="password">
                  </td>
                  <td>
                    <legend>Jelszó megerősítése:</legend>
                    <input type="text" value="" name="passwordtwo">
                  </td>
                </tr>
              </table>
              <p><input type="checkbox" name="eula" value="1"> Elolvastam és elfogadom a <a href="#">Szabályzatot</a>,
                valamint az <a href="#">Adatvédelmi tájékoztatót</a>.</p>
              <p><input type="checkbox" name="gdpr" value="1"> Nyilatokzom, hogy elmúltam 18 éves.</p>
              <div style="align-items: center;">
                <!-- <input id="regbutt" style="margin: 0px auto" type="submit" value="Regisztráció"> -->
                <button id="regbutt" type="submit" form="registration" value="Submit">Regisztráció</button>
              </div>
            </form>
    </div>
</template>



<script>
export default {
  name: 'RegistrationForm',
  methods: {
    handleSubmit(e){
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
</style>


