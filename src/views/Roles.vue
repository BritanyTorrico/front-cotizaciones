<template>
  <div class="roles-container">
      <InboxRoles/>
  </div>
</template>

<script>
import InboxRoles from '../components/rol/Vista/InboxRoles.vue'
export default {
  components: { InboxRoles },
    name:'Roles'
}
</script>

<style scoped>
.roles-container{
    margin: 2rem;
    margin-top: 0;
}
</style>