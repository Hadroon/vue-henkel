<template>
  <div v-if="isAdmin">

    <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">Home</span>
          <div class="mdl-layout-spacer"></div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
            <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
              <i class="material-icons">search</i>
            </label>
            <div class="mdl-textfield__expandable-holder">
              <input class="mdl-textfield__input" type="text" id="search">
              <label class="mdl-textfield__label" for="search">Enter your query...</label>
            </div>
          </div>
          <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
            <i class="material-icons">more_vert</i>
          </button>
          <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
            <li class="mdl-menu__item">About</li>
            <li class="mdl-menu__item">Contact</li>
            <li class="mdl-menu__item">Legal information</li>
          </ul>
        </div>
      </header>
      <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header class="demo-drawer-header">
          <!-- <img src="images/user.jpg" class="demo-avatar"> -->
          <div class="demo-avatar-dropdown">
            <span>hello@example.com</span>
            <div class="mdl-layout-spacer"></div>
            <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
              <i class="material-icons" role="presentation">arrow_drop_down</i>
              <span class="visuallyhidden">Accounts</span>
            </button>
            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
              <li class="mdl-menu__item">hello@example.com</li>
              <li class="mdl-menu__item">info@example.com</li>
              <li class="mdl-menu__item"><i class="material-icons">add</i>Add another account...</li>
            </ul>
          </div>
        </header>
        <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</a>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Inbox</a>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</a>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</a>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Updates</a>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>Promos</a>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</a>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</a>
          <div class="mdl-layout-spacer"></div>
          <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
        </nav>
      </div>
      <main class="mdl-layout__content mdl-color--grey-100">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <div v-if="!loading">
              <div class="cards-wrapper">
                <div class="my-card bg-green">
                  <i class="material-icons">people</i>
                  <p>Egyedi játékosok száma:</p>
                  <h1>{{datas[1]}}</h1>
                </div>
                <div class="my-card bg-green-blue">
                  <i class="material-icons">assignment_turned_in</i>
                  <p>Pályázatok száma:</p>
                  <h1>{{datas[2]}}</h1>
                </div>
              </div>
              <div style="clear: both;"></div>
              <hr>
              <div style="margin-top: 20px;">
                <p>Napi beküldések eloszlása:</p>
                <line-chart :data="datas[0]" :options="{ responsive: true, spanGaps: false }"></line-chart>
              </div>
              <hr>
              <div style="margin-top: 20px;">
                <p>Beküldések száma hányszor (kell jobb megnevezés): </p>
                <column-chart :data="datas[3]"></column-chart>
              </div>
              <hr>
              <div style="margin-top: 20px;">
                  <form id="search">
                    Keresés <input name="query" v-model="filterKey">
                  </form>
                <table class="mdl-data-table">
                  <thead>
                    <tr>
                      <th @click="sort('dateOfSubmission')">Beküldés dátuma 
                        <i class="material-icons" :class="{ active: currentSort == 'dateOfSubmission'}">{{currentSortDir == 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'}}</i>
                      </th>
                      <th @click="sort('email')">Email cím 
                        <i class="material-icons" :class="{ active: currentSort == 'email'}">{{currentSortDir == 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'}}</i>
                      </th>
                      <th @click="sort('dateOfPurchase')">Vásárlás dátuma 
                        <i class="material-icons" :class="{ active: currentSort == 'dateOfPurchase'}">{{currentSortDir == 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'}}</i>
                      </th>
                      <th @click="sort('apCode')">AP kód 
                        <i class="material-icons" :class="{ active: currentSort == 'apCode'}">{{currentSortDir == 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'}}</i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="submission in sortedSubmissions" :key="submission._id">
                      <td>{{submission.dateOfSubmission}}</td>
                      <td>{{submission.email}}</td>
                      <td>{{submission.dateOfPurchase}}</td>
                      <td>{{submission.apCode}}</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                <button @click="prevPage">Elöző</button> 
                <span> {{this.currentPage}} </span>
                <button @click="nextPage">Következő</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
     
  </div>
</template>

<script>
// import LineChart from './LineChart';

export default {
  name: 'dashboard',
  components: {
    // LineChart
  }, 
  data() {
    return {
      message: null,
      submissions: null,
      isAdmin: false,
      datas: Array,
      loading: true,
      currentSort:'dateOfSubmission',
      currentSortDir:'asc',
      pageSize:10,
      currentPage:1,
      filterKey: undefined,
    }
  },
  created() {
    this.check();
    this.loadSubmissions();
  },
  methods: {
    loadSubmissions: async function() {
      try {
        let response = await this.$http.get("/admin/getsubmissions");
        console.log(response);
        // console.log(response.data.datas.dateOfPurchaseChartData);
        if (response.data.error) {
          this.message = response.data.error;
          return;
        }
        if (response.data.datas) {
          this.datas = response.data.datas;
          let localSubmissions = response.data.datas[4];
          for (let submission of localSubmissions) {
            submission.dateOfSubmission = this.formatDate(submission.dateOfSubmission);
            submission.dateOfPurchase = this.formatDate(submission.dateOfPurchase);
          }
          this.submissions = localSubmissions;
          this.loading = false;
          return; 
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    check: async function() {
      try {
        let response = await this.$http.get("/admin/check");
        console.log(response);
        if (response.data.error) {
          return this.$router.push('/');
        }
        this.isAdmin = response.data.isAdmin;
        return;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    formatDate: function (date) {
      let d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      let formatedDate = [year, month, day].join('-');

      let hour = d.getHours();
      if (hour.length < 2) hour = '0' + month;

      let minutes = d.getMinutes();
      if (minutes.length < 2) minutes = '0' + month;
      return formatedDate + ' ' + hour + ':' + minutes;
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.datas[4].length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
  },
  computed:{
    sortedSubmissions:function() {

      console.log('lefutok');

      let data = this.submissions;
      let filterKey = this.filterKey && this.filterKey.toLowerCase()

      if (filterKey) {
        data = this.submissions.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }

      return data.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  }
}
</script>

<style scoped>

th i {
  color: #000000;
  position: relative;
  top: 9px;
  opacity: 0;
}

th i.active {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.desc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

th {
  cursor:pointer;
  color: #000000;
}

.mychart {
  width: 500px;
}

.cards-wrapper {
  margin-top: 20px;
}

.my-card {
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,.21);
  max-width: 300px;
  min-width: 150px;
  float: left;
  box-sizing: border-box;
  margin-right: 15px;
  min-height: 80px;
  padding: 10px;
  color: #ffffff;
}

.my-card p, i {
  color: #ffffff;
}

.my-card h1 {
  margin: 0px;
  text-align: center;
}

.bg-green {
  background-color: rgb(0, 178, 151);
}

.bg-green-blue {
  background-color: rgb(33, 150, 243);
}


html, body {
  font-family: 'Roboto', 'Helvetica', sans-serif;
  color: #757575;
}

p {
  color: #757575;
}
.demo-avatar {
  width: 48px;
  height: 48px;
  border-radius: 24px;
}
.demo-layout .mdl-layout__header .mdl-layout__drawer-button {
  color: rgba(0, 0, 0, 0.54);
}
.mdl-layout__drawer .avatar {
  margin-bottom: 16px;
}
.demo-drawer {
  border: none;
}
/* iOS Safari specific workaround */
.demo-drawer .mdl-menu__container {
  z-index: -1;
}
.demo-drawer .demo-navigation {
  z-index: -2;
}
/* END iOS Safari specific workaround */
.demo-drawer .mdl-menu .mdl-menu__item {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}
.demo-drawer-header {
  box-sizing: border-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  padding: 16px;
  height: 151px;
}
.demo-avatar-dropdown {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  width: 100%;
}

.demo-navigation {
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
}
.demo-layout .demo-navigation .mdl-navigation__link {
  display: -webkit-flex !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  color: rgba(255, 255, 255, 0.56);
  font-weight: 500;
}
.demo-layout .demo-navigation .mdl-navigation__link:hover {
  background-color: #00BCD4;
  color: #37474F;
}
.demo-navigation .mdl-navigation__link .material-icons {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.56);
  margin-right: 32px;
}

.demo-content {
  max-width: 1080px;
}

.demo-charts {
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}
.demo-chart:nth-child(1) {
  color: #ACEC00;
}
.demo-chart:nth-child(2) {
  color: #00BBD6;
}
.demo-chart:nth-child(3) {
  color: #BA65C9;
}
.demo-chart:nth-child(4) {
  color: #EF3C79;
}
.demo-graphs {
  padding: 16px 32px;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-align-items: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
}
/* TODO: Find a proper solution to have the graphs
 * not float around outside their container in IE10/11.
 * Using a browserhacks.com solution for now.
 */
_:-ms-input-placeholder, :root .demo-graphs {
  min-height: 664px;
}
_:-ms-input-placeholder, :root .demo-graph {
  max-height: 300px;
}
/* TODO end */
.demo-graph:nth-child(1) {
  color: #00b9d8;
}
.demo-graph:nth-child(2) {
  color: #d9006e;
}

.demo-cards {
  -webkit-align-items: flex-start;
      -ms-flex-align: start;
          align-items: flex-start;
  -webkit-align-content: flex-start;
      -ms-flex-line-pack: start;
          align-content: flex-start;
}
.demo-cards .demo-separator {
  height: 32px;
}
.demo-cards .mdl-card__title.mdl-card__title {
  color: white;
  font-size: 24px;
  font-weight: 400;
}
.demo-cards ul {
  padding: 0;
}
.demo-cards h3 {
  font-size: 1em;
}
.demo-updates .mdl-card__title {
  min-height: 200px;
  /* background-image: url('images/dog.png'); */
  background-position: 90% 100%;
  background-repeat: no-repeat;
}
.demo-cards .mdl-card__actions a {
  color: #00BCD4;
  text-decoration: none;
}

.demo-options h3 {
  margin: 0;
}
.demo-options .mdl-checkbox__box-outline {
  border-color: rgba(255, 255, 255, 0.89);
}
.demo-options ul {
  margin: 0;
  list-style-type: none;
}
.demo-options li {
  margin: 4px 0;
}
.demo-options .material-icons {
  color: rgba(255, 255, 255, 0.89);
}
.demo-options .mdl-card__actions {
  height: 64px;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}

</style>

