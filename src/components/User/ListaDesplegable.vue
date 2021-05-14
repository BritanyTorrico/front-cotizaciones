<template>
  <div class="container-lista">
    <div class="container__label">{{ nombreLista }}</div>
    <select
      required
      v-on:input="$emit('input', $event.target.value)"
      class="container__list"
    >
      <option selected="true" disabled="disabled">Seleccione una opcion</option>
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
    nombre1: String,
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
  width: 80%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
  display: flex;
}
.container__list__option {
  align-items: left;
}
</style>
