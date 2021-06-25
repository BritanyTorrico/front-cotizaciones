<template>
<div v-if="permisoInformeFinal">
  <div class="review">
      <div class="filter">
          <Options @sendinboxdata="passData($event)" @sendtabledata="passTable($event)" @sendcompaniesdata="passCompanies($event)"/>
      </div>
      <div class="inbox">
          <ReportInbox :inboxData="inboxData" :tableData="tableData" :companiesData="companiesData"/>
      </div>
  </div>
</div>
</template>

<script>
import ReportInbox from '../components/reporte_final/ReportInbox.vue'
import Options from '../components/reporte_final/Options.vue'
import { mapState } from 'vuex';
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
  computed: {
    ...mapState(["permisoInformeFinal"])
  },
  mounted(){
    if (!this.permisoInformeFinal){
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.review{
    margin: 2rem;
    margin-top: 0;
}
</style>