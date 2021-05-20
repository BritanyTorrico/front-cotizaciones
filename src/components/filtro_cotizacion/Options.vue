<template>
  <div class="cot-filters">
      <div class="filter-title">Filtros</div>
      <div class="filter-categories">
          <div class="filter-date">
              <div class="option-title">Fecha</div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="1" v-model="months">
                  <div class="label">Último mes</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="3" v-model="months">
                  <div class="label">Último trimestre</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="6" v-model="months">
                  <div class="label">Último semestre</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="12" v-model="months">
                  <div class="label">Último año</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="100" v-model="months">
                  <div class="label">Todo</div>
              </div>
          </div>
          <div class="filter-item">
              <div class="option-title">Item</div>
              <div class="item-set">
                  <input type="checkbox" class="item-type" value="Products" v-model="items">
                  <div class="label">Productos</div>
              </div>
              <div class="item-set">
                  <input type="checkbox" class="item-type" value="Services" v-model="items">
                  <div class="label">Servicios</div>
              </div>
          </div>
          <div class="filter-market">
              <div class="option-title">Rubro</div>
              <div class="market-cat">
                  <select class="market-list" v-model="market" @change="getCompanies">
                      <option disabled="true">{{ market }}</option>
                      <option class="list-option" v-for="(mark, index) in marketsList" :key="index" :value="mark">
                          {{ mark }}
                      </option>
                  </select>
              </div>
              <div class="market-comp">
                  <select class="market-list" v-model="company" @change="setMarket">
                      <option disabled="true">{{ company }}</option>
                      <option class="list-option" v-for="(comp, index) in companiesList" :key="index" :value="comp">
                          {{ comp }}
                      </option>
                  </select>
              </div>
          </div>
      </div>
      <Inbox :filteredInbox="filteredInbox" :items="filteredItems"/>
  </div>
</template>

<script>
import Inbox from './Inbox.vue'
import { mapState } from "vuex";
export default {
    name: "Options",
    computed: {
    ...mapState(["token"]),
  },
  components: { Inbox },
  data(){
      return{
          months: 100,
          items: ["Products", "Services"],
          market: "Todos",
          company: "Todas",
          marketsList: ["Todos"],
          companiesList: ["Todas"],
          filteredInbox: [],
          filteredItems: []
      }
  },
  methods: {
      async getCompanies(){
          this.companiesList=[]
          this.company="Todas"
          let emp
          if (this.market=="Todos"){
              emp = (await this.$http.get('company?rubro=All', {
                headers: {
                    authorization: this.token,
                },
              })).data;
          } else {
              emp = (await this.$http.get(`company?rubro=${this.market}`, {
                headers: {
                    authorization: this.token,
                },
              })).data;
          }
          for (let i=0;i<emp.length;i++){
                this.companiesList.push(emp[i].nombre_empresa)
            }
      }, 
      async getData(){
          let month='', tipo='', rubro='', empresa=''
          if (this.months!=100)
              month='&month='+this.months
          if(this.items.length==1)
              tipo='&items='+this.items[0]
          if (this.market!="Todos")
              rubro='rubro='+this.market
          if(this.company!="Todas")
              empresa='empresa='+this.company
          const response=(await this.$http.get(`quotation?type=criteria`+month+`&from=depto&nombre=${localStorage.getItem('depto')},`+tipo+rubro+empresa, {
                    headers: {
                        authorization: this.token,
                    },
                })).data;
          for (let i=0;i<response.length;i++){
              this.filteredInbox.push(response[i])
              this.filteredInbox[i].fecha_cotizacion=this.filteredInbox[i].fecha_cotizacion.substr(5, this.filteredInbox[i].fecha_cotizacion.indexOf('T'));
              this.filteredInbox[i].fecha_cotizacion=this.filteredInbox[i].fecha_cotizacion.substr(0, this.filteredInbox[i].fecha_cotizacion.indexOf('T'));
                const reqItems = (await this.$http.get(`itemsPerRequest?searchby=solicitud&typeinput=nombre&inputdata=${this.filteredInbox[i].titulo_cotizacion}`, {
                    headers: {
                        authorization: this.token,
                    },
                })).data.datos;
                let currentItems=[]
                for (let j = 0; j<reqItems.length;j++){
                    currentItems.push(reqItems[j])
                }
                this.filteredItems.push(currentItems)
          }
      }, 
      async setMarketList(){
          const resp= (await this.$http.get('market', {
          headers: {
            authorization: this.token,
          },
        })).data;
        for (let i=0; i<resp.datos.length;i++){
            this.marketsList.push(resp.datos[i].nombre_rubro)
        }
      }, 
  },
  mounted(){
      this.setMarketList()
      this.getData()
  }
}
</script>

<style>

</style>