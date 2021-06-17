<template>
  <div class="contenedor-presupuestos">
    <presupuesto-unidad></presupuesto-unidad>
  </div>
</template>

<script>
import PresupuestoUnidad from "../components/Presupuestos/PresupuestoUnidad.vue";
export default {
  name: "RegistrarPresupuestos",
  components: { PresupuestoUnidad },
};
</script>

<style scoped>
.contenedor-presupuestos {
  padding: 50px 100px 50px 100px;
  background-color: #46b1c95b;
  margin-top: 0;
}
</style>
