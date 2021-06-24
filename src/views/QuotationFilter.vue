<template>
<div v-if="permisoFiltroCotizacion">
  <div class="filter-container">
      <div class="quotation-filter">
          <Options @sendinboxdata="passData($event)" @senditems="passItems($event)"/>
      </div>
      <div class="filter-inbox">
        <InboxFiltro :inboxData="inboxData" :items="inboxItems"/>
      </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import InboxFiltro from '../components/filtro_cotizacion/InboxFiltro.vue';
import Options from '../components/filtro_cotizacion/Options.vue'
export default {
    name: "QuotationFilter",
  components: { Options, InboxFiltro },
  computed: {
    ...mapState(["permisoFiltroCotizacion"])
  },
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
  mounted(){
    if (!this.permisoFiltroCotizacion){
      this.$router.push("/")
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