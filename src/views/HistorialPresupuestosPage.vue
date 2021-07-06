<template>
  <div class="contenedor-historial1" v-if="permisoPresupuestoUnidad">
    <historial-presupuestos></historial-presupuestos>
  </div>
</template>

<script>
import HistorialPresupuestos from "../components/Presupuestos/HistorialPresupuestos.vue";
import { mapState } from "vuex";
export default {
  name: "HistorialPresupuestosPage",
  components: { HistorialPresupuestos },
  computed: {
    ...mapState(["permisoPresupuestoUnidad"]),
  },
};
</script>

<style scoped>
.contenedor-historial1 {
  padding: 2.5% 14% 5% 14%;
  background-color: #46b1c95b;
  margin-top: 0;
  min-height: 100vh;
}
@media (max-width: 800px) {
  .contenedor-historial1 {
    padding: 0%;
  }
}
</style>
