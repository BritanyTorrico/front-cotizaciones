<template>
  <div class="single-request-details">
    <div class="head-part">
      <div class="head-top">
        <h2>Cuadro comparativo para {{ request.name }}</h2>
        <div class="time">{{ request.date }}</div>
      </div>
      <div class="head-info">
        <div class="head-subject"><h3>Solicitante:</h3>{{ request.author }}</div>
      </div>
    </div>
    <h5>Items:</h5>
    <div class="items">
      <table class="items-list">
        <thead>
          <tr>
            <th style="border:1px solid; width:10px;">Cant</th>
              <th style="border:1px solid; width:50px;">Unidad</th>
              <th style="border:1px solid; width:500px;">Descripción</th>
              <th style="border:1px solid; width:100px;" v-for="(comp, i) in request.companyList" :key="i">{{ comp }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ind) in request.itemList" :key="ind">
            <td style="border:1px solid;" class="table-quantity">{{ item.cantidad }}</td>
              <td style="border:1px solid;" class="table-unity">{{ item.unidad }}</td>
              <td style="border:1px solid;" class="table-detail">{{ item.descripcion }}</td>
              <td v-for="(price, index) in item.precios" :key="index" style="border:1px solid;" class="table-itemname">{{ price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="body-part">
      <h5>Observaciones:</h5>
      <textarea 
      placeholder="Ingrese una descripción del ítem"
      cols="50"
          rows="5"
          maxlength="1000"
          required
      v-model="observations"></textarea>
    </div>
    <div class="head-subject"><h3>Unidad de gasto:</h3>{{ request.unit }}</div>
    <div class="head-subject"><h3>Encargado de unidad:</h3>{{ request.incharge }}</div>
    <div class="head-subject"><h3>Jefe de departamento:</h3>{{ request.boss }}</div>
    <div class="response">
      <button
        class="accept-button"
        v-on:click="send()"
        >Enviar</button
      >
      <button
        class="reject-button"
        v-on:click="print()"
        >Imprimir</button
      >
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Alert from '../Alert.vue';
export default {
  components: { Alert },
  name: "CuadForm",
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {
      observations: ""
    };
  },
  props: {
    request: {
      cod: Number,
        name: String,
        date: String,
        author: String,
        unit: String,
        incharge: String,
        boss: String,
        companyList: Array,
        itemList: Array,
    },
    
  },
  methods: {
    async send() {
      try {
        if (this.observations!=""){
        const table=(
                          await this.$http.get(`tableData?nombre=${this.request.name}`,{
                              headers: {
                                              authorization: this.token,
                                          }})
                      ).data
        
          console.log(table.cotizaciones);
          console.log(this.request.name);
          console.log(this.observations);
          await this.$http.post(`table`,{
            nombre_solicitud: this.request.name,
            observaciones_tabla: this.observations,
            cotizaciones: table.cotizaciones
          },{
                              headers: {
                                              authorization: this.token,
                                          }})
        }else{
          this.alert("warning", "Ingrese observaciones");
        }
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async print() {
        console.log("print");
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
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
.single-request-details textarea {
  resize: none;
  word-wrap: break-word;
  overflow-y: auto;
  background-color: #f7f6f6;
  border-radius: 3px;
  padding: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
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
  width: 100%;
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
  width: 100%;
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
.response {
  display: flex;
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
  background-color: #444444;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.report-just{
  background-color: #f7f6f6;
  border-radius: 3px;
  padding: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    resize: none;
  word-wrap: break-word;
  overflow-y: auto;
}
.head-info{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
