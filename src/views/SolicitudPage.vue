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
  mounted(){
    if (!this.permisoSolicitud){
      this.$route.push("/")
    }
  }
};
</script>

<style scoped>
.soli_container {
  padding: 50px 200px 50px 200px;
  background-color: #46b1c95b;
  margin-top: 0;
}
</style>
