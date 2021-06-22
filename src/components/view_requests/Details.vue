<template>
  <div class="single-request-details">
    <div class="head-part">
      <div class="head-top">
        <h2>{{ request.name }}</h2>
        <div class="time">{{ request.date }}</div>
      </div>
      <div class="head-info">
        <div class="head-subject"><h3>Solicitante:</h3>{{ request.author }}</div>
        <div class="head-subject"><h3>Unidad:</h3>{{ request.unit }}</div>
      </div>
    </div>
    <div class="body-part">
      <h5>Justificación:</h5>
      <p>{{ request.description }}</p>
      <div class="money">
        <h5>Presupuesto:</h5>
        Bs. {{ request.budget }}
      </div>
      <div class="money">
        <h5>Presupuesto disponible en la unidad:</h5>
        Bs. {{ unitbudget }}
      </div>
    </div>
    <h5>Items:</h5>
    <div class="items">
      <table class="items-list">
        <thead>
          <tr>
            <th style="border:1px solid; width:50px;">Cantidad</th>
              <th style="border:1px solid; width:50px;">Unidad</th>
              <th style="border:1px solid; width:70px;">Item</th>
              <th style="border:1px solid; width:500px;">Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in request.itemList" :key="index">
            <td style="border:1px solid;" class="table-quantity">{{ item.cantidad_solicitud }}</td>
              <td style="border:1px solid;" class="table-unity">{{ item.unidad_solicitud }}</td>
              <td style="border:1px solid;" class="table-itemname">{{ item.nombre_itemgasto }}</td>
              <td style="border:1px solid;" class="table-detail">{{ item.detalle_solicitud }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="response">
      <b-button
        class="accept-button"
        v-on:click="assert()"
        v-b-modal.modal-prevent-closing
        >Aceptar</b-button
      >
      <b-button
        class="reject-button"
        v-on:click="deny()"
        v-b-modal.modal-prevent-closing
        >Rechazar</b-button
      >
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Justificación"
        ok-title="Enviar"
        cancel-title="Cerrar"
        hide-header-close
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            invalid-feedback="Justifique su respuesta"
            :state="resState"
          >
            <b-form-textarea
              id="response-textarea"
              class="report-just"
              v-model="response"
              placeholder="Ingrese su justificación"
              cols="50"
              rows="10"
              maxlength="1000"
              :state="resState"
              required
            ></b-form-textarea>
          </b-form-group>
        </form>
        <Alert ref="alert"></Alert>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";
import { BButton, BModal, BFormGroup, BFormTextarea } from "bootstrap-vue";
export default {
  name: "Details",
  computed: {
    ...mapState(["token"]),
  },
  components: { Alert, BButton, BModal, BFormGroup, BFormTextarea },
  data() {
    return {
      valid: null,
      response: "",
      resState: null,
      status: "",
      unitbudget: null
    };
  },
  props: {
    request: {
      cod: Number,
      name: String,
      date: String,
      author: String,
      unit: String,
      description: String,
      budget: Number,
      itemList: Array,
    },
    
  },
  watch:{
    response: function(){
      if (this.response!=''){
        this.resState=null;
      }
    }
  },
  methods: {
    checkFormValidity() {
      const v = this.$refs.form.checkValidity();
      this.resState = v;
      return v;
    },
    resetModal() {
      this.response = "";
      this.resState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    async handleSubmit() {
      try {
        if (!this.checkFormValidity()) {
          return;
        }
        if(this.response.trim().length<1){
          this.response=this.response.trim()
          this.resState=false;
          return;
        }
        await this.sendData();
        this.alert("success", "Informe enviado");
      } catch (error) {
        this.alert("warning", error);
        return;
      }

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    async sendReport(){
      try {
        await this.$http.post(
          "report?type=codigo",
          {
            cod_solicitud: this.request.cod,
            titulo_informe: "Informe " + this.request.name,
            justificacion_informe: this.response,
            aceptacion: this.valid,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateRequest(){
      try {
        await this.$http.put(
          `request/${this.request.cod}?type=State`,
          {
            estado_solicitud: this.status,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
      } catch (error) {
        throw new Error(error);
      }
    },
    async sendData() {
      try {
        await this.sendReport()
        await this.updateRequest()
        window.setInterval(window.location.reload(), 10000);
      } catch (error) {
        throw new Error(error);
      }
    },
    async assert() {
      this.valid = true;
      this.status = "EN_COTIZACION";
    },
    async deny() {
      this.valid = false;
      this.status = "RECHAZADA";
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  mounted: async function(){
    const today = new Date()
    const currentYear=today.getFullYear()
    const units=(
      await this.$http.get(
        `spendingUnitWithBudget?type=name&departamento=${
            localStorage.getItem('depto')
          }&gestion=${currentYear}`,{
        headers: {
              authorization: this.token,
            },
      })
    ).data
    
    for (let i of units){
      if (i.nombre_unidadgasto==this.request.unit){
        this.unitbudget=i.presupuesto_unidad
      }
    }
  }
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
  width: 60%;
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
