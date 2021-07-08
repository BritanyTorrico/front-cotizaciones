<template>
<div v-if="permisoUnidadDeGasto">
  <div class="unit-container">
      <InboxUnidad/>
  </div>
</div>
</template>

<script defer>
import InboxUnidad from '../components/unidad_gasto/Vista/InboxUnidad.vue';
import { mapState } from "vuex";

export default {
  components: { InboxUnidad },
  name: "Unidades",
  computed: {
    ...mapState(["permisoUnidadDeGasto"])
  },
  mounted(){
    if (!this.permisoUnidadDeGasto){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.unit-container{
  min-height: 100vh;
    margin: 2rem;
    margin-top: 0;
}
</style>