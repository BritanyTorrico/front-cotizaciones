<template>
  <div class="register" v-if="this.permisoEmpresa">
    <div class="register_container">
      <EditarEmpresa />
    </div>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
import EditarEmpresa from "../components/empresa/Edit/EditarEmpresa.vue";
export default {
  components: { EditarEmpresa },
  name: "EditarEmpresas",
  computed: {
    ...mapState(["permisoEmpresa"]),
  },
  mounted() {
    if (!this.permisoEmpresa) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.register {
  min-height: 100vh;
  background-color: #46b1c95b;
  margin-top: 0;
}

.register_container {
  display: block;
  padding: 2.5% 22% 5% 22%;
}
@media (max-width: 800px) {
  .register_container {
    padding: 0%;
  }
}
</style>
