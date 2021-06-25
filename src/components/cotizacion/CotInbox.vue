<template>
    <div class="inbox">
        <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
        <div v-if="inboxData.length===0">
            <div class="desc">No hay solicitudes aceptadas pendientes</div>
        </div>
        <div v-else class="inbox-container">
            <div class="inbox-cards" :class="selectedRequest.name === '' ? 'full-screen' : 'side-view'">
                <div class="card-side">
                    <div class="desc">Solicitudes aceptadas:</div>
                    <div class="card-index" v-for="(req, i) in inboxData" :key="i">
                        <div
                            class="single-card-container "
                            v-on:click="startTransition(i)"
                            :class="selectedRequest.name == req.nombre_solicitud ? 'selected-card' : ''"
                        >
                            <CardCot
                                :name="req.nombre_solicitud"
                                :date="req.fecha_solicitud"
                                :author="req.nombrecompleto_solicitante"
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
                  <div v-if="!changeCot">
                      <CotForm :request="selectedRequest" />
                  </div>
              </transition>
              </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import CardCot from './CardCot.vue'
import CotForm from './CotForm.vue'
import { mapState } from 'vuex'
export default {
    name: 'CotInbox',
    computed: {
        ...mapState(['token']),
    },
    components: { CardCot, CotForm },
    data() {
        return {
            loading: false,
            inboxData: [],
            items: [],
            changeCot: false,
            selectedRequest: {
                cod: null,
                name: '',
                date: '',
                author: '',
                description: '',
                itemList: [],
            },
        }
    },
    methods: {
        async getData() {
            this.loading=!this.loading
            const response = (
                await this.$http.get(`request?type=criteria&status=EN_COTIZACION&from=depto&nombre=${localStorage.getItem('depto')}`, {
                    headers: {
                        authorization: this.token,
                    },
                })
            ).data
            for (let i = 0; i < response.length; i++) {
                this.inboxData.push(response[i])
                const date = this.inboxData[i].fecha_solicitud
                this.inboxData[i].fecha_solicitud = `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`
                const reqItems = (
                    await this.$http.get(
                        `itemsPerRequest?searchby=solicitud&typeinput=nombre&inputdata=${this.inboxData[i].nombre_solicitud}`,
                        {
                            headers: {
                                authorization: this.token,
                            },
                        }
                    )
                ).data.datos
                let currentItems = []
                for (let j of reqItems) {
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
                this.items.push(currentItems)
            }
            this.inboxData=this.inboxData.reverse()
            this.items=this.items.reverse()
            this.loading=!this.loading
        },
        async showRequest(i) {
            this.selectedRequest.cod = this.inboxData[i].cod_solicitud
            this.selectedRequest.name = this.inboxData[i].nombre_solicitud
            this.selectedRequest.date = this.inboxData[i].fecha_solicitud
            this.selectedRequest.author = this.inboxData[i].nombrecompleto_solicitante
            this.selectedRequest.description = this.inboxData[i].detalle_solicitud
            this.selectedRequest.itemList = this.items[i]
        },
        async startTransition(i) {
            this.changeCot = true
            await this.showRequest(i)
            this.changeCot = false
        },
    },
    mounted() {
        this.getData()
    },
}
</script>

<style lang="scss" scoped>
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
.inbox-form {
    padding: 0 5% 5% 0;
    margin: 10px;
    background: #c4dee4;
    width: 100%;
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
    background: #b4cace;
    border: 3px solid #030303;
    border-radius: 10px;
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
:root{
  --animate-duration: 1000ms;
}
</style>
