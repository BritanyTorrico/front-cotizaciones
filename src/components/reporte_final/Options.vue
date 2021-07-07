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
          <div class="filter-market">
              <div class="option-title">Unidad de Gasto</div>
                <div class="lists-cont">
                    <div class="market-cat">
                        <select class="market-list" v-model="unit" @change="getData">
                            <option disabled="true">Seleccione una Unidad</option>
                            <option class="list-option" v-for="(un, index) in unitsList" :key="index" :value="un">
                                {{ un }}
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
          months: 100,
          unit: "Todas",
          filteredInbox: [],
          showFilters: false,
          unitsList: ["Todas"],
          tableData:[],
          companiesData:[]
      }
  },
  methods: {
      async getTableData(){
          console.log(this.filteredInbox);
          for (let i of this.filteredInbox){
            const table=(
                        await this.$http.get(`tableData?nombre=${i.nombre_solicitud}`,{
                            headers: {
                                            authorization: this.token,
                                        }})
                    ).data
            
            let companies=[]
            let items=[]
            console.log(table.cotizaciones[0]);
            for (let k=0; k < table.cotizaciones[0].items.length; k++){
                let item=new Object
                item.cantidad=table.cotizaciones[0].items[k].cantidad
                item.unidad=table.cotizaciones[0].items[k].unidad
                item.descripcion=table.cotizaciones[0].items[k].detalle
                item.precios=[]
                for (let l of table.cotizaciones){
                    item.precios.push(l.items[k].precio_total)
                }
                items.push(item)
            }
               
            for (let j of table.cotizaciones){
                const empcod=(
                    await this.$http.get(`quotation/${j.cod_cotizacion}`,{
                            headers: {
                                            authorization: this.token,
                                        }})
                ).data.datos[0].cod_empresa
                const comp=(
                    await this.$http.get(`company/${empcod}`,{
                            headers: {
                                            authorization: this.token,
                                        }})
                ).data.datos[0].nombre_empresa
                companies.push(comp)
            }
            this.companiesData.push(companies)
            this.tableData.push(items)
        }
        
      },
      async getData(){
          this.filteredInbox=[]

          let month=''
          let unid=''
          if (this.months!=100){
              month='&month='+this.months
          }
          if (this.unit=="Todas"){
              unid=`&from=depto&nombre=${localStorage.getItem('depto')}`
          }else{
              unid=`&from=soloUnidad&nombre=${this.unit}`
          }
          const response=(await this.$http.get(`request?type=criteria${unid}${month}`,{
          headers: {
                        authorization: this.token,
                    }})).data;
            if (response.length>0){
                for (let i = 0; i < response.length; i++) {
                    const table=(
                        await this.$http.get(`tableData?nombre=${response[i].nombre_solicitud}`,{
                            headers: {
                                            authorization: this.token,
                                        }})
                    ).data
                    let valid=true
                    if (table.cotizaciones.length==0) {valid=false}
                    for (let j of table.cotizaciones){
                        if (j.estado_cotizacion!='COTIZACION_OBTENIDA'){
                            valid=false
                        }
                    }
                    if (table.datos_tabla.length==0){valid=false}
                    if (valid){
                        this.filteredInbox[i]=new Object
                        this.filteredInbox[i].cod_solicitud=response[i].cod_solicitud
                        this.filteredInbox[i].nombre_solicitud=response[i].nombre_solicitud
                        this.filteredInbox[i].nombrecompleto_solicitante=response[i].nombrecompleto_solicitante
                        this.filteredInbox[i].unidadgasto_solicitud=response[i].unidadgasto_solicitud
                        this.filteredInbox[i].cotizador=response[i].nombre_completo_cotizador
                        this.filteredInbox[i].observaciones=table.datos_tabla[0].observaciones_tabla
                        this.filteredInbox[i].encargado_unidad=''
                        this.filteredInbox[i].jefe_depto=''
                        const uns=(
                            await this.$http.get(`spendingUnit?type=name&departamento=${localStorage.getItem('depto')}`,{
                                                headers: {
                                                    authorization: this.token,
                                                },
                                            })
                        ).data.datos
                        for (let k of uns){
                            if (k.nombre_unidadgasto==response[i].unidadgasto_solicitud){
                                this.filteredInbox[i].encargado_unidad=k.jefe_unidad
                            }
                        }
                        const jd=(
                            await this.$http.get(`departmentBoss?depto=${localStorage.getItem('depto')}`,{
                                                headers: {
                                                    authorization: this.token,
                                                },
                                            })
                        ).data[0]
                        this.filteredInbox[i].jefe_depto=`${jd.nombres} ${jd.apellidos}`
                    }
            }
            }
            this.filteredInbox=this.filteredInbox.filter(el => Object.keys(el).length)
            await this.getTableData();

            this.$emit("sendinboxdata", this.filteredInbox)
            this.$emit("sendtabledata", this.tableData)
            this.$emit("sendcompaniesdata", this.companiesData)
      },
      async getUnits(){
          this.unitsList=["Todas"]
          this.unit="Todas"
          const resp=(
              await this.$http.get(`spendingUnit?type=name&departamento=${localStorage.getItem('depto')}`,{
                                headers: {
                                    authorization: this.token,
                                },
                            })
          ).data.datos
          for (let i of resp){
              this.unitsList.push(i.nombre_unidadgasto)
          }
          await this.getData()
      }
  },
  mounted(){
      this.getUnits();
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