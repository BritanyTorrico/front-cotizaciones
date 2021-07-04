<template>
<div v-if="permisoCrearRol">
  <div class="roles-container">
      <InboxRoles/>
  </div>
</div>
</template>

<script>
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
    margin: 2rem;
    margin-top: 0;
}
</style>