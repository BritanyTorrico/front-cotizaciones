<template>
  <div class="cot-filters">
      <div class="filter-title">Filtros</div>
      <div class="filter-categories">
          <div class="filter-date">
              <div class="option-title">Fecha</div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="1" v-model="months" v-on:change="getData">
                  <div class="date-label">Último mes</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="3" v-model="months" v-on:change="getData">
                  <div class="date-label">Último trimestre</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="6" v-model="months" v-on:change="getData">
                  <div class="date-label">Último semestre</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="12" v-model="months" v-on:change="getData">
                  <div class="date-label">Último año</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="100" v-model="months" v-on:change="getData">
                  <div class="date-label">Todo</div>
              </div>
          </div>
          <div class="filter-item">
              <div class="option-title">Item</div>
              <div class="item-set">
                  <input type="checkbox" class="item-type" value="Products" v-model="items" v-on:change="getData">
                  <div class="item-label">Productos</div>
              </div>
              <div class="item-set">
                  <input type="checkbox" class="item-type" value="Services" v-model="items" v-on:change="getData">
                  <div class="item-label">Servicios</div>
              </div>
          </div>
          <div class="filter-market">
              <div class="option-title">Rubro</div>
                <div class="lists-cont">
                    <div class="market-cat">
                        <select class="market-list" v-model="market" @change="getCompanies">
                            <option disabled="true">{{ market }}</option>
                            <option class="list-option" v-for="(mark, index) in marketsList" :key="index" :value="mark">
                                {{ mark }}
                            </option>
                        </select>
                    </div>
                    <div class="market-comp">
                        <select class="market-list" v-model="company" @change="getData">
                            <option disabled="true">{{ company }}</option>
                            <option class="list-option" v-for="(comp, index) in companiesList" :key="index" :value="comp">
                                {{ comp }}
                            </option>
                        </select>
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Options",
    computed: {
    ...mapState(["token"]),
  },
  data(){
      return{
          months: 100,
          items: ["Products", "Services"],
          market: "Todos",
          company: "Todas",
          marketsList: ["Todos"],
          companiesList: ["Todas"],
          filteredInbox: [
              {
                  nombre_cotizacion: "",
                  fecha_cotizacion: "",
                  autor_solicitud: "",
                  estado_cotizacion: "",
                  empresa:""
              }
          ],
          filteredItems: []
      }
  },
  methods: {
      async getCompanies(){
          this.companiesList=["Todas"]
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
            this.getData()
      }, 
      async getData(){
          let month='' 
          let tipo=''
          let rubro=''
          let empresa=''
          if (this.months!=100)
              month='&month='+this.months
          if(this.items.length==1)
              tipo='&items='+this.items[0]
          if (this.market!="Todos")
              rubro='&rubro='+this.market
          if(this.company!="Todas")
              empresa='empresa='+this.company
          const response=(await this.$http.get(`quotation?type=criteria`+month+`&from=depto&nombre=${localStorage.getItem('depto')}`+tipo+rubro+empresa, {
                    headers: {
                        authorization: this.token,
                    },
                })).data;
          for (let i=0;i<response.length;i++){
              this.filteredInbox[i].nombre_cotizacion=response[i].titulo_cotizacion;
              this.filteredInbox[i].fecha_cotizacion=response[i].fecha_cotizacion
              this.filteredInbox[i].fecha_cotizacion=this.filteredInbox[i].fecha_cotizacion.substr(5, this.filteredInbox[i].fecha_cotizacion.indexOf('T'));
              this.filteredInbox[i].fecha_cotizacion=this.filteredInbox[i].fecha_cotizacion.substr(0, this.filteredInbox[i].fecha_cotizacion.indexOf('T'));
              const requests=(await this.$http.get(`request?type=criteria&status=ACEPTADA&from=depto&nombre=${localStorage.getItem('depto')}`, {
                    headers: {
                        authorization: this.token,
                    },
                })).data;
                for (let r=0;r<requests.length;r++){
                    if (requests[r].cod_solicitud==response[i].cod_solicitud) 
                        this.filteredInbox[i].autor_solicitud=requests[r].usuario_solicitante;
                }
                this.filteredInbox[i].estado_cotizacion=response[i].estado_cotizacion;
                const emp=(await this.$http.get(`companiesperrequest/${response[i].cod_solicitud}`, {
                    headers: {
                        authorization: this.token,
                    },
                })).data;
                for (let l=0;l<emp.datos.length;l++){
                    if (emp.datos[l].cod_empresa==response[i].cod_empresa)
                        this.filteredInbox[i].empresa=emp.datos[l].nombre_empresa
                }
                const reqItems = (await this.$http.get(`itemsPerRequest?searchby=solicitud&typeinput=codigo&inputdata=${response[i].cod_solicitud}`, {
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
          this.$emit("sendinboxdata", this.filteredInbox, this.filteredItems)
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
        this.getData()
      }, 
  },
  mounted(){
      this.setMarketList();
      
  }
}
</script>

<style scoped>
.cot-filters{
    display: flex;
    flex-direction: column;
}
.filter-title{
    align-self: flex-start;
    font-size: 30px;
    color: #3f4b5b;
    font-weight: 740;
    padding: 2%;
}
.filter-categories{
    display: flex;
    justify-content: space-between;
    padding: 0 10% 5% 3%;
}
.option-title{
    text-align: left;
    font-size: 18px;
    color: #999999;
    font-weight: 600;
}
.filter-date{
    display: flex;
    flex-direction: column;
    width: 20%;
}
.date-set{
    display: flex;
    align-items: baseline;
}
.date-label{
    color: #030303;
    padding: 2% 0 0 7px;
    font-size: 14px;
}
.filter-item{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 20%;
}
.item-set{
    display: flex;
    align-items: baseline;
}
.item-label{
    color: #030303;
    padding: 2% 0 0 7px;
    font-size: 14px;
}
.lists-cont{
    display: flex;
}
.filter-market{
    font-size: 14px;
    width: 40%;
}
.market-cat{
    padding: 2% 5% 0 0;
    width: 50%;
}
.market-comp{
    padding: 2% 0 0 3%;
    width: 50%;
}
.market-list{
    height: 25px;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #999999;
}
</style>