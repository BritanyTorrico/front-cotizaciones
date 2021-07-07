<template>
  <div class="card-container">
    <div class="card-user">
      <h3>{{ name }}</h3>
      <div class="card-alias">({{ username }})</div>
    </div>
    <div class="card-rol">{{ rol }} en {{ depto }}</div>
  </div>
</template>

<script defer>
export default {
  name: "UserCard",
  data() {
    return {};
  },
  props: {
    name: String,
    username: String,
    depto: String,
    rol: String,
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
.card-user {
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
.card-rol {
  width: 47%;
  font-size: 2.2vh;
  align-content: flex-end;
  text-align: right;
  color: #626262 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-alias {
  padding-top: 1%;
  font-size: 1em;
  align-self: flex-start;
  font-weight: 550;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
