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
              <TabCard
                :name="req.nombre_solicitud"
                :date="req.fecha_solicitud"
                :author="req.nombrecompleto_solicitante"
              />
            </div>
            <div class="inbox-details" v-if="req.nombre_solicitud==selectedRequest.name">
              <div v-if="selectedRequest.name != ''">
                <transition
                  enter-active-class="animate__animated animate__fadeInRight"
                  leave-active-class="animate__animated animate__fadeOutRight"
                >
                  <div v-if="!changeReq">
                    <TabView :request="selectedRequest" />
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script defer>
import TabCard from "./TabCard.vue";
import TabView from "./TabView.vue";
import { mapState } from "vuex";
export default {
  name: "CuadInbox",
  computed: {
    ...mapState(["token"]),
  },
  components: { TabCard, TabView },
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
  width: 100%;
    flex-direction: row;
}
.card-index {
  position: relative;
    border-bottom: 1px solid #9b9b9b;
    width: 100%;
}
.inbox-cards {
  display: flex;
    width: 100%;
}
.inbox-details {
  display: flex;
    flex-direction: column;
    width: 100%!important;
    background: #97ced8;
    border-right: 3px solid #030303;
    border-left: 3px solid #030303;
    border-bottom: 3px solid #030303;
    border-radius: 0 0 10px 10px;
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
  background: #97ced8;
    border-right: 3px solid #030303;
    border-left: 3px solid #030303;
    border-top: 3px solid #030303;
    border-radius: 10px 10px 0 0;
}
.desc{
  font-size: 3.9vh;
    text-align: left;
    font-weight: 600;
    padding: 1% 1% 1% 1%;
    background: #c9c9c9;
    width: 100%;
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
