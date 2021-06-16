<template>
  <div>
    <div class="contenedor" v-if="this.permisoCrearUsuario">
      <EditarUsuario/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditarUsuario from '../components/User/Edit/EditarUsuario.vue';
export default {
  components: {EditarUsuario },
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
</style>
