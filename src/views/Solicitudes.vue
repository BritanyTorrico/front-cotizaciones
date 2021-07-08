<template>
<div v-if="permisoSolicitud">
  <div class="soli-container">
    <div class="soli-filter">
      <Options @sendinboxdata="passData($event)" @senditems="passItems($event)" @sendstat="passStat($event)"/>
    </div>
    <div class="soli-inbox">
      <InboxSolicitudes :inboxData="inboxData" :items="inboxItems" :loading="loading"/>
    </div>
  </div>
</div>
</template>

<script defer>
import Options from '../components/Solicitud/Vista/Options.vue'
import InboxSolicitudes from '../components/Solicitud/Vista/InboxSolicitudes.vue'
import { mapState } from 'vuex';
export default {
  components: { InboxSolicitudes, Options },
  data(){
      return{
        loading: false,
        inboxData: [],
        inboxItems: [],
      };
  },
  methods: {
    passData(inbox){
      this.inboxData= inbox;
    },
    passItems(items){
      this.inboxItems= items;
    },
    passStat(stat){
      this.loading=stat;
    }
  },
  computed: {
    ...mapState(["permisoSolicitud"])
  },
  mounted (){
    if (!this.permisoSolicitud){
      this.$router.push("/")
    }
  },
  name: "Solicitudes",
}
</script>

<style scoped>
.soli-container{
  min-height: 100vh;
    margin: 2rem;
    margin-top: 0;
}
</style>