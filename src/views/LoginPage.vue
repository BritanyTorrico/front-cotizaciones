<template>
  <div class="inicio" v-if="!username">
    <iniciar-sesion />
  </div>
</template>

<script>
import { mapState } from "vuex";
import IniciarSesion from "../components/Login/IniciarSesion.vue";
export default {
  components: {
    IniciarSesion,
  },
  name: "Login",
  computed: {
    ...mapState(["username"]),
  },
};
</script>

<style scoped>
.inicio {
  padding: 0;
  margin: 0;
}
</style>
