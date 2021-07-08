<template>
  <div class="contenedor-presupuestos" v-if="permisoPresupuestoUnidad">
    <presupuesto-unidad></presupuesto-unidad>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
import PresupuestoUnidad from "../components/Presupuestos/PresupuestoUnidad.vue";
export default {
  name: "RegistrarPresupuestos",
  components: { PresupuestoUnidad },
  computed: {
    ...mapState(["permisoPresupuestoUnidad"]),
  },
};
</script>

<style scoped>
.contenedor-presupuestos {
  padding: 2.5% 14% 5% 14%;
  background-color: #46b1c95b;
  margin-top: 0;
  min-height: 100vh;
}
@media (max-width: 800px) {
  .contenedor-presupuestos {
    padding: 0%;
  }
}
</style>
