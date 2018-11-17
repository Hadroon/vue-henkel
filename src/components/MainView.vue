<template>
      <div class="wrapper">
    <div class="header">
      <a href="/#forms" style="float:left;">
        <img style="max-width: 200px; margin-top: 4px;" src="@/assets/ap.jpg" alt="">
      </a>
      <div class="nav">
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
        <div id="logic">
          <div class="left">


          </div>
          <div></div>
        </div>
        <div id="logic" class="grid-forms">
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
                <button id="regbutt" type="submit" form="registration" value="Submit">Submit</button>
              </div>
            </form>
          </div>
          <div class="right">
            <h1 style="text-align: center;">Belépés</h1>
            <form action="/login" method="post">
              <div class="form-group">
                <legend>Email</legend>
                <input type="text" class="form-control" name="email">
              </div>
              <div class="form-group">
                <legend>Jelszó</legend>
                <input type="password" class="form-control" name="password">
              </div>
              <button style="item-align: center;" type="submit" class="btn btn-warning btn-lg">Belépés</button>
            </form>
            <p><a id="forgot" href="/forgot">Elfelejtett jelszó</a></p>
          </div>
        </div>
        <!-- <div style="clear: both;"> </div> -->
      </div>
      <div class="relative">
        <img class="separator-upper" src="@/assets/separator.png" alt="">
        <img src="@/assets/nyeremenyek_3.jpg" alt="">
        <img class="separator" src="@/assets/separator.png" alt="">
      </div>

      <div>4</div>
      <div>5</div>
      <div class="box footer">Footer</div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MainView'
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

input {
  border: none;
  /* width: 90%; */
}

td > input {
  width: 90%;
  padding: 5px;
}

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
  /* width: 50%; */
  /* float: left; */
  grid-area: left;
  padding-bottom: 100px;
}

.right {
  grid-area: right;
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
  box-shadow: 0px 2px 2px 1px rgba(211,211,211, .9);
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


</style>


