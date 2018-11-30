<template>
  <div id="logic" class="grid-forms">
    <div class="left" style="height: 200px; background: green;">
      <p>valami {{this.authenticated.name}}</p>
      {{ this.authenticated.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SendCodes",
  props: {
    authenticated: Object
  }
};
</script>

<style scoped>
</style>
