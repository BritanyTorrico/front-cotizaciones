<template>
  <div>
    <div class="contenedor" v-if="this.permisoCrearUsuario">
      <EditarUsuario />
    </div>
  </div>
</template>

<script>
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
  display: block;
  padding: 2.5% 8% 5% 8%;
  background-color: #46b1c95b;
  margin-top: 0;
}
</style>
