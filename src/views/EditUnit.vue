<template>
  <div class="register" v-if="this.permisoUnidadDeGasto">
    <div class="register_container">
        <EditarUnidad/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditarUnidad from '../components/unidad_gasto/Edit/EditarUnidad.vue';
export default {
  components: { EditarUnidad },
  name: "EditarUnidadGasto",
  computed: {
    ...mapState(["permisoUnidadDeGasto"]),
  },
  mounted() {
    if (!this.permisoUnidadDeGasto) {
      this.$router.push("/");
    }
  },
}
</script>

<style scoped>
.register {
  background-color: #46b1c95b;
  margin-top: 0;
}

.register_container {
  display: block;
  padding: 2.5% 22% 5% 22%;
}
</style>