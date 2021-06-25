<template>
    <div class="inbox">
        <div class="btn">
            <button class="new-request" v-on:click="newRequest()">Nueva Solicitud</button>
        </div>
    <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
        <div v-if="inboxData.length===0">
            <div class="desc">No tiene solicitudes realizadas</div>
        </div>
        <div v-else class="inbox-container">
            <div class="inbox-cards" :class="selectedRequest.name === '' ? 'full-screen' : 'side-view'">
                <div class="card-side">
                    <div class="desc">Mis solicitudes:</div>
                    <div class="card-index" v-for="(req, i) in inboxData" :key="i">
                        <div
                            class="single-card-container "
                            v-on:click="startTransition(i)"
                            :class="selectedRequest.name == req.nombre_solicitud ? 'selected-card' : ''"
                        >
                            <SolCard
                                :name="req.nombre_solicitud"
                                :date="req.fecha_solicitud"
                                :status="req.estado_solicitud"
                                :description="req.detalle_solicitud"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="inbox-form" :class="selectedRequest.name === '' ? 'no-selected' : ''">
              <div v-if="selectedRequest.name!=''">
                <transition
                    enter-active-class="animate__animated animate__fadeInRight"
                    leave-active-class="animate__animated animate__fadeOutRight"
                >
                        <div v-if="!changeReq">
                            <SolView :request="selectedRequest"/>
                        </div>
                </transition>
              </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import SolCard from './SolCard.vue'
import SolView from './SolView.vue'
import { mapState } from 'vuex'
export default {
    name: 'InboxSolicitudes',
    computed: {
        ...mapState(['token']),
    },
    components: { SolCard, SolView },
    data() {
        return {
            changeReq: false,
            selectedRequest: {
                cod: null,
                name: '',
                date: '',
                status: '',
                description: '',
                budget: '',
                report: '',
                reviewer: '',
                itemList: [],
            },
        }
    },
    props: {
        inboxData: Array,
        items: Array,
        loading: Boolean,
    },
    methods: {
        async startTransition(i){
          this.changeReq=true;
          await this.showRequest(i);
          this.changeReq=false;
        },
        async showRequest(i) {
            this.selectedRequest.cod = this.inboxData[i].cod_solicitud
            this.selectedRequest.name = this.inboxData[i].nombre_solicitud
            this.selectedRequest.date = this.inboxData[i].fecha_solicitud
            this.selectedRequest.status = this.inboxData[i].estado_solicitud
            this.selectedRequest.description = this.inboxData[i].detalle_solicitud
            this.selectedRequest.budget = this.inboxData[i].estimado_solicitud
            this.selectedRequest.report = this.inboxData[i].informe
            this.selectedRequest.reviewer = this.inboxData[i].revisado
            this.selectedRequest.itemList = this.items[i]
        },
        async newRequest() {
            this.$router.push('/solicitud/nueva')
        },
    },
}
</script>

<style lang="scss" scoped>
.inbox {
    position: relative;
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
.inbox-form {
    width: 100%;
    padding: 0 5rem 5rem 0;
    margin: 10px;
    background: #97ced8;
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
    border: 3px solid #030303;
    border-radius: 10px;
}
.new-request {
    margin: auto;
    display: block;
    background-color: #003570;
    padding: 1.2% 11.5% 1.2% 11.5% !important;
    border-radius: 22px;
    color: #fafafa;
    font-size: 22px;
    font-weight: bold;
    border: 0px;
    height: 50px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.btn {
    align-self: flex-start;
    padding: 2%;
    width: 30%;
}
.desc {
    font-size: 29px;
    text-align: left;
    font-weight: 600;
    padding: 2.5% 1% 1% 1%;
    background: #dddfe7;
    border: 1px solid #dddfe7;
    border-radius: 5%;
    width: 100%;
}
:root{
  --animate-duration: 1000ms;
}
.no-selected {
    padding: 0 !important;
    margin: 0;
    width: 0% !important;
}
.full-screen {
    width: 100% !important;
}
.side-view {
    width: 40% !important;
}
</style>
