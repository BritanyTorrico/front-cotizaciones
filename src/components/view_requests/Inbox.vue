<template>
  <div class="inbox">
    <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
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
              <Card
                :name="req.nombre_solicitud"
                :date="req.fecha_solicitud"
                :author="req.nombrecompleto_solicitante"
                :description="req.detalle_solicitud"
              />
            </div>
            <div class="inbox-details" v-if="selectedRequest.name==req.nombre_solicitud">
        <transition name="slide-fade">
        <div v-if="selectedRequest.name != ''">
          <transition
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <div v-if="!changeReq">
              <Details :request="selectedRequest" />
            </div>
          </transition>
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
import Card from "./Card.vue";
import Details from "./Details.vue";
import { mapState } from "vuex";
export default {
  name: "Inbox",
  computed: {
    ...mapState(["token"]),
  },
  components: { Details, Card },
  data() {
    return {
      loading: false,
      inboxData: [],
      items: [],
      changeReq: false,
      selectedRequest: {
        cod: null,
        name: "",
        date: "",
        author: "",
        unit:"",
        description: "",
        budget: null,
        itemList: [],
      },
    };
  },
  methods: {
    async getData() {
      this.loading=!this.loading
      const response = (
        await this.$http.get(
          `request?type=criteria&status=ABIERTA&from=depto&nombre=${localStorage.getItem(
            "depto"
          )}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
      ).data;
      for (let i = 0; i < response.length; i++) {
        this.inboxData.push(response[i]);
        const date= this.inboxData[i].fecha_solicitud;
        this.inboxData[i].fecha_solicitud = `${date.substr(8,2)}/${date.substr(5,2)}/${date.substr(0,4)}`
        const reqItems = (
          await this.$http.get(
            `itemsPerRequest?searchby=solicitud&typeinput=nombre&inputdata=${this.inboxData[i].nombre_solicitud}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data.datos;
        let currentItems = [];
        for (let j of reqItems){
          const idg=(
                        await this.$http.get(
                            `expenseItem/${j.cod_itemgasto}`,
                            {
                                headers: {
                                    authorization: this.token,
                                },
                            }
                        )
                    ).data.datos
                    const it={
                        cod_solicitud: j.cod_solicitud,
                        cod_itemgasto: j.cod_itemgasto,
                        cantidad_solicitud: j.cantidad_solicitud,
                        unidad_solicitud: j.unidad_solicitud,
                        detalle_solicitud: j.detalle_solicitud,
                        nombre_itemgasto: idg[0].nombre_itemgasto
                    }
                    if (it.cantidad_solicitud==-1){it.cantidad_solicitud="-"}
                    currentItems.push(it)
        }
        this.items.push(currentItems);
      }
      this.inboxData=this.inboxData.reverse()
      this.items=this.items.reverse()
      this.loading=!this.loading
    },
    async showRequest(i) {
      this.selectedRequest.cod = this.inboxData[i].cod_solicitud;
      this.selectedRequest.name = this.inboxData[i].nombre_solicitud;
      this.selectedRequest.date = this.inboxData[i].fecha_solicitud;
      this.selectedRequest.author = this.inboxData[i].nombrecompleto_solicitante;
      this.selectedRequest.unit = this.inboxData[i].unidadgasto_solicitud;
      this.selectedRequest.description = this.inboxData[i].detalle_solicitud;
      this.selectedRequest.budget = this.inboxData[i].estimado_solicitud;
      this.selectedRequest.itemList = this.items[i];
    },
    async startTransition(i){
          this.changeReq=true;
          await this.showRequest(i);
          this.changeReq=false;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
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
  --animate-duration: 500ms;
}
</style>
