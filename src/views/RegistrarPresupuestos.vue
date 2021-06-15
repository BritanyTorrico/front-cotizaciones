<template>
  <div class="contenedor-presupuestos">
    <presupuestor-form></presupuestor-form>
  </div>
</template>

<script>
import PresupuestorForm from "../components/Presupuestos/PresupuestorForm.vue";
export default {
  name: "RegistrarPresupuestos",
  components: { PresupuestorForm },
};
</script>

<style scoped>
.contenedor-presupuestos {
  padding: 50px 200px 50px 200px;
  background-color: #46b1c95b;
  margin-top: 0;
}
</style>
