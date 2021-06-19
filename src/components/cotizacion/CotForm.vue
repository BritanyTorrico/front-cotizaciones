<template>
    <div class="cot-form">
    <div class="form-title">Formulario de cotizacion</div>
    <div class="form_crear">
      <div class="form_section">
        <div class="form_label">Titulo:</div>
        <div class="form-name">{{ 'Cotización de '+request.name+' del ' + this.today }}</div>
      </div>
      <div class="form-empresas">
        <Empresas :date="today" :items="request.itemList" @sendcompanies="getCompanies($event)"/>
      </div>
      <div class="cot-form-button">
        <button 
          class="accept-button" 
          @click="submitForm" 
          :disabled="this.companies.length < 3"
          :class="this.companies.length < 3 ? 'button-disabled' : ''"
        >Crear</button>
      </div>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import Alert from '../Alert.vue';
import Empresas from "./Empresas.vue";
import { mapState } from "vuex";
export default {
  name: "CotForm",
  computed: {
    ...mapState(["token"]),
  },
  components: { Empresas, Alert },
    data(){
      return {
        disabled: false,
        rubro: "",
        nombreCotizacion: "",
        today: "",
        companies: [],
      };
  },
  props: {
    request: {
      cod: Number,
      name: String,
      date: String,
      author: String,
      description: String,
      itemList: Array,
    },
  },
  methods: {
    async curentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
      this.today = date;
    },
    async getCompanies(compList){
      this.companies=compList;
    },
    async submitForm(){
      try {
        if(this.companies.length>=3){
          await this.sendQuotData();
          await this.updateRequest();
          this.alert("success", "Cotizacion creada exitosamente");
            window.setInterval(window .location.reload(), 10000); 
        }else{
          this.alert("warning", "Seleccione por lo menos 3 empresas");
        }
      } catch (error) {
        this.alert("warning", error)
      }
    },
    async sendQuotData(){
      try {
        await this.$http.post("quotation",{
            nombre_solicitud: this.request.name,
            titulo: 'Cotización de '+ this.request.name +' del ' + this.today,
            empresas: this.companies
        },
        {
            headers: {
                authorization: this.token,
            },
        })
      } catch (error) {
          throw new Error("Esta cotización ya fue creada");
      }
    },
    async updateRequest(){
      try {
        await this.$http.put(`request/${this.request.cod}?type=State`,{
            estado_solicitud: 'ESPERANDO_RESPUESTAS',
        },
        {
            headers: {
                authorization: this.token,
            },
        })
      } catch (error) {
        throw new Error("Esta solicitud ya fue actualizada");
      }
    },
    alert (alertType, alertMessage){
            this.$refs.alert.showAlert(alertType, alertMessage);
        },
  },
  mounted() {
    this.curentDate();
  },
};
</script>

<style scoped>
.cot-form{
  background-color: #f1f2f6;
  margin: 40px;
  padding: 10px 10px 20px 10px;
  box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
  width: 100%;
  border: 1px solid #808c8f;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.form-title {
  text-align: left;
  color: #3d8af7;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-bottom: 3px solid #0d58cf;
  width: 90%;
  padding: 0 0 1.5% 0;
}
.form_crear {
  padding: 0 0 0 3%;
  text-align: left;
}
.form_label {
  color: #3f4b5b;
  font-size: 24px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 0 1% 0 0;
}
.form_section {
  padding: 1.5% 0px 1.5% 0px;
  display: flex;
  align-items: baseline;
}
.form_check-error {
  color: #ed1c24;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.form_button {
  margin: auto;
  display: block;
  background-color: #0c59cf;
  padding: 12px 115px 12px 115px;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}
.form_check-input {
  border-bottom: 1px;
  border-bottom-color: #999999;
}
.form_check-input-error {
  border: 1px solid #ed1c24 !important;
}
.button-disabled {
  background: #999999;
  border: 0px;
}
.items {
  align-self: center;
  width: 90%;
  padding: 0 0 5% 0;
  font-size: 17px;
}
.items-list {
  width: 100%;
}
.items thead {
  background-color: #c5c4c4;
  text-align: center;
}
.items th {
  padding: 1% 2% 1% 2%;
  border: 1px solid #d1d0d0;
  width: 0;
}
.items td {
  padding: 0.5% 1% 0.5% 1%;
  border: 1px solid #c0c0c0;
}
.accept-button {
  margin: auto;
  background-color: #003570;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}
.button-disabled {
  background: #999999;
  border: 0px;
}
.cot-form-button{
  display: flex;
}
</style>
