<template>
  <div class="sol-filters">
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
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>