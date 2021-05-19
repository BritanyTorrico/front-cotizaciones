<template>
  <div class="single-request-details">
      <div class="head-part">
          <div class="head-top">
              <h2>{{ request.name }}</h2>
              <div class="time">{{ request.date }}</div>
          </div>
          <div class="head-subject">{{ request.author }}</div>
      </div>
      <div class="body-part">
          <h5>Justificación:</h5>
          <p>{{ request.description }}</p>
          <div class="money">
              <h5>Presupuesto: </h5>Bs. {{ request.budget}}
          </div>
      </div>
      <div class="items">
          <table class ="items-list">
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
      <div class="response">
          <b-button class="accept-button" v-b-modal.modal-prevent-closing v-on:click="assert()">Aceptar</b-button>
          <b-button class="reject-button" v-b-modal.modal-prevent-closing v-on:click="deny()">Rechazar</b-button>
            <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Justificación"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleOk"
            >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                    invalid-feedback="Justifique su respuesta"
                    :state="resState">
                        <b-form-textarea
                        id="response-textarea"
                        v-model="response"
                        placeholder="Ingrese su justificación"
                        cols="50"
                        rows="10"
                        maxlength="1000"
                        :state="resState"
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
export default {
    name:"Details",
    computed: {
    ...mapState(["token"]),
  },
    components: {Alert},
    data(){
        return{
            valid: null,
            response: '',
            resState: null,
            status: '',
        };
    },
    props: {
        request: {
            cod: Number,
            name: String,
            date: String,
            author: String,
            description: String,
            budget: Number,
            itemList: Array,
        }
    },
    methods: {
        checkFormValidity(){
            const v = this.$refs.form.checkValidity()
            this.resState=v
            return v
        },
        resetModal() {
        this.response = ''
        this.resState = null
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },
      async handleSubmit() {
          try {
              if (!this.checkFormValidity()) {
                  return
                
            }
              await this.sendData();
                this.alert("success", "Informe enviado");
          } catch (error) {
              this.alert("warning", error);
          }
              
        
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      async sendData() {
      try {
          
          console.log("cod: "+this.request.cod);
          console.log("nombre: "+'Informe ' + this.request.name);
          console.log("just: "+this.response);
          console.log("acept: "+this.valid);
        await this.$http.post('report?type=codigo', {
            cod_solicitud: this.request.cod,
            titulo_informe: 'Informe ' + this.request.name,
            justificacion_informe: this.response,
            aceptacion: this.valid,
            },
            {
                    headers: {
                        authorization: this.token,
                    },
        });

        await this.$http.put(`request/${this.request.cod}?type=State`,{
            estado_solicitud: this.status,
        },{
                    headers: {
                        authorization: this.token,
                    },
                })
      } catch (error) {
        throw new Error("Esta solicitud ya fue revisada");
      }
    },
    async assert(){
        this.valid=true; 
        this.status='ACEPTADA'
    },
    async deny(){
        this.valid=false; 
        this.status='RECHAZADA'
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
    }
}
</script>
<style>
.single-request-details::before{
    color: #fff;
}
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
.head-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
h2{
    color: #030303!important;
    font-size: 30px;
    font-weight: 600;
}
.time{
    font-size: 16px;
    color: #3f4b5b!important;
    text-transform: capitalize;
}
.head-subject{
    font-size: 22px;
    font-weight: 600;
    color: #030303!important;
    margin-top: 12px;
    text-align: left;
}
.body-part{
    text-align: left;
    margin: 25px 0 0;
}
h5{
    font-size: 18px;
    color: #030303!important;
    line-height: 1.8;
    font-weight: 600;
}
p{
    font-size: 18px;
    color: #909094!important;
    line-height: 1.8;
    margin-bottom: 30px;
}
.money{
    word-break: keep-all;
    color: #909094;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    width: 25%;
}
.items{
    align-self: center;
    width: 90%;
    padding: 0 0 5% 0;
    font-size: 17px;
}
.items thead{
    background-color: #f1f2f6;
    padding: 0 2% 0 2%;
}
.items th {
    border: 1px solid #c0c0c0;
}
.items td {
    border: 1px solid #c0c0c0;
}
.response{
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
}
.reject-button {
  margin: auto;
  display: block;
  background-color: #B70D0D;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}

</style>