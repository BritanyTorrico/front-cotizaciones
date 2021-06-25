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
  padding: 50px 200px 50px 200px;
  background-color: #46b1c95b;
  margin-top: 0;
  min-height: 550px;
}
</style>
