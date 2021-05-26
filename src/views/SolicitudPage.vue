<template>
  <div class="soli_container" v-if="this.permisoSolicitud">
    <solicitud-datos />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SolicitudDatos from "../components/Solicitud/SolicitudDatos.vue";
export default {
  components: { SolicitudDatos },
  name: "SolicitudPage",
  computed: {
    ...mapState(["permisoSolicitud"]),
  },
};
</script>

<style scoped>
.soli_container {
  padding: 50px 300px 50px 300px;
  background-color: #46b1c95b;
  margin-top: 0;
}
</style>
