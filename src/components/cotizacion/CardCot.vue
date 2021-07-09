<template>
  <div class="card-container">
    <div class="card-head">
      <h3>{{ name }}</h3>
      <div class="card-author">{{ author }}</div>
    </div>
    <div class="card-description">{{ description }}</div>
    <div class="card-date">{{ date }}</div>
  </div>
</template>

<script defer>
export default {
  name: "CardCot",
  data() {
    return {};
  },
  props: {
    name: String,
    date: String,
    author: String,
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
  width: 50%;
  flex-direction: column;
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
}
.card-description {
  align-self: flex-start;
  width: 40%;
  font-size: 1.9vh;
  color: #626262 !important;
  line-height: 1.5em;
  height: 3em;
  word-wrap: break-word;
  overflow: hidden;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
