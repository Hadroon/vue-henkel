<template>
  <div>
    <div v-if="!this.authenticated.auth" id="logic" class="grid-forms">
      <RegistrationForm/>
      <LogInForm :authenticated="authenticated" v-on:sendingData="upDate($event)"/>
    </div>

    <div v-if="this.authenticated.auth" style="height: 500px; background: green;">
      <p>valami {{this.authenticated.name}}</p>
      {{ this.authenticated.name }}
    </div>
  </div>
</template>

<script>
import RegistrationForm from './RegistrationForm';
import LogInForm from './LogInForm';

export default {
    name: 'RegLogWrapper',
    components: {
        RegistrationForm,
        LogInForm
    },
    data() {
      return {
        authenticated: {
          auth: false,
          name: null
        }
      }
    }  
}
</script>

<style>
</style>
