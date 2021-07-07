<template>
  <div class="emplst">
      <div class="btn">
            <button class="new-company" v-on:click="newCompany()">Nueva Empresa</button>
        </div>
        <div class="container-mark">
            <div class="container__label">Rubro:</div>
            <select
                  v-model="rubro"
                  @change="getData()"
                  class="container__list"
            >
                <option disabled="true">{{ rubro }}</option>
                <option
                    class="container__list__option"
                    v-for="(item, index) in listrubro"
                    :key="index"
                    :value="item"
                >
                {{ item }}</option
                >
            </select>
        </div>
    <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
        <div v-if="inboxData.length===0">
            <div class="desc">No hay empresas registradas en este rubro</div>
        </div>
        <div v-else class="inbox-container">
            <div class="inbox-cards" :class="selectedCompany.name === '' ? 'full-screen' : 'side-view'">
                <div class="card-side">
                    <div class="desc">Empresas registradas:</div>
                    <div class="card-index" v-for="(comp, i) in inboxData" :key="i">
                        <div
                            class="single-card-container "
                            v-on:click="startTransition(i)"
                            :class="selectedCompany.name == comp.nombre_empresa ? 'selected-card' : ''"
                        >
                            <CompCard
                              :name="comp.nombre_empresa"
                              :deputy="comp.representante_empresa"
                              :address="comp.direccion_empresa"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="inbox-form" :class="selectedCompany.name === '' ? 'no-selected' : ''">
              <div v-if="selectedCompany.name!=''">
                <transition
                    enter-active-class="animate__animated animate__fadeInRight"
                    leave-active-class="animate__animated animate__fadeOutRight"
                >
                        <div v-if="!changeComp">
                            <CompView :company="selectedCompany"/>
                        </div>
                </transition>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script defer>
import CompCard from "./CompCard.vue"
import CompView from './CompView.vue'
import { mapState } from 'vuex'
export default {
  name: 'InboxEmpresas',
  components: { CompCard, CompView },
  computed: {
        ...mapState(['token']),
  },
  data(){
      return{
          loading: false,
          rubro: "Todos",
          inboxData: [],
          changeComp: false,
          selectedCompany: {
              cod: null,
              name: '',
              nit: null,
              deputy: '',
              phone: null,
              address: '',
              mail: '',
              bank: null,
          },
          listrubro: []
      }
  },
  methods: {
      async getData(){
          this.loading=!this.loading
          this.inboxData= []
          let emp=[]
          if (this.rubro=='Todos'){
              emp = (
            await this.$http.get(`company?rubro=All`, {
            headers: {
                authorization: this.token,
            },
            })
        ).data;
          }else{
              emp = (
            await this.$http.get(`company?rubro=${this.rubro}`, {
            headers: {
                authorization: this.token,
            },
            })
        ).data;
          }
        for (let i of emp){
            this.inboxData.push(i)
        }
        this.loading=!this.loading
      },
      async startTransition(i){
          this.changeComp=true;
          await this.showCompany(i);
          this.changeComp=false;
      },
      async showCompany(i) {
            this.selectedCompany.cod = this.inboxData[i].cod_empresa
            this.selectedCompany.name = this.inboxData[i].nombre_empresa
            this.selectedCompany.nit = this.inboxData[i].nit_empresa
            this.selectedCompany.deputy = this.inboxData[i].representante_empresa
            this.selectedCompany.phone = this.inboxData[i].telf_empresa
            this.selectedCompany.address = this.inboxData[i].direccion_empresa
            this.selectedCompany.mail = this.inboxData[i].correo_empresa
            this.selectedCompany.bank = this.inboxData[i].cuenta_bancaria
      },
      async newCompany(){
          this.$router.push('/empresa/nueva')
      },
      async obtenerRubros() {
          this.loading=!this.loading
      const listaRubros = (
        await this.$http.get("market", {
          headers: {
            authorization: this.token,
          },
        })
      ).data.datos;
      for (let i of listaRubros) {
        this.listrubro.push(i.nombre_rubro);
      }
      this.loading=!this.loading
    },
  },
  mounted(){
      this.listrubro.push("Todos")
      this.obtenerRubros()
      this.getData()
  }
}
</script>

<style lang="scss" scoped>
.emplst {
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
.new-company {
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
.container-mark {
  padding-top: 20px;
  text-align: left;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
  
}
.container__list {
  width: 100%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
  border: 1px solid;
}
</style>