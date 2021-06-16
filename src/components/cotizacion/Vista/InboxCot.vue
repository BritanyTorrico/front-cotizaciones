<template>
  <div class="inbox">
      <div class="cot-filters">
      <div class="filter-title">Filtros</div>
      <div class="filter-categories">
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
          <div class="filter-status">
              <div class="option-title">Estado</div>
              <div class="status-set">
                  <input type="checkbox" class="status-type" value="ESPERANDO_RESPUESTAS" v-model="status" @change="getData">
                  <div class="status-label">Esperando Respuestas</div>
              </div>
              <div class="status-set">
                  <input type="checkbox" class="status-type" value="COTIZACION_OBTENIDA" v-model="status" @change="getData">
                  <div class="status-label">Cotización Obtenida</div>
              </div>
              <div class="status-set">
                  <input type="checkbox" class="status-type" value="CERRADO" v-model="status" @change="getData">
                  <div class="status-label">Cerrado</div>
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
  </div>
      <div class="inbox-container">
              <div class="inbox-cards">
                  <div class="card-side">
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
              <div class="inbox-selected">
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
</template>

<script>
import CotCard from './CotCard.vue'
import { mapState } from "vuex";
export default {
  components: { CotCard },
  computed: {
    ...mapState(["token"]),
  },
  data(){
      return{
          months: 100,
          status: ["ESPERANDO_RESPUESTAS"],
          market: "Todos",
          company: "Todas",
          marketsList: ["Todos"],
          companiesList: ["Todas"],
          filteredInbox: [],
          filteredItems: [],
          changeCot: false,
            selectedCot: {
                cot: null,
                name: "",
                date: "",
                author: "",
                status: "",
                itemList: [],
                company: "",
            },
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
          this.filteredInbox=[]
          this.filteredItems=[]

          if(this.items.length>0){
              let month='' 
          let estado=''
          let rubro=''
          let empresa=''
          if (this.months!=100)
              {month='&month='+this.months}
          if(this.status.length==1)
              {estado='&status='+this.status[0]}
          if (this.market!="Todos")
              {rubro='&rubro='+this.market}
          if(this.company!="Todas")
              {empresa='&empresa='+this.company}
          const response=(await this.$http.get(`quotation?type=criteria&from=depto&nombre=${localStorage.getItem('depto')}${month}${estado}${rubro}${empresa}`, {
                    headers: {
                        authorization: this.token,
                    },
                })).data;
            if (response.length>0){
                const requests=(await this.$http.get(`request?type=criteria&from=depto&nombre=${localStorage.getItem('depto')}&responsible=${this.localStorage.getItem('nombreUsuario')}`, {
                            headers: {
                                authorization: this.token,
                            },
                        })).data;
                    for (let i=0;i<response.length;i++){
                        for (let r of requests){
                            if (r.cod_solicitud===response[i].cod_solicitud)
                                {
                                    this.filteredInbox[i]=new Object();
                                    this.filteredInbox[i].cod_cotizacion=response[i].cod_cotizacion
                                    this.filteredInbox[i].nombre_cotizacion=response[i].titulo_cotizacion;
                                    const date = response[i].fecha_cotizacion
                                    this.filteredInbox[i].fecha_cotizacion=`${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`
                                    this.filteredInbox[i].autor_solicitud=r.nombrecompleto_solicitante
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
                                    const reqItems = (await this.$http.get(`itemsPerRequest?searchby=solicitud&typeinput=codigo&inputdata=${response[i].cod_solicitud}`, {
                                        headers: {
                                            authorization: this.token,
                                        },
                                    })).data.datos;
                                    let currentItems=[]
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
                                            cod_cotizacion: response[i].cod_cotizacion,
                                            cod_item: j.cod_itemgasto,
                                            cantidad: j.cantidad_solicitud,
                                            unidad: j.unidad_solicitud,
                                            detalle: j.detalle_solicitud,
                                            nombre: idg[0].nombre_itemgasto,
                                            valor_unitario: "",
                                            precio_total: ""
                                        }
                                        if (it.cantidad==-1){it.cantidad="-"}
                                                currentItems.push(it)
                                    }
                                    this.filteredItems.push(currentItems)
                                }
                        }
                        
                }
            }
          }
      }, 
      async startTransition(i){
        this.changeCot=true;
        await this.showCot(i);
        this.changeCot=false;
      },
        async showCot(i){
            this.selectedCot.cod=this.inboxData[i].cod_cotizacion;
            this.selectedCot.name=this.inboxData[i].nombre_cotizacion;
            this.selectedCot.date=this.inboxData[i].fecha_cotizacion;
            this.selectedCot.author=this.inboxData[i].autor_solicitud;
            this.selectedCot.status=this.inboxData[i].estado_cotizacion;
            this.selectedCot.itemList=this.items[i];
            this.selectedCot.company=this.inboxData[i].empresa;
        }
  }
}
</script>

<style scoped>

</style>