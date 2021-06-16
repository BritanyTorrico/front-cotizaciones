<template>
  <div class="card-container">
      <div class="card-head">
          <h3>{{ name }}</h3>
      </div>
      <div class="card-author">{{ author }}</div>
      <div class="card-status">{{ status }}</div>
  </div>
</template>

<script>
export default {
    name: "CotCard",
    data(){
        return{};
    },
    props: {
        name: String,
        author: String,
        status: String,
    }
}
</script>

<style scoped>
.card-container{
    margin: 5px 0 5px 0;
    padding: 2px 0 0 0;
    color:#030303!important;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.card-head {
  margin: 0 0 0 0;
  padding: 0 0 2px 0;
  align-items: stretch;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
h3 {
  font-size: 18px;
  margin: 0%;
  text-align: left;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-date {
  font-size: 16px;
  text-transform: uppercase;
  margin: 0 0 0 20px;
  align-content: flex-end;
  width: 50%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-author {
  font-size: 16px;
  align-self: flex-start;
  font-weight: 550;
  text-align: left;
  margin: 5px 0 10px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-status{
    font-size: 16px;
    align-self: flex-start;
    font-weight: 500;
    text-align: left;
    margin: 5px 0 10px 0;
    color:#242424;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.card-company{
    font-size: 16px;
    align-self: flex-start;
    font-weight: 550;
    text-align: left;
    margin: 5px 0 10px 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
