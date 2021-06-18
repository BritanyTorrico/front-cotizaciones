<template>
  <div class="review">
      <div class="filter">
          <Options @sendinboxdata="passData($event)"/>
      </div>
      <div class="inbox">
          <CuadInbox :inboxData="inboxData"/>
      </div>
  </div>
</template>

<script>
import CuadInbox from '../components/cuadro_comparativo/CuadInbox.vue'
import Options from '../components/cuadro_comparativo/Options.vue'
export default {
  components: { Options, CuadInbox },
data(){
      return{
        inboxData: [],
      };
  },
  methods: {
    passData(inbox){
      this.inboxData= inbox;
    },
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