<template>
  <div class="right">
    <p>Beküldéseim:</p>
    {{ this.authenticated.name }}
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
