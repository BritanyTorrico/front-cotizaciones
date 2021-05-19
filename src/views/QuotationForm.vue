<template>
  <div class="quotation-form">
      <div class="form-container">
          <inbox></inbox>
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
    background-color: #46b1c95b;
    margin-top:0;
}
.form-container{
    width: 90%;
    display: flex;
    flex-direction: column;
}
</style>