<template>
  <div class="single-request-details">
      <div class="head-part">
      <div class="head-top">
        <h2>{{ request.name }}</h2>
        <div class="time">{{ request.date }}</div>
      </div>
      <div class="head-info">
        <div class="head-subject"><h3>Estado:</h3>{{ request.status }}</div>
      </div>
    </div>
    <div class="body-part">
      <h5>Justificación:</h5>
      <p>{{ request.description }}</p>
      <div class="money">
        <h5>Presupuesto:</h5>
        Bs. {{ request.budget }}
      </div>
    </div>
    <h5>Items:</h5>
    <div class="items">
      <table class="items-list">
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Item</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in request.itemList" :key="index">
            <td>{{ item.cantidad_solicitud }}</td>
            <td>{{ item.unidad_solicitud }}</td>
            <td>{{ item.detalle_solicitud }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="options">
        <button class="accept-button">Editar</button>
        <button class="reject-button">Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return{};
  },
  props:{
      request:{
          cod: Number,
          name: String,
          date: String,
          status: String,
          description: String,
          budget: Number,
          itemList: Array
      },
  },
}
</script>

<style scoped>
.single-request-details {
  background: #fff;
  margin: 40px;
  padding: 10px 10px 20px 10px;
  box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
  width: 100%;
  border: 1px solid #808c8f;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}
.head-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  color: #030303 !important;
  font-size: 35px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.time {
  font-size: 16px;
  color: #3f4b5b !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-subject {
  font-size: 20px;
  font-weight: 500;
  color: #3a3939 !important;
  margin-top: 12px;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  align-items: baseline;
  width: 50%;
}
h3 {
  color: #030303 !important;
  font-size: 25px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-right: 0.7%;
}
.body-part {
  text-align: left;
  margin: 25px 0 0;
}
h5 {
  font-size: 18px;
  color: #030303 !important;
  line-height: 1.8;
  font-weight: 600;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
p {
  font-size: 18px;
  color: #626262 !important;
  line-height: 1.8;
  margin-bottom: 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.money {
  word-break: keep-all;
  color: #626262;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  width: 25%;
  align-items: baseline;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.items {
  align-self: center;
  width: 90%;
  padding: 0 0 5% 0;
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.items thead {
  padding: 0.5% 2% 0.5% 2%;
  background-color: #f1f2f6;
}
.items th {
  padding: 1% 2% 1% 2%;
  border: 1px solid #c0c0c0;
  width: 20%;
}
.items td {
  padding: 0.5% 1% 0.5% 1%;
  border: 1px solid #c0c0c0;
}
.accept-button {
  margin: auto;
  display: block;
  background-color: #003570;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reject-button {
  margin: auto;
  display: block;
  background-color: #b70d0d;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-info{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.options{
    display: flex;
}
</style>