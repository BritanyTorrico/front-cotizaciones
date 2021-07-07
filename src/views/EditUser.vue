<template>
  <div>
    <div class="contenedor" v-if="this.permisoCrearUsuario">
      <EditarUsuario />
    </div>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
import EditarUsuario from "../components/User/Edit/EditarUsuario.vue";
export default {
  components: { EditarUsuario },
  computed: {
    ...mapState(["permisoCrearUsuario"]),
  },
  mounted() {
    if (!this.permisoCrearUsuario) {
      this.$router.push("/");
    }
  },
  name: "EditarUsuarios",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.contenedor {
  min-height: 100vh;
  display: block;
  padding: 2.5% 18% 5% 18%;
  background-color: #46b1c95b;
  margin-top: 0;
}
@media (max-width: 800px) {
  .contenedor {
    padding: 0%;
    background: red;
  }
}
</style>
