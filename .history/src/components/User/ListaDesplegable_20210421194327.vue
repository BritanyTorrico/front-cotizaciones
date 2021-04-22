<template>
  <div class="container">
    <div class="list__name">{{ nombreLista }}</div>
    <select v-for="(item, index) in 3" :key="index" name="OS">
      <option value="1">Windows Vista</option>
      <option value="2">Windows 7</option>
      <option value="3">Windows XP</option>
      <option value="10">Fedora</option>
      <option value="11">Debian</option>
      <option value="12">Suse</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ListaDesplegable",
  props: {
    nombreLista: String,
  },
};
</script>

<style lang="scss" scoped></style>
