<template>
  <div class="card-container">
    <div class="card-role">
      <h3>{{ name }}</h3>
    </div>
    <div class="card-body">
      <div class="card-users">Usuarios:</div>
      <div class="card-userq">{{ quant }}</div>
    </div>
  </div>
</template>

<script defer>
export default {
  name: "RolCard",
  data() {
    return {};
  },
  props: {
    name: String,
    quant: Number,
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
.card-role {
  display: flex;
  width: 50%;
}
h3 {
  font-size: 2.9vh;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 0 1% 0 0;
}
.card-users {
  font-size: 16px;
  align-self: flex-start;
  font-weight: 550;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    padding-right: 0.6%;
}
.card-userq {
  align-self: flex-start;
  font-size: 15px;
  color: #626262 !important;
  overflow: hidden;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-body{
  display: flex;
  align-items: baseline;
  padding-top: 0;
  font-size: 1em;
  align-self: flex-start;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
