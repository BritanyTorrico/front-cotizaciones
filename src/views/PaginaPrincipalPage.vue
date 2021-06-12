<template>
  <div class="contenedor-paginal">
    <div class="seccion1">
      <v-portada></v-portada>
    </div>
    <div class="seccion2">
      <pagina-principal></pagina-principal>
    </div>
    <div class="seccion3"></div>
  </div>
</template>

<script>
import PaginaPrincipal from "@/components/Pagina_Inicial/PaginaPrincipal.vue";
import VPortada from "../components/Pagina_Inicial/VPortada.vue";
export default {
  components: { PaginaPrincipal, VPortada },
  name: "PaginaPrincipalPage",
};
</script>

<style scoped>
.contenedor-paginal {
  background: #f7f6f6;
}
</style>
