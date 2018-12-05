<template>
  <div>
    <div class="left">
      <p>valami</p>
      <p v-if="this.message">{{this.message}}</p>
      <form action="/login" method="post">
        <datetime v-model="date" type="datetime" zone="local" format="yyyy-MM-dd HH:mm" class="theme-red" auto="true"></datetime>
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
      message: null,
      date: null
    }
  },
  methods: {
    handleSubmit: async function(e){
      e.preventDefault();
      // this.spinner.loading = true;
      // this.error = null;
      console.log(this.date);
      console.log(typeof this.date);
      let dateObj = new Date(this.date);
      console.log(dateObj);
      console.log(typeof dateObj);
      console.log(dateObj.toUTCString());
      console.log(dateObj.toString());
      console.log(dateObj.getUTCHours());
      console.log(dateObj.getHours());
      console.log('========');
      console.log(Date.parse(this.date));
      console.log(Date.parse(dateObj.toUTCString()));
      console.log(Date.parse(dateObj.toString()));

      return;
      console.log('haho');
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

<style>

.vdatetime-popup {
  z-index: 1000;
  color: #444;
}

.theme-red .vdatetime-popup__header,
.theme-red .vdatetime-calendar__month__day--selected > span > span,
.theme-red .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #ed1b24;
}

.theme-red .vdatetime-year-picker__item--selected,
.theme-red .vdatetime-time-picker__item--selected,
.theme-red .vdatetime-popup__actions__button {
  color: #444;
}

</style>
