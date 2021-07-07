<template>
  <div class="register" v-if="this.permisoCrearRol">
    <div class="register_container">
      <EditarRol class="register_item" />
    </div>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
import EditarRol from "@/components/rol/Edit/EditarRol.vue";
export default {
  name: "EditRole",
  components: {
    EditarRol,
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
  min-height: 100vh;
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
