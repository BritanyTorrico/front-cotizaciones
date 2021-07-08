<template>
  <div class="card-container">
    <div class="card-head">
      <h3>{{ name }}</h3>
      <div class="card-description">{{ description }}</div>
      <div class="card-status">{{ category }}</div>
    </div>
  </div>
</template>

<script defer>
export default {
  name: "ItemCard",
  data() {
    return {};
  },
  props: {
    name: String,
    category: String,
    description: String,
  },
};
</script>

<style scoped>
.card-container {
  color: #030303 !important;
  width: 100%;
  display: flex;
  align-items: baseline;
}
.card-head {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
}
h3 {
  font-size: 2.9vh;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 0 1% 0 0;
  width: 40%;
}
.card-status {
  font-size: 2vh;
  font-weight: 550;
  align-self: flex-start;
  text-align: right;
  width: 20%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-description {
  align-self: flex-start;
  width: 40%;
  font-size: 1.9vh;
  color: #626262 !important;
  line-height: 1em;
  height: 2em;
  word-wrap: break-word;
  overflow: hidden;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
