<template>
  <div class="container">
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
      >
        {{ item }}</option
      >
    </select>
    <p>hola {{ this.lista }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "listaPadre",
  computed: {
    ...mapState(["EventBus", "lista"]),
  },
  data() {
    return {
      variable: ["1", "2"],
    };
  },
  mounted() {
    this.EventBus.$on("obtener", function(segundaLista) {
      for (let i = 0; i < segundaLista.length; i++) {

        this.lista = segundaLista;
      }

    });
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
  background: #ecf0f1;
}
.container__list__option {
}
</style>
