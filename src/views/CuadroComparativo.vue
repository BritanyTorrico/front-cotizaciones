<template>
<div v-if="this.permisoCuadroComparativo">
  <div class="review">
      <div class="filter">
          <Options @sendinboxdata="passData($event)" @sendtabledata="passTable($event)" @sendcompaniesdata="passCompanies($event)"/>
      </div>
      <div class="inbox">
          <CuadInbox :inboxData="inboxData" :tableData="tableData" :companiesData="companiesData"/>
      </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import CuadInbox from '../components/cuadro_comparativo/CuadInbox.vue'
import Options from '../components/cuadro_comparativo/Options.vue'
export default {
  components: { Options, CuadInbox },
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
  name: "CuadroComparativo",
}
</script>

<style scoped>
.review{
    margin: 2rem;
    margin-top: 0;
}
</style>