<template>
<div v-if="permisoCotizacion">
  <div class="quotation-form">
      <div class="form-container">
          <CotInbox/>
      </div>
  </div>
</div>
</template>

<script>
import CotInbox from '../components/cotizacion/CotInbox.vue'
import {mapState} from "vuex"
export default {
  name: "QuotationForm",
  components: { CotInbox },
  data(){
      return{};
  },
  computed: {
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
.quotation-form{
    margin: 2rem;
    margin-top: 0;
}
</style>