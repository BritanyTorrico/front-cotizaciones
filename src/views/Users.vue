<template>
  <div class="user-container">
      <InboxUsuarios />
  </div>
</template>

<script>
import InboxUsuarios from '../components/User/Vista/InboxUsuarios.vue'
export default {
  components: { InboxUsuarios },
  name: "Usuarios"
}
</script>

<style scoped>
.user-container{
    margin: 2rem;
    margin-top: 0;
}
</style>