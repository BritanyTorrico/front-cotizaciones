<template>
  <div class="list-container">
    <select
      required
      v-on:input="$emit('input', $event.target.value)"
      class="container__list"
    >
      <option selected="true" disabled="disabled">Seleccione una encargado</option>
      <option
        class="container__list__option"
        v-for="(item, index) in lista"
        :key="index"
        :value="item"
      >
        {{ item }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "ListaDesplegable",
  data() {
    return {};
  },
  props: {
    value: String,
    nombreLista: String,
    nombre: String,
    lista: Array,
  },
};
</script>

<style>
.list-container {
  text-align: left;
  padding-top: 10px;
}
.container__list ::placeholder{
  color:#999999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.container__list {
  width: 550px;
  color: #3a3a3a;
  padding: 6px;
  background: #F7F6F6;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border: none;
  border-radius: 3px;
}
</style>
