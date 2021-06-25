<template>
  <div v-if="this.permisoEmpresa">
  <div class="company-container">
      <InboxEmpresa/>
  </div>
  </div>
</template>

<script>
import InboxEmpresa from '../components/empresa/Vista/InboxEmpresa.vue'
import { mapState } from "vuex";

export default {
  
  components: { InboxEmpresa },
  computed: {
    ...mapState(["permisoEmpresa"]),
  },
  mounted() {
    if (!this.permisoEmpresa) {
      this.$router.push("/");
    }
  },
  name: "Empresas"
}
</script>

<style scoped>
.company-container{
    margin: 2rem;
    margin-top: 0;
}
</style>
