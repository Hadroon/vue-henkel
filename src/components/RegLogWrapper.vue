<template>
  <div>
    <div v-if="!this.authenticated.auth" id="logic" class="grid-forms">
      <RegistrationForm/>
      <LogInForm :authenticated="authenticated" />
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
    props: {
      authenticated: Object
    },
    data() {
      return {
      }
    }  
}
</script>

<style>
</style>
