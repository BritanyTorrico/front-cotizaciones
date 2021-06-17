<template>
  <div class="inicio">
    <iniciar-sesion />
  </div>
</template>

<script>
import IniciarSesion from "../components/Login/IniciarSesion.vue";
export default {
  components: {
    IniciarSesion,
  },
  name: "Login",
};
</script>

<style scoped>
.inicio {
  padding: 0;
  margin: 0;
}
</style>
