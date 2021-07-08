<template>
  <div class="inbox">
    <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
      <div v-if="inboxData.length===0">
            <div class="desc">No existen cotizaciones</div>
        </div>
      <div v-else class="inbox-container">
              <div class="inbox-cards" :class="selectedCot.name === '' ? 'full-screen' : 'side-view'">
                  <div class="card-side">
                      <div class="desc">Cotizaciones encontradas:</div>
                      <div class="card-index" v-for="(cot,i) in inboxData" :key="i">
                          <div class="single-card-container " v-on:click=startTransition(i) :class="selectedCot.name==cot.nombre_cotizacion ? 'selected-card' :''">
                              <CardFiltro
                                :name="cot.nombre_cotizacion"
                                :author="cot.autor_solicitud"
                                :status="cot.estado_cotizacion"
                              />
                          </div>
                          <div class="inbox-selected" v-if="cot.nombre_cotizacion==selectedCot.name">
                  <div v-if="selectedCot.name!=''">
                    <transition
                      enter-active-class="animate__animated animate__fadeInRight"
                      leave-active-class="animate__animated animate__fadeOutRight"
                    >
                      <div v-if="!changeCot">
                        <VistaCot
                          :cot="selectedCot"/>
                      </div>
                    </transition>
                  </div>
              </div>
                      </div>
                  </div>
              </div>
      </div>
    </div>
  </div>
</template>

<script defer>
import CardFiltro from "./CardFiltro.vue";
import { mapState } from "vuex";
import VistaCot from "./VistaCot.vue";

export default {
  name: "InboxFiltro",
  computed: {
    ...mapState(["token"]),
  },
    components: { CardFiltro, VistaCot },
    data(){
        return{
            changeCot: false,
            selectedCot: {
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
        inboxData: Array,
        items: Array,
        loading: Boolean
    },
    methods: {
      async startTransition(i){
        this.changeCot=true;
        await this.showCot(i);
        this.changeCot=false;
      },
        async showCot(i){
            this.selectedCot.name=this.inboxData[i].nombre_cotizacion;
            this.selectedCot.date=this.inboxData[i].fecha_cotizacion;
            this.selectedCot.author=this.inboxData[i].autor_solicitud;
            this.selectedCot.status=this.inboxData[i].estado_cotizacion;
            this.selectedCot.itemList=this.items[i];
            this.selectedCot.company=this.inboxData[i].empresa;
        }
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
    border-bottom: 1px solid #9b9b9b;
    width: 100%;
}
.inbox-cards {
    display: flex;
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
.selected-card{
   background: #97ced8;
    border-right: 3px solid #030303;
    border-left: 3px solid #030303;
    border-top: 3px solid #030303;
    border-radius: 10px 10px 0 0;
}
.inbox-selected {
  display: flex;
    flex-direction: column;
    width: 100%!important;
    background: #97ced8;
    border-right: 3px solid #030303;
    border-left: 3px solid #030303;
    border-bottom: 3px solid #030303;
    border-radius: 0 0 10px 10px;
}
.new-quotation {
    margin: auto;
  display: block;
  background-color: #003570;
  height: 6vh;
  width: 22vw;
  border-radius: 22px;
  color: #fafafa;
  font-size: 1.1em;
  border: 0px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.btn {
    align-self: flex-start;
    padding: 2%;
    width: 30%;
}
.desc {
    font-size: 3.9vh;
    text-align: left;
    font-weight: 600;
    padding: 1% 1% 1% 1%;
    background: #c9c9c9;
    width: 100%;
}
:root{
  --animate-duration: 500ms;
}
</style>
