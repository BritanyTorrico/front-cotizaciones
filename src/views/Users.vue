<template>
<div v-if="permisoCrearUsuario">
  <div class="user-container">
      <InboxUsuarios />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import InboxUsuarios from '../components/User/Vista/InboxUsuarios.vue'
export default {
  components: { InboxUsuarios },
  name: "Usuarios",
  computed: {
    ...mapState(["permisoCrearUsuario"])
  },
  mounted(){
    if (!this.permisoCrearUsuario){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.user-container{
    margin: 2rem;
    margin-top: 0;
}
</style>