<template>
  <div class="container">
    <div class="container__label">{{ nombreLista }}</div>
    <select
      required
      v-on:input="$emit('input', $event.target.value)"
      class="container__list"
      @change="ObtenerOtraLista()"
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
import { mapState } from "vuex";
export default {
  name: "listaPadre",
  data() {
    return {
      segundaLista: [],
    };
  },
  computed: {
    ...mapState(["EventBus"]),
  },
  props: {
    value: String,
    nombreLista: String,
    nombre: String,
    lista: Array,
    nombre1: String,
  },
  methods: {
    ObtenerOtraLista() {
      this.segundaLista.push("1", "2", "3");
      this.EventBus.$emit("obtener", this.segundaLista);
      this.segundaLista = [];
      console.log("otra lista");
    },
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
.container__list__option {
}
</style>
