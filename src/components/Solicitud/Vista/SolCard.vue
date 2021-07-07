<template>
  <div class="card-container">
    <div class="card-head">
      <h3>{{ name }}</h3>
      <div class="card-description">{{ description }}</div>
    </div>
    <div class="card-end">
      <div class="card-date">{{ date }}</div>
    <div class="card-status">{{ status }}</div>
    </div>
  </div>
</template>

<script defer>
export default {
  name: "SolCard",
  data() {
    return {};
  },
  props: {
    name: String,
    date: String,
    status: String,
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
  width: 90%;
}
h3 {
  font-size: 2.5vh;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 50%;
}
.card-end{
  width: 10%;
}
.card-date {
  font-size: 1.7vh;
  align-content: flex-end;
  text-align: right;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-status {
  font-size: 2vh;
  font-weight: 550;
  align-self: flex-start;
  text-align: right;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-description {
  align-self: flex-start;
  width: 40%;
  font-size: 1.9vh;
  color: #626262 !important;
  line-height: 1.5em;
  height: 4.5em;
  word-wrap: break-word;
  overflow: hidden;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
