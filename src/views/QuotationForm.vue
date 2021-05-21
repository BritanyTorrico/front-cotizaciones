<template>
  <div class="quotation-form">
      <div class="form-container">
          <CotInbox/>
      </div>
  </div>
</template>

<script>
import CotInbox from '../components/cotizacion/CotInbox.vue'
export default {
  name: "QuotationForm",
  components: { CotInbox },
  data(){
      return{};
  }
}
</script>

<style scoped>
.quotation-form{
    margin: 2rem;
    margin-top: 0;
}
</style>