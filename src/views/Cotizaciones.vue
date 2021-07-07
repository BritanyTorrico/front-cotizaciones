<template>
<div v-if="this.permisoCotizacion">
  <div class="filter-container">
      <div class="quotation-filter">
          <Options @sendinboxdata="passData($event)" @senditems="passItems($event)"  @sendstat="passStat($event)"/>
      </div>
      <div class="filter-inbox">
        <InboxCot :inboxData="inboxData" :items="inboxItems" :loading="loading"/>
      </div>
  </div>
</div>
</template>

<script defer>
import InboxCot from '../components/cotizacion/Vista/InboxCot.vue'
import Options from '../components/cotizacion/Vista/Options.vue'
import {mapState} from "vuex"
export default {
    name: "Cotizaciones",
  components: { Options, InboxCot },
  data(){
      return{
        loading: false,
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
    },
    passStat(stat){
      this.loading=stat;
    }
  },computed: {
    ...mapState(["permisoCotizacion"]),
  },
  mounted() {
    if (!this.permisoCotizacion) {
      this.$router.push("/");
    }
  },
}
</script>

<style scoped>
.filter-container{
  min-height: 100vh;
}
</style>