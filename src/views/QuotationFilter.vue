<template>
  <div class="filter-container">
      <div class="quotation-filter">
          <Options/>
      </div>
  </div>
</template>

<script>
import Options from '../components/filtro_cotizacion/Options.vue'
export default {
    name: "QuotationFilter",
  components: { Options },
  data(){
      return{};
  }

}
</script>

<style scoped>

</style>