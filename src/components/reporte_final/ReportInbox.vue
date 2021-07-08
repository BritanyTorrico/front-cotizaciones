<template>
  <div class="inbox">
    <div v-if="inboxData.length===0">
            <div class="desc">No hay solicitudes pendientes</div>
        </div>
    <div v-else class="inbox-container">
      <div class="inbox-cards" :class="selectedRequest.name === '' ? 'full-screen' : 'side-view'" >
        <div class="card-side">
          <div class="desc">Solicitudes entrantes:</div>
          <div class="card-index" v-for="(req, i) in inboxData" :key="i">
            <div
              class="single-card-container "
              v-on:click="startTransition(i)"
              :class="
                selectedRequest.name == req.nombre_solicitud
                  ? 'selected-card'
                  : ''
              "
            >
              <CardReport
                :name="req.nombre_solicitud"
                :date="req.fecha_solicitud"
                :author="req.nombrecompleto_solicitante"
                :quotizer="req.nombre_completo_cotizador"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="inbox-details" :class="selectedRequest.name === '' ? 'no-selected' :''">
        <transition name="slide-fade">
        <div v-if="selectedRequest.name != ''">
          <transition
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <div v-if="!changeReq">
              <ReportForm :request="selectedRequest" />
            </div>
          </transition>
        </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script defer>
import CardReport from "./CardReport.vue";
import ReportForm from "./ReportForm.vue";
import { mapState } from "vuex";
export default {
  name: "CuadReport",
  computed: {
    ...mapState(["token"]),
  },
  components: { ReportForm, CardReport },
  data() {
    return {
      today: null,
      changeReq: false,
      selectedRequest: {
        cod: null,
        name: "",
        date: "",
        author: "",
        unit:"",
        incharge: "",
        boss: "",
        quotizer:"",
        companyList: [],
        itemList: [],
        obs:''
      },
    };
  },
  props: {
        inboxData: Array,
        tableData: Array,
        companiesData: Array,
    },
  methods: {
      async curentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
      this.today = date;
    },
    
    async showRequest(i) {
      this.selectedRequest.cod = this.inboxData[i].cod_solicitud;
      this.selectedRequest.name = this.inboxData[i].nombre_solicitud;
      this.selectedRequest.date = this.today
      this.selectedRequest.author = this.inboxData[i].nombrecompleto_solicitante;
      this.selectedRequest.unit = this.inboxData[i].unidadgasto_solicitud;
      this.selectedRequest.incharge = this.inboxData[i].encargado_unidad;
      this.selectedRequest.boss = this.inboxData[i].jefe_depto;
      this.selectedRequest.quotizer = this.inboxData[i].cotizador
      this.selectedRequest.itemList = this.tableData[i]
      this.selectedRequest.companyList = this.companiesData[i]
      this.selectedRequest.obs = this.inboxData[i].observaciones
    },
    async startTransition(i){
          this.changeReq=true;
          await this.showRequest(i);
          this.changeReq=false;
    },
  },
  mounted: async function() {
      await this.curentDate();
    
  },
};
</script>

<style scoped>
.inbox {
  position: relative;
}
.inbox-container {
  padding: 0px !important;
  gap: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-index {
  position: relative;
  align-items: baseline;
  padding: 2.5% 2.5%;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  width: 100%;
}
.inbox-cards {
  display: flex;
  height: 42rem;
  overflow: auto;
}
.full-screen{
  width: 100%!important;
}
.side-view{
  width: 40%!important;
}
.inbox-details {
  padding: 0 5% 5% 0;
  margin: 10px;
  background: #a7c8ee;
  width: 100%;
}
.no-selected{
  padding: 0!important;
  margin:0;
  width: 0%!important;
}
.selected-enable{
  width: 100%!important;
}
.single-card-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1% 1% 1% 1%;
}
.card-side {
  width: 100%;
}
.selected-card {
  background: #a7c8ee;
  border: 3px solid #030303;
  border-radius: 10px;
}
.desc{
  font-size: 29px;
  text-align: left;
  font-weight: 600;
  padding: 2.5% 1% 1% 1%;
  background: #dddfe7;
  border: 1px solid #dddfe7;
  border-radius: 0 0 10% 10%;
  width: 75%;
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-enter{
  transform: translateX(10px);
  opacity: 0;
}
:root{
  --animate-duration: 1000ms;
}
</style>
