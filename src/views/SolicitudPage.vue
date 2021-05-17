<template>
  <div class="soli_container">
    <solicitud-datos />
  </div>
</template>

<script>
import SolicitudDatos from "../components/Solicitud/SolicitudDatos.vue";
export default {
  components: { SolicitudDatos },
  name: "SolicitudPage",
};
</script>

<style scoped>
.soli_container {
  padding: 50px 300px 50px 300px;
  background-color: #46b1c95b;
  margin-top: 0;
}
</style>
