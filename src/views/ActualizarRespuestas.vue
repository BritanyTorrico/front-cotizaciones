<template>
<div v-if="this.permisoCotizacion">
  <div class="response-register">
      <EditarCotizacion/>
  </div>
</div>
</template>

<script defer>
import { mapState } from "vuex";
import EditarCotizacion from '../components/cotizacion/Edit/EditarCotizacion.vue'
export default {
  components: { EditarCotizacion },
  computed: {
    ...mapState(["permisoCotizacion"]),
  },
  mounted() {
    if (!this.permisoCotizacion) {
      this.$router.push("/");
    }
  },

}
</script>

<style scoped>
.response-register{
  min-height: 100vh;
    background-color: #46b1c95b;
  margin-top: 0;
}
</style>