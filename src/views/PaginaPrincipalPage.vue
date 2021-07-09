<template>
  <div class="contenedor-paginal">
    <principal></principal>
  </div>
</template>

<script defer>
import Principal from "@/components/Pagina_Inicial/Principal.vue";

export default {
  components: { Principal },
  name: "PaginaPrincipalPage",
};
</script>

<style scoped>
.contenedor-paginal {
  background: #f7f6f6;
}
</style>
