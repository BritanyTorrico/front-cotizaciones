<template>
    <div class="cot-form">
      <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
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
        loading: false,
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
      this.loading=!this.loading
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
      this.loading=!this.loading
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

<style lang="scss" scoped>
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
.loading-info{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
.clock-loader {
  --clock-color: #000000;
  --clock-width: 4rem;
  --clock-radius: calc(var(--clock-width) / 2);
  --clock-minute-length: calc(var(--clock-width) * 0.4);
  --clock-hour-length: calc(var(--clock-width) * 0.2);
  --clock-thickness: 0.2rem;
  
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--clock-width);
  height: var(--clock-width);
  border: 3px solid var(--clock-color);
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: calc(var(--clock-radius) * 0.25);
    width: var(--clock-thickness);
    background: var(--clock-color);
    border-radius: 10px;
    transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
    animation: spin infinite linear;
  }

  &::before {
    height: var(--clock-minute-length);
    animation-duration: 2s;
  }

  &::after {
    top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
    height: var(--clock-hour-length);
    animation-duration: 15s;
  }
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
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
