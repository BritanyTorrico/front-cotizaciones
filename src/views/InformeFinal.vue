<template>
  <div class="review">
      <div class="filter">
          <Options @sendinboxdata="passData($event)" @sendtabledata="passTable($event)" @sendcompaniesdata="passCompanies($event)"/>
      </div>
      <div class="inbox">
          <ReportInbox :inboxData="inboxData" :tableData="tableData" :companiesData="companiesData"/>
      </div>
  </div>
</template>

<script>
import ReportInbox from '../components/reporte_final/ReportInbox.vue'
import Options from '../components/reporte_final/Options.vue'
export default {
  components: { Options, ReportInbox },
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
  name: "CuadroComparativo",
}
</script>

<style scoped>
.review{
    margin: 2rem;
    margin-top: 0;
}
</style>