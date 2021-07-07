<template>
  <div class="inbox">
      <div class="btn">
            <button class="new-quotation" v-on:click="newQuotation()">Nueva Cotización</button>
        </div>
        <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
      <div v-if="inboxData.length===0">
            <div class="desc">No tiene cotizaciones realizadas</div>
        </div>
      <div v-else class="inbox-container">
              <div class="inbox-cards" :class="selectedCot.name === '' ? 'full-screen' : 'side-view'">
                  <div class="card-side">
                      <div class="desc">Mis cotizaciones:</div>
                      <div class="card-index" v-for="(cot,i) in inboxData" :key="i">
                          <div class="single-card-container " v-on:click=startTransition(i) :class="selectedCot.name==cot.nombre_cotizacion ? 'selected-card' :''">
                              <CotCard
                                :name="cot.nombre_cotizacion"
                                :author="cot.autor_solicitud"
                                :status="cot.estado_cotizacion"
                              />
                          </div>
                      </div>
                  </div>
              </div>
              <div class="inbox-selected" :class="selectedCot.name === '' ? 'no-selected' : ''">
                  <div v-if="selectedCot.name!=''">
                    <transition
                      enter-active-class="animate__animated animate__fadeInRight"
                      leave-active-class="animate__animated animate__fadeOutRight"
                    >
                      <div v-if="!changeCot">
                        <CotView
                          :cot="selectedCot"/>
                      </div>
                    </transition>
                  </div>
              </div>
      </div>
    </div>
  </div>
</template>

<script defer>
import CotCard from "./CotCard.vue";
import { mapState } from "vuex";
import CotView from "./CotView.vue";

export default {
  name: "InboxCot",
  computed: {
    ...mapState(["token"]),
  },
    components: { CotCard, CotView },
    data(){
        return{
            changeCot: false,
            selectedCot: {
                cod: null,
                name: "",
                date: "",
                author: "",
                status: "",
                itemList: [],
                company: "",
            },
        }
    },
    props: {
      loading: Boolean,
        inboxData: Array,
        items: Array,
    },
    methods: {
      async startTransition(i){
        this.changeCot=true;
        await this.showCot(i);
        this.changeCot=false;
      },
        async showCot(i){
            this.selectedCot.cod=this.inboxData[i].cod_cotizacion
            this.selectedCot.name=this.inboxData[i].nombre_cotizacion;
            this.selectedCot.date=this.inboxData[i].fecha_cotizacion;
            this.selectedCot.author=this.inboxData[i].autor_solicitud;
            this.selectedCot.status=this.inboxData[i].estado_cotizacion;
            this.selectedCot.obra=this.inboxData[i].puestobra;
            this.selectedCot.itemList=this.items[i];
            this.selectedCot.company=this.inboxData[i].empresa;
        },
        async newQuotation(){
            this.$router.push('/cotizacion/nueva')
        }
    },
};
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
.selected-card{
    background: #b4cace;
  border: 3px solid #030303;
  border-radius: 10px;
}
.inbox-selected {
  width: 100%;
    padding: 0 5rem 5rem 0;
    margin: 10px;
    background: #97ced8;
}
.new-quotation {
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
