<template>
  <div class="register" v-if="this.permisoCrearRol">
    <div class="register_container">
      <CrearRol class="register_item" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CrearRol from "@/components/rol/CrearRol.vue";
export default {
  name: "CrearRoles",
  components: {
    CrearRol,
  },
  computed: {
    ...mapState(["permisoCrearRol"]),
  },
  mounted() {
    if (!this.permisoCrearRol) {
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

@media (max-width: 860px) {
  .register_container {
    padding: 0%;
  }
}
</style>
