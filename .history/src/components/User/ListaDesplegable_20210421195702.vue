<template>
  <div class="container">
    <div class="container__label">{{ nombreLista }}</div>
    <select class="container__list">
      <option
        xlass="container__list__option"
        v-for="(item, index) in facultad"
        :key="index"
        value="1"
      >
        {{ facultad[index] }}</option
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
    nombreLista: String,
  },
};
</script>

<style lang="css" scoped>
.container {
  text-align: left;
  padding-top: 20px;
}
.container__label {
  padding-left: 6px;
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
}
.container__list {
  width: 100%;
  margin: 10px;
}
.container__list__option {
  border: 1px solid;
}
</style>
