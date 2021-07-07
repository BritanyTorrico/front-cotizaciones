<template>
  <div class="contenedor-pagina">
  <acercade></acercade>
  <informacion></informacion>
  </div>
</template>

<script>

import Acercade from "../components/Pagina_Inicial/acercade.vue";
import Informacion from "../components/Pagina_Inicial/informacion.vue"
export default {
  components: {Acercade, Informacion},
  name: "AcercadePage",
};
</script>

<style scoped>
.contenedor-paginal {
  background: #f7f6f6;
}
</style>
