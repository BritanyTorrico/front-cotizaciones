<template>
  <div class="contenedor-paginal">
    <v-portada></v-portada>
    <pagina-principal></pagina-principal>
    <avisos></avisos>
    <contacto></contacto>
  </div>
</template>

<script defer>
import PaginaPrincipal from "@/components/Pagina_Inicial/PaginaPrincipal.vue";
import VPortada from "../components/Pagina_Inicial/VPortada.vue";
import Avisos from "../components/Pagina_Inicial/Avisos.vue";
import Contacto from "../components/Pagina_Inicial/Contacto.vue"; 
export default {
  components: { PaginaPrincipal, VPortada, Avisos, Contacto },
  name: "PaginaPrincipalPage",
};
</script>

<style scoped>
.contenedor-paginal {
  background: #f7f6f6;
}
</style>
