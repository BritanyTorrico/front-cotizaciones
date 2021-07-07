<template>
  <div class="contenedor-historial1" v-if="permisoPresupuestoDep">
    <historial-presupuestos-dep></historial-presupuestos-dep>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HistorialPresupuestosDep from "../components/Presupuestos/HistorialPresupuestosDep.vue";
export default {
  components: { HistorialPresupuestosDep },
  name: "HistorialPresupuestoDepPage",
  computed: {
    ...mapState(["permisoPresupuestoDep"]),
  },
};
</script>

<style scoped>
.contenedor-historial1 {
  padding: 2.5% 14% 5% 14%;
  background-color: #46b1c95b;
  margin-top: 0;
  min-height: 90vh;
}
@media (max-width: 800px) {
  .contenedor-historial1 {
    padding: 0%;
  }
}
</style>
