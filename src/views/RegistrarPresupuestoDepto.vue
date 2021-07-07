<template>
  <div class="presu-depto" v-if="permisoPresupuestoDep">
    <presupuesto-departamento></presupuesto-departamento>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PresupuestoDepartamento from "@/components/Presupuestos/PresupuestoDepartamento.vue";
export default {
  components: { PresupuestoDepartamento },
  name: "RegistrarPresupuestoDepto",
  computed: {
    ...mapState(["permisoPresupuestoDep"]),
  },
};
</script>

<style scoped>
.presu-depto {
  padding: 2.5% 14% 5% 14%;
  background-color: #46b1c95b;
  margin-top: 0;
}
@media (max-width: 800px) {
  .presu-depto {
    padding: 0%;
  }
}
</style>
