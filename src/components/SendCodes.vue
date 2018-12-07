<template>
  <div>
    <div v-if="this.spinner.loading" style="padding: 100px;">
      <grid-loader :loading="spinner.loading" :color="spinner.color" :size="spinner.size"></grid-loader>
    </div>
    <div v-if="!this.spinner.loading" class="left">
      <p v-if="this.message">{{this.message}}</p>
      <form action="/login" method="post" novalidate="true">
        <div class="form-group">
          <legend>AP kod:</legend>
          <input type="text" v-mask="'N########'" class="form-control" name="ap" v-model="ap">
        </div>
        <div class="form-group">
          <legend>Vásárlás dátuma:</legend>
          <datetime v-model="timeOfPurchase" type="datetime" format="yyyy-MM-dd HH:mm" class="theme-red" auto="true"></datetime>
          <!-- <input type="text" class="form-control" name="dateofbuy" v-model="dateOfBuy"> -->
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
      timeOfPurchase: null,
      newDate: null,
      spinner: {
        loading: false,
        color: "blue",
        size: "50px"
      }
    }
  },
  methods: {
    handleSubmit: async function(e){
      e.preventDefault();
      this.spinner.loading = true;
      let dateObj = new Date(this.timeOfPurchase);
      let timestampDateOfPurchase = Number(new Date(this.timeOfPurchase));

      try {
        let response = await this.$http.post('/api/submission', {
          timestampDateOfPurchase: timestampDateOfPurchase,
          ap: this.ap
        });
        console.log(response);
        if(response.data.message) {
          this.message = response.data.message;
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
