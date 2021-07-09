<template>
  <div class="card-container">
    <div class="card-head">
      <h3>{{ name }}</h3>
      <div class="card-author">{{ author }}</div>
      <div class="card-date">{{ date }}</div>
    </div>
  </div>
</template>

<script defer>
export default {
  name: "TabCard",
  data() {
    return {};
  },
  props: {
    name: String,
    date: String,
    author: String,
    quotizer: String,
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
}
h3 {
  font-size: 2.5vh;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 60%;
}
.card-date {
  font-size: 1.7vh;
  align-content: flex-end;
  text-align: right;
  width: 10%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-author {
  font-size: 1.9vh;
  align-self: flex-start;
  font-weight: 550;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 30%;
}
</style>
