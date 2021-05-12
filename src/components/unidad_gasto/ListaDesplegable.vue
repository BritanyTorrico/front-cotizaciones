<template>
  <div class="container">
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

<style lang="css" scoped>
.container {
  text-align: left;
  padding-top: 20px;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
}
.container__list {
  width: 80%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
}
</style>
