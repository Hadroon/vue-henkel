<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <MainView /> -->

    <router-view/>
  </div>
</template>

<script>
import MainView from './components/MainView.vue';
import Admin from './components/Admin.vue';

export default {
  name: 'app',
  components: {
    MainView
  }
}
</script>

<style>
#app {
  padding: 0px;
  margin: 0px;
}
</style>
