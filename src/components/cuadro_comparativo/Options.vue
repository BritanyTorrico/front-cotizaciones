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
          unit: "Todas",
          filteredInbox: [],
          showFilters: false,
          unitsList: []
      }
  },
  methods: {
      async getData(){
          this.filteredInbox=[]

          let month=''
          if (this.months!=100){
              month='&month='+this.months
          }
          let response=[]
          if (this.unit=='Todas'){
              response=(await this.$http.get(`request?type=criteria&from=depto&nombre=${localStorage.getItem('depto')}${month}`,{
          headers: {
                        authorization: this.token,
                    }})).data;
          }else{
              response=(await this.$http.get(`request?type=criteria&from=soloUnidad&nombre=${this.unit}${month}`,{
          headers: {
                        authorization: this.token,
                    }})).data;
          }
            if (response.length>0){
                for (let i = 0; i < response.length; i++) {
                    const table=(
                        await this.$http.get(`tableData?nombre=${response[i].nombre_solicitud}`,{
                            headers: {
                                            authorization: this.token,
                                        }})
                    ).data
                    let valid=true
                    for (let j of table.cotizaciones){
                        if (j.estado_cotizacion!='COTIZACION_OBTENIDA'){
                            valid=false
                        }
                    }
                    if (valid){
                        this.filteredInbox.push(response[i])

                        
                    }
            }
            }

            this.$emit("sendinboxdata", this.filteredInbox)
      },
      async getUnits(){
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
          this.getData()
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