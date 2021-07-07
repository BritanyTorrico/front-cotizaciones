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
  padding: 0% 35% 0% 35%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #46b1c95b;
  min-height: 90vh;
}
@media (max-width: 880px) {
  .inicio {
    padding: 0% 25% 0% 25%;
  }
}
@media (max-width: 570px) {
  .inicio {
    padding: 0% 15% 0% 15%;
  }
}
@media (max-width: 360px) {
  .inicio {
    padding: 10% 0%;
  }
}
</style>
