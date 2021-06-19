<template>
  <div class="contenedor-historial1">
    <historial-presupuestos-dep></historial-presupuestos-dep>
  </div>
</template>

<script>
import HistorialPresupuestosDep from "../components/Presupuestos/HistorialPresupuestosDep.vue";
export default {
  components: { HistorialPresupuestosDep },
  name: "HistorialPresupuestoDepPage",
};
</script>

<style scoped>
.contenedor-historial1 {
  padding: 50px 150px 50px 150px;
  background-color: #46b1c95b;
  margin-top: 0;
  min-height: 600px;
}
</style>
