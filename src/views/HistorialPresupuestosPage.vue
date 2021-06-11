<template>
  <div class="contenedor-historial1">
    <historial-presupuestos></historial-presupuestos>
  </div>
</template>

<script>
import HistorialPresupuestos from "../components/Presupuestos/HistorialPresupuestos.vue";

export default {
  name: "HistorialPresupuestosPage",
  components: { HistorialPresupuestos },
};
</script>

<style scoped>
.contenedor-historial1 {
  padding: 50px 150px 50px 150px;
  background-color: #46b1c95b;
  margin-top: 0;
}
</style>
