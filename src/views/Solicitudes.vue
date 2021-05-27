<template>
  <div class="soli-container">
      <InboxSolicitudes/>
  </div>
</template>

<script>
import InboxSolicitudes from '../components/Solicitud/Vista/InboxSolicitudes.vue'
export default {
  components: { InboxSolicitudes },
  name:"Solicitudes",
}
</script>

<style scoped>
.soli-container{
    margin: 2rem;
    margin-top: 0;
}
</style>