<template>
  <div id="logic" class="grid-forms">
    <div class="left" style="height: 400px; background: green;">
      <p>name: {{this.authenticated.name}}</p>
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
