<template>
  <div>
    <div v-if="this.spinner.loading" style="padding: 100px;">
      <grid-loader :loading="spinner.loading" :color="spinner.color" :size="spinner.size"></grid-loader>
    </div>
    <div v-if="!this.spinner.loading">
      <div  class="grid-forms">
        <div class="left">
          <h2 class="bold">Kódbeküldés:</h2>
          <p v-if="this.messageCode">{{this.messageCode}}</p>
          <form action="/login" method="post" novalidate="true">
            <div class="form-group">
              <legend>AP kod:</legend>
              <input type="text" v-mask="'N########'" class="form-control" name="apCode" v-model="apCode">
            </div>
            <div class="form-group">
              <legend>Vásárlás dátuma:</legend>
              <datetime v-model="timeOfPurchase" type="datetime" format="yyyy-MM-dd HH:mm" class="theme-red" auto="true"></datetime>
              <!-- <input type="text" class="form-control" name="dateofbuy" v-model="dateOfBuy"> -->
            </div>
            <p>{{checkSubmissionData}}</p>
            <button
              :disabled="checkSubmissionData"
              style="item-align: center;"
              class="btn btn-warning btn-lg"
              @click="handleSubmit">Beküldés</button>
          </form>
        </div>
        <div class="right">
          <h2 class="bold">Eddigi pályázataim ({{submissions.length}}):</h2>
          <table class="submissiontable" width="100%">
            <tr>
              <th align="left" width="35%">Beküldés ideje</th>
              <th align="left" width="30%">AP kód:</th>
              <th align="left" width="35%">Vásárlás ideje:</th>
            </tr>
            <tr v-for="submission in submissions" :key="submission._id">
              <td>{{ timestampToDate(submission.dateOfSubmission) }}</td>
              <td>{{ submission.apCode }}</td>
              <td>{{ timestampToDate(submission.dateOfPurchase) }}</td>
            </tr>
          </table>
        </div>
      </div>
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
      apCode: null,
      dateOfBuy: null,
      messageCode: null,
      timeOfPurchase: null,
      submitDisabled: true,
      submissions: null,
      spinner: {
        loading: false,
        color: "blue",
        size: "50px"
      }
    }
  },
  computed: {
    checkSubmissionData: function() {
      
      if (!this.apCode) return true;
      if (this.apCode.length != 9) return true; 
      if (this.apCode.charAt(0).toLowerCase() != 'a' && isNaN(this.apCode.charAt(0))) return true;
      if (isNaN(this.apCode.slice(1))) return true;

      return false;
    }
  },
  methods: {
    handleSubmit: async function(e){
      e.preventDefault();
      this.spinner.loading = true;
      let timestampDateOfPurchase = Number(new Date(this.timeOfPurchase));

      try {
        let response = await this.$http.post('/api/submission', {
          timestampDateOfPurchase: timestampDateOfPurchase,
          apCode: this.apCode
        });
        console.log(response);
        if(response.data.message) {
          this.messageCode = response.data.message;
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
    },
    getSubbmissions: async function() {
      // TODO: local spinner eddigi beküldéseim betöltése
      // TODO: handle error
      // this.spinner.loading = true;

      try {
        let response = await this.$http.get('/api/getsubmissions');
        console.log(response);
        if(response.data.message) {
          this.submissions = response.data.message;
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

    },
    timestampToDate(timestamp) {
      // return new Date(timestamp).toISOString();
      let date = new Date(timestamp);
      let formatedDate = date.getFullYear() + '.' +
        (date.getMonth()+1) + '.' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes();
      // datevalues = [
      //   date.getFullYear(),
      //   date.getMonth()+1,
      //   date.getDate(),
      //   date.getHours(),
      //   date.getMinutes(),
      //   date.getSeconds(),
      // ];
      return formatedDate;
    }
  },
  created() {
    console.log('created');
    this.getSubbmissions();
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

.submissiontable {
  color: #ffffff;
}

</style>
