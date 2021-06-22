<template>
  <div class="sol-filters">
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
          <div class="filter-date">
              <div class="option-title">Estado</div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="ABIERTA" v-model="status" @change="getData">
                  <div class="date-label">Abierta</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="EN_COTIZACION" v-model="status" @change="getData">
                  <div class="date-label">En cotización</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="ESPERANDO_RESPUESTAS" v-model="status" @change="getData">
                  <div class="date-label">Esperando respuestas</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="COTIZACIONES_OBTENIDAS" v-model="status" @change="getData">
                  <div class="date-label">Cotizaciones obtenidas</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="ACEPTADA" v-model="status" @change="getData">
                  <div class="date-label">Aceptada</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="RECHAZADA" v-model="status" @change="getData">
                  <div class="date-label">Rechazada</div>
              </div>
              <div class="date-set">
                  <input type="radio" class="time-set" value="ALL" v-model="status" @change="getData">
                  <div class="date-label">Todas</div>
              </div>
          </div>
      </div>
      </transition>
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
          status: "ALL",
          filteredInbox: [],
          filteredItems: [],
          showFilters: false
      }
  },
  methods: {
      async getData(){
          this.filteredInbox=[]
          this.filteredItems=[]

          let month=''
          let state=''
          if (this.months!=100){
              month='&month='+this.months
          }
          if (this.status!='ALL'){
              state='&status='+this.status
          }

          const response=(await this.$http.get(`request?type=criteria&from=depto&nombre=${localStorage.getItem('depto')}&petitioner=${localStorage.getItem('nombreUsuario')}${month}${state}`,{
          headers: {
                        authorization: this.token,
                    }})).data;
            if (response.length>0){
                for (let i = 0; i < response.length; i++) {
                this.filteredInbox.push(response[i])
                const date = this.filteredInbox[i].fecha_solicitud
                this.filteredInbox[i].fecha_solicitud = `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)}`
                
                this.filteredInbox[i].informe=''
                this.filteredInbox[i].revisado=''
                if (this.filteredInbox[i].estado_solicitud!="ABIERTA"){
                    if (this.filteredInbox[i].estado_solicitud=="RECHAZADA"){
                        const repr=(
                            await this.$http.get(
                                `report?type=criteria&from=depto&nombre=${localStorage.getItem('depto')}&status=false`,
                                {
                                    headers: {
                                        authorization: this.token,
                                    },
                                }
                            )
                        ).data
                        for (let k of repr){
                            if (k.cod_solicitud==this.filteredInbox[i].cod_solicitud){
                                this.filteredInbox[i].informe=k.justificacion_informe
                                this.filteredInbox[i].revisado=k.nombrecompleto_informe
                            }
                        }
                    }else{
                        const repa=(
                            await this.$http.get(
                                `report?type=criteria&from=depto&nombre=${localStorage.getItem('depto')}&status=true`,
                                {
                                    headers: {
                                        authorization: this.token,
                                    },
                                }
                            )
                        ).data 
                        for (let l of repa){
                            if (l.cod_solicitud==this.filteredInbox[i].cod_solicitud){
                                this.filteredInbox[i].informe=l.justificacion_informe
                                this.filteredInbox[i].revisado=l.nombrecompleto_informe
                            }
                        }
                    }
                }
                const reqItems = (
                    await this.$http.get(
                        `itemsPerRequest?searchby=solicitud&typeinput=nombre&inputdata=${this.filteredInbox[i].nombre_solicitud}`,
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
                        nombre_itemgasto: idg[0].nombre_itemgasto,
                        valor_unitario: null,
                        precio_total: null
                    }
                    if (it.cantidad_solicitud==-1){it.cantidad_solicitud="-"}
                    const table=(await this.$http.get(`tableData?nombre=${this.filteredInbox[i].nombre_solicitud}`,{
                        headers:{
                            authorization: this.token
                        }
                        })).data
                        if (table.datos_tabla.length>0){
                        for (let x of table.cotizaciones){
                            if (x.puesto_obra=='SI'){
                            for (let y of x.items){
                                it.valor_unitario=y.valor_unitario
                                it.precio_total=y.precio_total
                            }
                            }
                        }
                        }
                    currentItems.push(it)
                }
                this.filteredItems.push(currentItems)
            }
            }

            this.$emit("sendinboxdata", this.filteredInbox)
          this.$emit("senditems", this.filteredItems)
      }
  },
  mounted(){
      this.getData();
  }
}
</script>

<style scoped>
.sol-filters{
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
</style>