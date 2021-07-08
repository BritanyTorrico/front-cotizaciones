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
                        <div class="inbox-form" v-if="selectedCompany.name==comp.nombre_empresa">
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
  min-height: 50vh;
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
  overflow: auto;
}
.inbox-form {
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
.new-company {
  margin: auto;
    display: block;
    background-color: #003570;
    width: 22vw;
    border-radius: 22px;
    color: #fafafa;
    font-size: 1.5em;
    font-weight: bold;
    border: 0px;
    height: 6vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.btn {
  align-self: flex-start;
    padding: 2%;
    width: 40%;
}
.desc {
  font-size: 3.9vh;
    text-align: left;
    font-weight: 600;
    padding: 1% 1% 1% 1%;
    background: #c9c9c9;
    width: 100%;
}
:root {
  --animate-duration: 500ms;
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