<template>
  <div class="register" v-if="this.permisoUnidadDeGasto">
    <div class="register_container">
      <RegistroUnidad class="register_unit" />
    </div>
  </div>
</template>

<script defer>
import RegistroUnidad from "@/components/unidad_gasto/RegistroUnidad.vue";
import { mapState } from "vuex";
export default {
  name: "RegistroUnidadGasto",
  components: {
    RegistroUnidad,
  },
  computed: {
    ...mapState(["permisoUnidadDeGasto"]),
  },
  mounted() {
    if (!this.permisoUnidadDeGasto) {
      this.$router.push("/");
    }
  },
};
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
@media (max-width: 800px) {
  .register_container {
    padding: 0%;
  }
}
</style>
