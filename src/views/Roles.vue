<template>
<div v-if="permisoCrearRol">
  <div class="roles-container">
      <InboxRoles/>
  </div>
</div>
</template>

<script defer>
import { mapState } from 'vuex'
import InboxRoles from '../components/rol/Vista/InboxRoles.vue'
export default {
  components: { InboxRoles },
  name:'Roles',
  computed:{
    ...mapState(["permisoCrearRol"])
  },
  mounted(){
    if(!this.permisoCrearRol){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.roles-container{
  min-height: 100vh;
    margin: 2rem;
    margin-top: 0;
}
</style>