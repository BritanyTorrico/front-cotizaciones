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
  components: { CotInbox },
  data(){
      return{};
  }
}
</script>

<style>
.quotation-form{
    margin: 2rem;
    margin-top: 0;
}
</style>