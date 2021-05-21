<template>
  <div class="list-container">
    <select
      required
      v-on:input="$emit('input', $event.target.value)"
      class="container__list"
    >
      <option
        selected="true"
        class="container__list__placeholder"
        disabled="disabled"
        >{{ placeholder }}</option
      >
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
    placeholder: String,
  },
};
</script>

<style scoped>
.list-container {
  text-align: left;
  padding-top: 10px;
}

.container__list {
  width: 100%;
  color: #3a3a3a;
  padding: 6px 6px 6px 0;
  background: #f7f6f6;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border: none;
  border-radius: 3px;
}
.container__list :default {
  color: #999999 !important;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
