<template>
  <div class="quotation-form">
      <div class="form-container">
          <Inbox/>
      </div>
  </div>
</template>

<script>
import Inbox from '../components/cotizacion/Inbox.vue'
export default {
  components: { Inbox },
}
</script>

<style>
.quotation-form{
    margin: 2rem;
    margin-top: 0;
}
</style>