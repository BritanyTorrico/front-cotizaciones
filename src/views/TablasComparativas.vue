<template>
<div v-if="this.permisoCuadroComparativo">
  <div class="review">
      <div class="filter">
          <Filters @sendinboxdata="passData($event)" @sendtabledata="passTable($event)" @sendcompaniesdata="passCompanies($event)"/>
      </div>
      <div class="inbox">
          <InboxTab :inboxData="inboxData" :tableData="tableData" :companiesData="companiesData"/>
      </div>
  </div>
</div>
</template>

<script defer>
import { mapState } from 'vuex';
import InboxTab from '../components/cuadro_comparativo/Vista/InboxTab.vue'
import Filters from '../components/cuadro_comparativo/Vista/Filters.vue'
export default {
  components: { Filters, InboxTab },
  computed:{
    ...mapState(["permisoCuadroComparativo"])
  },
data(){
      return{
        inboxData: [],
        tableData: [],
        companiesData: []
      };
  },
  methods: {
    passData(inbox){
      this.inboxData= inbox;
    },
    passTable(table){
      this.tableData=table;
    },
    passCompanies(comp){
      this.companiesData=comp
    }
  },
  mounted(){
    if (!this.permisoCuadroComparativo) {
      this.$router.push("/");
    }
  },
  name: "TablasComparativas",
}
</script>

<style scoped>
.review{
  min-height: 100vh;
    margin: 2rem;
    margin-top: 0;
}
</style>