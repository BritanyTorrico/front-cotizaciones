<template>
  <div class="presu-depto">
    <presupuesto-departamento></presupuesto-departamento>
  </div>
</template>

<script>
import PresupuestoDepartamento from "@/components/Presupuestos/PresupuestoDepartamento.vue";
export default {
  components: { PresupuestoDepartamento },
  name: "RegistrarPresupuestoDepto",
};
</script>

<style scoped>
.presu-depto {
  padding: 50px 200px 50px 200px;
  background-color: #46b1c95b;
  margin-top: 0;
  min-height: 550px;
}
</style>
