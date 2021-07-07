<template>
  <div class="single-request-details">
    <div class="head-part">
      <div class="head-top">
        <h2>{{ request.name }}</h2>
        <div class="time">{{ request.date }}</div>
      </div>
      <div class="head-info">
        <div class="head-subject">
          <h3>Estado:</h3>
          {{ request.status }}
        </div>
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
      <table
        class="items-list"
        style="border:1px solid;border-collapse:collapse"
      >
        <thead>
          <tr>
            <th style="border:1px solid; width:50px;">Cantidad</th>
            <th style="border:1px solid; width:50px;">Unidad</th>
            <th style="border:1px solid; width:70px;">Item</th>
            <th style="border:1px solid; width:500px;">Detalle</th>
            <th style="border:1px solid; width:70px;">Unitario</th>
            <th style="border:1px solid; width:100px;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in request.itemList" :key="index">
            <td style="border:1px solid;" class="table-quantity">
              {{ item.cantidad_solicitud }}
            </td>
            <td style="border:1px solid;" class="table-unity">
              {{ item.unidad_solicitud }}
            </td>
            <td style="border:1px solid;" class="table-itemname">
              {{ item.nombre_itemgasto }}
            </td>
            <td style="border:1px solid;" class="table-detail">
              {{ item.detalle_solicitud }}
            </td>
            <td style="border:1px solid;" class="table-unitprice">{{ item.valor_unitario }}</td>
            <td style="border:1px solid;" class="table-totalprice">{{ item.precio_total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="report" v-if="request.report != ''">
      <div class="reviewer">
        <h5>Revisado por:</h5>
        <div class="reviewer-name">{{ request.reviewer }}</div>
      </div>
      <h5>Informe de revisión:</h5>
      <p>{{ request.report }}</p>
    </div>
    <div class="options">
      <!-- <button class="accept-button">Editar</button>
        <button class="reject-button">Eliminar</button>-->
    </div>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
export default {
  data() {
    return {
      items:[]
    };
  },
    computed: {
    ...mapState(["token"]),
  },
  props: {
    request: {
      cod: Number,
      name: String,
      date: String,
      status: String,
      description: String,
      budget: Number,
      report: String,
      reviewer: String,
      itemList: Array,
    },
  },
};
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
  width: 100%;
  padding: 0 0 1% 0;
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.items-list {
  width: 100%;
  border: none !important;
}
.items thead {
  background-color: #c5c4c4;
  text-align: center;
}
.items th {
  padding: 1% 2% 1% 2%;
  border: 1px solid #d1d0d0;
}
.items td {
  padding: 0.5% 1% 0.5% 1%;
  border: 1px solid #c0c0c0;
}
.empty-rows {
  height: 0px !important;
  border: none !important;
}
.table-quantity {
  width: 11.5% !important;
}
.table-unity {
  width: 12% !important;
}
.table-detail {
  width: 37% !important;
}
.table-itemname {
  width: 13% !important;
}
.table-unitprice {
  width: 10.5% !important;
}
.table-totalprice {
  width: 9% !important;
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
.head-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.options {
  display: flex;
}
.report {
  text-align: left;
  margin: 25px 0 0;
  padding-bottom: 5%;
}
.report h5 {
  font-size: 22px;
}
.reviewer {
  word-break: keep-all;
  color: #626262;
  font-size: 18px;
  display: flex;
  width: 100%;
  align-items: baseline;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reviewer-name {
  padding-left: 1%;
}
</style>
