<template>
  <div class="register" v-if="this.permisoEmpresa">
    <div class="register_container">
      <CrearEmpresa class="register_empresa" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CrearEmpresa from "@/components/empresa/CrearEmpresa.vue";
export default {
  name: "CrearEmpresas",
  components: {
    CrearEmpresa,
  },
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
  background-color: #46b1c95b;
  margin-top: 0;
}
.register_container {
  display: block;
  padding: 50px 300px 50px 300px;
}
</style>
