<template>
  <div class="quotation-form">
      <div class="form-container">
          <Form/>
          <Empresas/>
      </div>
  </div>
</template>

<script>
import Empresas from '../components/cotizacion/Empresas.vue';
import Form from '../components/cotizacion/Form.vue';
export default {
  components: { Empresas, Form },
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