<template>
  <div class="filter-container">
      <div class="quotation-filter">
          <Options @sendinboxdata="passData($event)" @senditems="passItems($event)"/>
          <InboxFiltro :inboxData="inboxData" :items="inboxItems"/>
      </div>
  </div>
</template>

<script>
import InboxFiltro from '../components/filtro_cotizacion/InboxFiltro.vue';
import Options from '../components/filtro_cotizacion/Options.vue'
export default {
    name: "QuotationFilter",
  components: { Options, InboxFiltro },
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
  }
}
</script>

<style scoped>
.quotation-filter{
  background: #46b1c969;
}
</style>