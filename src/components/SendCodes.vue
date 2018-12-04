<template>
  <div>
    <div class="left">
      <p v-if="this.message">{{this.message}}</p>
      <form action="/login" method="post">
        <div class="form-group">
          <legend>AP kod:</legend>
          <input type="text" class="form-control" name="ap" v-model="ap">
        </div>
        <div class="form-group">
          <legend>Vásárlás dátuma:</legend>
          <input type="text" class="form-control" name="dateofbuy" v-model="dateOfBuy">
        </div>
        <button
          style="item-align: center;"
          class="btn btn-warning btn-lg"
          @click="handleSubmit">Beküldés</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendCodes",
  props: {
    authenticated: Object
  },
  data() {
    return {
      ap: null,
      dateOfBuy: null,
      message: null
    }
  },
  methods: {
    handleSubmit: async function(e){
      e.preventDefault();
      // this.spinner.loading = true;
      // this.error = null;
      try {
        let response = await this.$http.get('/api/token');
        console.log(response);
        if(response.data.message) {
          this.message = response.data.message;
          // this.spinner.loading = false;
          return;
        } else if (response.data.error) {
          this.error = response.data.error;
          this.spinner.loading = false;
          return;
        }
      } catch (err) {
        // this.spinner.loading = false;
        console.log(err);
        return; 
      }
    }
  }
};
</script>

<style scoped>
</style>
