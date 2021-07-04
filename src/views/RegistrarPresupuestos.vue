<template>
  <div class="contenedor-presupuestos" v-if="permisoPresupuestoUnidad">
    <presupuesto-unidad></presupuesto-unidad>
  </div>
</template>

<script>
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
  padding: 50px 100px 50px 100px;
  background-color: #46b1c95b;
  margin-top: 0;
}
</style>
