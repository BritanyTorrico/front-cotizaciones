<template>
  <div class="soli-container">
    <div class="soli-filter">
      <Options @sendinboxdata="passData($event)" @senditems="passItems($event)"/>
    </div>
    <div class="soli-inbox">
      <InboxSolicitudes :inboxData="inboxData" :items="inboxItems"/>
    </div>
  </div>
</template>

<script>
import Options from '../components/Solicitud/Vista/Options.vue'
import InboxSolicitudes from '../components/Solicitud/Vista/InboxSolicitudes.vue'
export default {
  components: { InboxSolicitudes, Options },
  data(){
      return{
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
    }
  },
  name: "Solicitudes",
}
</script>

<style scoped>
.soli-container{
    margin: 2rem;
    margin-top: 0;
}
.soli-filter{
  background: #46b1c969;
}
.soli-inbox{
  background: #c4dee4;
}
</style>