<template>
  <div class="single-quotation-details">
    <div class="head-part">
      <div class="head-top">
        <h2>{{ cot.name }}</h2>
      </div>
      <div class="confirmed-companies">
                  <div class="confirmed-title">Solicitante:</div>
                  <div class="copany-name">{{ cot.author }}</div>
        </div>
        <div class="confirmed-companies">
                  <div class="confirmed-title">Estado:</div>
                  <div class="copany-name">{{ cot.status }}</div>
        </div>
      <h5>Items: </h5>
      <div class="items">
          <table
          class="items-list"
        >
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Item</th>
              <th>Detalle</th>
              <th>Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cot.itemList" :key="index">
              <td style="border:1px solid;" class="table-quantity" >{{ item.cantidad }}</td>
              <td style="border:1px solid;" class="table-unity" >{{ item.unidad }}</td>
              <td style="border:1px solid;" class="table-itemname" >{{ item.nombre }}</td>
              <td style="border:1px solid;" class="table-detail" >{{ item.detalle }}</td>
              <td style="border:1px solid;" class="table-unitprice" >{{ item.valor_unitario }}</td>
              <td style="border:1px solid;" class="table-totalprice" >{{ item.precio_total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
export default {
  name: "VistaCot",
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {};
  },
  props: {
        cot: {
            cod: Number,
            name: String,
            date: String,
            author: String,
            itemList: Array,
            company: String,
            status: String,
        }
    },
}
</script>

<style scoped>
.single-quotation-details{
    background: #fff;
    margin: 40px;
    padding: 10px 10px 20px 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
    width: 100%;
    border: 1px solid #808C8F;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
}
.head-top {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  color: #030303 !important;
  font-size: 30px;
  font-weight: 600;
}
.time {
  font-size: 16px;
  color: #3f4b5b !important;
  text-transform: capitalize;
}
.head-subject {
  font-size: 22px;
  font-weight: 600;
  color: #030303 !important;
  margin-top: 12px;
  text-align: left;
}
h5 {
  font-size: 20px;
  color: #030303 !important;
  line-height: 1.8;
  font-weight: 600;
  text-align: left;
}
.items {
  align-self: center;
  width: 100%;
  padding: 0 0 5% 0;
  font-size: 17px;
}
.items thead {
  padding: 0.5% 1% 0.5% 1%;
  background-color: #f1f2f6;
}
.items th {
  padding: 1% 1% 1% 1%;
  border: 1px solid #c0c0c0;
}
.items td {
  padding: 0.5% 1% 0.5% 1%;
  border: 1px solid #c0c0c0;
}
.confirmed-companies {
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  align-items: baseline;
}
.confirmed-title {
  color: #030303;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  padding-bottom: 1%;
  padding-right: 1%;
}
.company-name{
    color: #030303;
    list-style-position: inside;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 420;
    width: 100%;
}
.table-quantity{
  width: 11.5%!important;
}
.table-unity{
  width: 12%!important;
}
.table-detail{
  width: 37%!important;
}
.table-itemname{
  width: 13%!important; 
}
.table-unitprice{
  width: 10.5%!important; 
}
.table-totalprice{
  width: 9%!important; 
}
</style>
