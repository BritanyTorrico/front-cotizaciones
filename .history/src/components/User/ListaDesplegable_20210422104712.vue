<template>
  <div class="container">
    <div class="container__label">{{ nombreLista }}</div>
    <select
      v-on:input="$emit('input', $event.target.value)"
      class="container__list"
    >
      <option selected="true" disabled="disabled">Seleccione una opcion</option>
      <option
        class="container__list__option"
        v-for="(item, index) in facultad"
        :key="index"
        value="FACULTAD DE CIENCIAS Y TECNOLOGIA"
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
    return {
      facultad: ["Tecnologia", "Economia", "Derecho"],
    };
  },
  props: {
    value: String,
    nombreLista: String,
    nombre: String,
  },

  methods: {},
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
}
.container__list__option {
}
</style>
