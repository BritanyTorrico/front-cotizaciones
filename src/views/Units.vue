<template>
  <div class="unit-container">
      <InboxUnidad/>
  </div>
</template>

<script>
import InboxUnidad from '../components/unidad_gasto/Vista/InboxUnidad.vue'

export default {
  components: { InboxUnidad },
  name: "Unidades"
}
</script>

<style scoped>
.unit-container{
    margin: 2rem;
    margin-top: 0;
}
</style>