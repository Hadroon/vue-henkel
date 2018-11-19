<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <MainView />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import MainView from './components/MainView.vue';

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
