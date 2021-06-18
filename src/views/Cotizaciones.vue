<template>
  <div class="filter-container">
      <div class="quotation-filter">
          <Options @sendinboxdata="passData($event)" @senditems="passItems($event)"/>
      </div>
      <div class="filter-inbox">
        <InboxCot :inboxData="inboxData" :items="inboxItems"/>
      </div>
  </div>
</template>

<script>
import InboxCot from '../components/cotizacion/Vista/InboxCot.vue'
import Options from '../components/cotizacion/Vista/Options.vue'
export default {
    name: "Cotizaciones",
  components: { Options, InboxCot },
  data(){
      return{
        inboxData: [],
        inboxItems: [],
      };
  },
  methods: {
    async passData(inbox){
      this.inboxData= inbox;
    },
    async passItems(items){
      this.inboxItems= items;
    }
  }
}
</script>

<style scoped>
.quotation-filter{
  background: #46b1c969;
}
.fiter-inbox{
  background: #c4dee4;
}
</style>