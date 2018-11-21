<template>
  <div class="right">
    <h1 style="text-align: center;">Belépés</h1>
    <form action="/login" method="post">
      <div class="form-group">
        <legend>Email</legend>
        <input type="text" class="form-control" name="email" v-model="email">
      </div>
      <div class="form-group">
        <legend>Jelszó</legend>
        <input type="password" class="form-control" name="password" v-model="password">
      </div>
      <button style="item-align: center;" type="submit" class="btn btn-warning btn-lg" @click="handleSubmit">Belépés</button>
    </form>
    <p>
      <a id="forgot" href="/forgot">Elfelejtett jelszó</a>
    </p>
  </div>
</template>


<script>
export default {
  name: "LogInForm",
  props: {
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  methods: {
    handleSubmit: function(e){
      e.preventDefault();
      this.$emit('sendingData', this.email)
    }
  }
};
</script>


<style scoped>
</style>


