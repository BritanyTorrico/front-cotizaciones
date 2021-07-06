<template>
  <div class="card-container">
    <div class="card-user">
      <h3>{{ name }}</h3>
      <div class="card-alias">({{ username }})</div>
    </div>
    <div class="card-rol">{{ rol }} en {{ depto }}</div>
  </div>
</template>

<script>
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
}
.card-user {
  display: flex;
  width: 50%;
}
h3 {
  font-size: 18px;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
  padding: 0 1% 0 0;
}
.card-rol {
  font-size: 16px;
  align-content: flex-end;
  color: #626262 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-alias {
  font-size: 16px;
  align-self: flex-start;
  font-weight: 550;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-depto {
  align-self: flex-start;
  font-size: 15px;
  color: #626262 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
