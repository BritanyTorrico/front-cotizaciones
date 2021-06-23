<template>
  <div class="single-request-details">
    <div class="head-part">
      <div class="head-top">
        <h2>Informe de Cuadro comparativo para {{ request.name }}</h2>
        <div class="time">{{ request.date }}</div>
      </div>
      <div class="head-info">
        <div class="head-subject"><h3>Solicitante:</h3>{{ request.author }}</div>
      </div>
    </div>
    <h5>Items:</h5>
    <div id="DivIdToPrint" class="items">
      <table class="items-list">
        <thead>
          <tr>
            <th style="border:1px solid; width:50px;">Cant</th>
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
    <button v-if="images.length>0" class="show-button" @click="preview=!preview" id="show-button">
            <span for="show-button" v-if="preview">Ocultar Capturas</span>
            <span for="show-button" v-if="!preview">Mostrar Capturas</span>
    </button>
    <div class="image-container" v-for="(image, index) in images" :key="index">
      <img v-if="preview" :src="image" class="image-show" height="360px">
    </div>
    <div class="body-part">
      <h5>Observaciones:</h5>
      <p>{{ request.obs }}</p>
    </div>
    <div class="head-subject"><h3>Unidad de gasto:</h3>{{ request.unit }}</div>
    <div class="head-subject"><h3>Encargado de unidad:</h3>{{ request.incharge }}</div>
    <div class="head-subject"><h3>Cotizador:</h3>{{ request.quotizer }}</div>
    <div class="head-subject"><h3>Jefe de departamento:</h3>{{ request.boss }}</div>
    <div class="response">
      <b-button
        class="accept-button"
        v-on:click="accept()"
        v-b-modal.modal-acceptance
        >Aceptar</b-button
      >
      <b-modal
        id="modal-acceptance"
        ref="modal"
        title="Reporte"
        ok-title="Enviar"
        cancel-title="Cerrar"
        hide-header-close
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group 
            :state="resState"
          >
          <h5>Empresa: </h5>
            <b-form-select 
              v-model="selectedCompany" 
              :options="this.request.companyList" 
              :state="resState"
            ></b-form-select>
            <div class="form_check-error" v-if="selectedCompany===''">Seleccione una empresa</div>
          </b-form-group>
          <b-form-group
            invalid-feedback="Justifique su respuesta"
            :state="resState"
          >
          <h5>Justificación: </h5>
            <b-form-textarea
              id="response-textarea"
              class="report-just"
              v-model="response"
              placeholder="Ingrese su reporte de aceptación"
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
      <b-button
        class="reject-button"
        v-on:click="reject()"
        v-b-modal.modal-rejection
        >Rechazar</b-button
      >
      <b-modal
        id="modal-rejection"
        ref="modal"
        title="Reporte"
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
              placeholder="Ingrese su reporte de rechazo"
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
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Alert from '../Alert.vue';
import { BButton, BModal, BFormGroup, BFormTextarea, BFormSelect } from "bootstrap-vue";
export default {
  components: { Alert, BButton, BModal, BFormGroup, BFormTextarea, BFormSelect },
  name: "ReportForm",
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {
      preview: false,
      images: [],
      valid: null,
      response: "",
      resState: null,
      status: "",
      selectedCompany:""
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
        quotizer: String,
        companyList: Array,
        itemList: Array,
        obs: String
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
        this.$bvModal.hide("modal-rejection");
        this.$bvModal.hide("modal-acceptance");
      });
    },
    async sendReport(){
      try {
        const repr=(
                  await this.$http.get(
                      `report?type=criteria&from=soloUnidad&nombre=${this.request.unit}`,
                      {
                          headers: {
                              authorization: this.token,
                          },
                      }
                  )
              ).data
            for (let i of repr){
              if (i.cod_solicitud==this.request.cod){
                const inf=i.cod_informe
                await this.$http.put(
                  `report/${inf}`,
                  {
                    cod_solicitud: this.request.cod,
                    titulo_informe: "Informe final" + this.request.name,
                    justificacion_informe: this.response,
                    aceptacion: this.valid,
                  },
                  {
                    headers: {
                      authorization: this.token,
                    },
                  }
                );

              }
            }
        
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
    async updateQuotations(){
      try {
        const quots=(
          await this.$http.get(`tableData?nombre=${this.request.name}`,{
              headers: {
                authorization: this.token,
              },
            })
        ).data.cotizaciones
        for (let i of quots){
          await this.setQuotStatus(i.cod_cotizacion)
        }  
        if (this.valid){
            await this.setCompany()
          }
      } catch (error) {
        throw new Error(error);
      }
    },
    async setQuotStatus(id){
      try {
        await this.$http.put(`quotation/${id}?type=Status`,{
          estado_cotizacion: 'CERRADO'
        },{
          headers: {
                authorization: this.token,
              },
        })
      } catch (error) {
        this.alert("warning", 'No se puede actualizar el estado de la cotización');
      }
    },
    async setCompany(){
      try {
        for (let i=0;i<this.request.companyList.length;i++){
          if (this.request.companyList[i]==this.selectedCompany){
            const quots=(
                        await this.$http.get(`tableData?nombre=${this.request.name}`,{
                            headers: {
                                            authorization: this.token,
                                        }})
                    ).data.cotizaciones
            await this.$http.put(`quotation/${quots[i].cod_cotizacion}?type=Answers`,{
              puesto_obra: 'SI'
            },{
              headers: {
                authorization: this.token,
              },
            })
          }else{
            const quots=(
                        await this.$http.get(`tableData?nombre=${this.request.name}`,{
                            headers: {
                                            authorization: this.token,
                                        }})
                    ).data.cotizaciones
            await this.$http.put(`quotation/${quots[i].cod_cotizacion}?type=Answers`,{
              puesto_obra: 'NO'
            },{
              headers: {
                authorization: this.token,
              },
            })
          }
        }
      } catch (error) {
        this.alert("warning", 'No se puede actualizar la cotización');
      }
    },
    async sendData() {
      try {
        await this.sendReport() //actualiza reporte
        await this.updateRequest() // actualiza estado de solicitud
        await this.updateQuotations() //actualiza estados de cotizaciones y puesto_obra 
        window.setInterval(window.location.reload(), 10000);
      } catch (error) {
        throw new Error(error);
      }
    },
    async accept() {
      this.valid = true;
      this.status = "ACEPTADA";
    },
    async reject() {
      this.valid = false;
      this.status = "RECHAZADA";
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  mounted: async function(){
    const table=(
                          await this.$http.get(`tableData?nombre=${this.request.name}`,{
                              headers: {
                                              authorization: this.token,
                                          }})
                      ).data.cotizaciones
    for (let i of table){
      if (i.imagen_cotizacion!=null){
        let file=i.imagen_cotizacion
        file= await fetch(file)
        file=await file.blob()
        this.images.push(URL.createObjectURL(file))
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
  text-align: left;
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
.image-container{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  max-width: 100%;
}
.image-show{
  border: 1px;
  border-radius: 5px;
  max-width: 100%;
  max-height: auto;
  align-items: center;
  padding: 0.2% 0% 1% 1.5%;
  align-self: center;
}
.show-button {
  margin: auto;
  display: block;
  background-color: #777272;
  padding: 0.5% 2.5% 0.5% 2.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.form_check-error {
  color: #ed1c24;
  font-size: 14px;
  padding: 0 0 0 2%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
