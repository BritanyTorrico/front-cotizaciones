<template>
  <div class="cot-filters">
      <div class="filter-title" v-on:click="showFilters = !showFilters">Filtros</div>
      <transition class="animation"
                      enter-active-class="animate__animated animate__fadeInDown"
                      leave-active-class="animate__animated animate__fadeOutUp"
                    >
      <div v-if="showFilters" class="filter-categories">
          <div class="filter-date">
              <div class="option-title">Fecha</div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="1" v-model="months" @change="getData">
                  <div class="date-label">Último mes</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="3" v-model="months" @change="getData">
                  <div class="date-label">Último trimestre</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="6" v-model="months" @change="getData">
                  <div class="date-label">Último semestre</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="12" v-model="months" @change="getData">
                  <div class="date-label">Último año</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="100" v-model="months" @change="getData">
                  <div class="date-label">Todo</div>
              </div>
          </div>
          <div class="filter-item">
              <div class="option-title">Item</div>
              <div class="item-set">
                  <input type="checkbox" class="item-type" value="Products" v-model="items" @change="getData">
                  <div class="item-label">Productos</div>
              </div>
              <div class="item-set">
                  <input type="checkbox" class="item-type" value="Services" v-model="items" @change="getData">
                  <div class="item-label">Servicios</div>
              </div>
          </div>
          <div class="filter-market">
              <div class="option-title">Rubro</div>
                <div class="lists-cont">
                    <div class="market-cat">
                        <select class="market-list" v-model="market" @change="getCompanies">
                            <option disabled="true">Seleccione un rubro</option>
                            <option class="list-option" v-for="(mark, index) in marketsList" :key="index" :value="mark">
                                {{ mark }}
                            </option>
                        </select>
                    </div>
                    <div class="market-comp">
                        <select class="market-list" v-model="company" @change="getData" :disabled="market==='Seleccione un rubro' || market === 'Todos'">
                            <option disabled="true">Seleccione una compañia</option>
                            <option class="list-option" v-for="(comp, index) in companiesList" :key="index" :value="comp">
                                {{ comp }}
                            </option>
                        </select>
                    </div>
                </div>
          </div>
      </div>
      </transition>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
export default {
  name: "Options",
  computed: {
    ...mapState(["token"]),
  },
  data(){
      return{
          loading: false,
          months: 100,
          items: ["Products", "Services"],
          market: "Todos",
          company: "Todas",
          marketsList: ["Todos"],
          companiesList: ["Todas"],
          filteredInbox: [],
          filteredItems: [],
          showFilters: false
      }
  },
  methods: {
      async getCompanies(){
          this.companiesList=["Todas"]
          this.company="Todas"
          if (this.market!="Todos"){
              const emp = (await this.$http.get(`company?rubro=${this.market}`, {
                headers: {
                    authorization: this.token,
                },
              })).data;
              for (let i of emp){
              this.companiesList.push(i.nombre_empresa)
              }
          }
          
            this.getData()
      }, 
      async getData(){
          this.loading=!this.loading
          this.$emit("sendstat", this.loading)
          this.filteredInbox=[]
          this.filteredItems=[]

          if(this.items.length>0){
              let month='' 
          let tipo=''
          let rubro=''
          let empresa=''
          if (this.months!=100)
              {month='&month='+this.months}
          if(this.items.length==1)
              {tipo='&items='+this.items[0]}
          if (this.market!="Todos")
              {rubro='&rubro='+this.market}
          if(this.company!="Todas")
              {empresa='&empresa='+this.company}
          const response=(await this.$http.get(`quotation?type=criteria&from=depto&nombre=${localStorage.getItem('depto')}${month}${tipo}${rubro}${empresa}`, {
                    headers: {
                        authorization: this.token,
                    },
                })).data;
            if (response.length>0){
                    for (let i=0;i<response.length;i++){
                    this.filteredInbox[i]=new Object();
                    this.filteredInbox[i].nombre_cotizacion=response[i].titulo_cotizacion;
                    const date = response[i].fecha_cotizacion
                    this.filteredInbox[i].fecha_cotizacion=`${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`
                    const requests=(await this.$http.get(`request?type=All&from=depto&nombre=${localStorage.getItem('depto')}`, {
                            headers: {
                                authorization: this.token,
                            },
                        })).data;
                        for (let r of requests){
                            if (r.cod_solicitud===response[i].cod_solicitud)
                                {this.filteredInbox[i].autor_solicitud=r.nombrecompleto_solicitante}
                        }
                        this.filteredInbox[i].estado_cotizacion=response[i].estado_cotizacion;
                        const emp=(await this.$http.get(`companiesperrequest/${response[i].cod_solicitud}`, {
                            headers: {
                                authorization: this.token,
                            },
                        })).data;
                        for (let k of emp.datos){
                            if (k.cod_empresa==response[i].cod_empresa)
                                {this.filteredInbox[i].empresa=k.nombre_empresa}
                        }
                        const reqItems = (await this.$http.get(`itemsPerQuotation?searchby=solicitud&typeinput=codigo&inputdata=${response[i].cod_cotizacion}`, {
                            headers: {
                                authorization: this.token,
                            },
                        })).data.datos;
                        let currentItems=[]
                        for (let j of reqItems){
                            const idg=(
                                await this.$http.get(
                                    `expenseItem/${j.cod_item}`,
                                    {
                                        headers: {
                                            authorization: this.token,
                                        },
                                    }
                                )
                            ).data.datos
                            const it={
                                cod_cotizacion: response[i].cod_cotizacion,
                                cod_item: j.cod_item,
                                cantidad: j.cantidad,
                                unidad: j.unidad,
                                detalle: j.detalle,
                                nombre: idg[0].nombre_itemgasto,
                                valor_unitario: j.valor_unitario,
                                precio_total: j.precio_total
                            }
                            if (it.cantidad==-1){it.cantidad="-"}
                                    currentItems.push(it)
                        }
                        this.filteredItems.push(currentItems)
                }
            }
          }
          this.loading=!this.loading
          this.$emit("sendstat", this.loading)
          this.$emit("sendinboxdata", this.filteredInbox,)
          this.$emit("senditems", this.filteredItems)
      }, 
      async setMarketList(){
          const resp= (await this.$http.get('market', {
          headers: {
            authorization: this.token,
          },
        })).data;
        for (let i of resp.datos){
            this.marketsList.push(i.nombre_rubro)
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
.animate__fadeInDown{
    animation-name: infil;
}
@keyframes infil {
  from {
    transform: translateY(-11%);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
.animate__fadeOutUp{
    animation-name: outfil;
}
@keyframes outfil {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(-11%);
    opacity: 0;
  }
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
