<template>
  <div class="single-quotation-details">
    <div class="head-part">
      <div class="head-top">
        <h2>{{ cot.name }}</h2>
        <div class="time">{{ cot.date }}</div>
      </div>
      <h5>Items: </h5>
      <div class="items">
          <table
          class="items-list"
          style="border:1px solid;border-collapse:collapse"
        >
          <thead>
            <tr>
              <th style="border:1px solid;">Cantidad</th>
              <th style="border:1px solid;">Unidad</th>
              <th style="border:1px solid;">Detalle</th>
              <th style="border:1px solid;">Unitario</th>
              <th style="border:1px solid;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td style="border:1px solid;">{{ item.cantidad_solicitud }}</td>
              <td style="border:1px solid;">{{ item.unidad_solicitud }}</td>
              <td style="border:1px solid;">{{ item.detalle_solicitud }}</td>
              <td style="border:1px solid;"></td>
              <td style="border:1px solid;"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="confirmed-companies">
                  <div class="confirmed-title">Empresa:</div>
                  <div class="copany-name">{{ cot.company }}</div>
        </div>
  </div>
  </div>
</template>

<script>
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
        }
    },
}
</script>

<style scoped>
.single-request-details{
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
  font-size: 18px;
  color: #030303 !important;
  line-height: 1.8;
  font-weight: 600;
  text-align: left;
}
.items {
  align-self: center;
  width: 90%;
  padding: 0 0 5% 0;
  font-size: 17px;
}
.items thead {
  padding: 0.5% 2% 0.5% 2%;
  background-color: #f1f2f6;
}
.items th {
  padding: 1% 2% 1% 2%;
  border: 1px solid #c0c0c0;
}
.items td {
  padding: 0.5% 1% 0.5% 1%;
  border: 1px solid #c0c0c0;
}
.confirmed-companies {
  width: 40%;
}
.confirmed-title {
  color: #3f4b5b;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  padding-bottom: 4%;
}
.company-name{
    color: #030303;
    list-style-position: inside;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 3% 15%;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 420;
    width: 100%;
}
</style>
