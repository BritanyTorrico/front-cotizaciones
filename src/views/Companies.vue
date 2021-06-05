<template>
  <div class="company-container">
      <InboxEmpresa/>
  </div>
</template>

<script>
import InboxEmpresa from '../components/empresa/Vista/InboxEmpresa.vue'

export default {
  components: { InboxEmpresa },
  name: "Empresas"
}
</script>

<style scoped>
.company-container{
    margin: 2rem;
    margin-top: 0;
}
</style>