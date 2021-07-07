<template>
<div v-if="permisoFiltroCotizacion">
  <div class="filter-container">
      <div class="quotation-filter">
          <Options @sendinboxdata="passData($event)" @senditems="passItems($event)" @sendstat="passStat($event)"/>
      </div>
      <div class="filter-inbox">
        <InboxFiltro :inboxData="inboxData" :items="inboxItems" :loading="loading"/>
      </div>
  </div>
</div>
</template>

<script defer>
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
  mounted(){
    if (!this.permisoFiltroCotizacion){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.filter-container{
  min-height: 100vh;
}
</style>