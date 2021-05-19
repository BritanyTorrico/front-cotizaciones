<template>
  <div class="container-lista">
    <div class="container__label">{{ nombreLista }}</div>
    <select
      required
      v-on:input="$emit('input', $event.target.value)"
      class="container__list"
    >
      <option selected="true" disabled="disabled">{{ value }}</option>
      <option
        class="container__list__option"
        v-for="(item, index) in lista"
        :key="index"
        :value="item"
      >
        {{ item }}</option
      >
    </select>
    <div class="form_check-error" v-if="!$v.value.required">
      {{ Mensaje }}
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "ListaDesplegable",
  data() {
    return {
      inicial: "Seleccione",
    };
  },
  props: {
    value: String,
    nombreLista: String,
    nombre: String,
    lista: Array,
    nombre1: String,
    Mensaje: String,
  },
  validations: {
    value: {
      required,
    },
  },
};
</script>

<style lang="css" scoped>
.container-lista {
  text-align: left;
  padding-top: 20px;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}
.container__list {
  width: 100%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
  display: flex;
  font-size: 16px;
  border: 1px solid;
}
.container__list__option {
  align-items: left;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
</style>
