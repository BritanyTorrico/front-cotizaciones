<template>
  <div>
    <div class="contenedor" v-if="this.permisoCrearUsuario">
      <register-user />
    </div>
  </div>
</template>

<script>
import RegisterUser from "@/components/User/RegisterUser.vue";
import { mapState } from "vuex";
export default {
  components: { RegisterUser },
  computed: {
    ...mapState(["permisoCrearUsuario"]),
  },
  mounted() {
    if (!this.permisoCrearUsuario) {
      this.$router.push("/");
    }
  },
  name: "RegisterUserPage",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
