<template>
  <div class="itmlst">
      <div class="btn">
            <button class="new-item" v-on:click="newItem()">Nuevo Item</button>
        </div>
        <div class="container-cat">
            <div class="container__label">Categoría general:</div>
            <select
                  v-model="categoriaGeneral"
                  @change="getData()"
                  class="container__list"
            >
                <option disabled="true">{{ categoriaGeneral }}</option>
                <option
                    class="container__list__option"
                    v-for="(item, index) in listcatgen"
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
            <div class="desc">No hay items registrados en esta categoría</div>
        </div>
        <div v-else class="inbox-container">
            <div class="inbox-cards" :class="selectedItem.name === '' ? 'full-screen' : 'side-view'">
                <div class="card-side">
                    <div class="desc">Items registrados:</div>
                    <div class="card-index" v-for="(it, i) in inboxData" :key="i">
                        <div
                            class="single-card-container "
                            v-on:click="startTransition(i)"
                            :class="selectedItem.name == it.nombre_itemgasto ? 'selected-card' : ''"
                        >
                            <ItemCard
                              :name="it.nombre_itemgasto"
                              :category="it.nombre_categoriaespecifica"
                              :description="it.descripcion_item"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="inbox-form" :class="selectedItem.name === '' ? 'no-selected' : ''">
              <div v-if="selectedItem.name!=''">
                <transition
                    enter-active-class="animate__animated animate__fadeInRight"
                    leave-active-class="animate__animated animate__fadeOutRight"
                >
                        <div v-if="!changeIt">
                            <ItemView :item="selectedItem"/>
                        </div>
                </transition>
              </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ItemCard from './ItemCard.vue'
import ItemView from './ItemView.vue'
export default {
    name: "InboxItem",
    components: { ItemCard, ItemView },
    computed: {
        ...mapState(['token']),
    },
    data(){
        return{
            loading: false,
            categoriaGeneral: "Seleccione una opción",
            inboxData: [],
            changeIt: false,
            selectedItem: {
                cod: null,
                name: "",
                category: "",
                description: "",
                justification: ""
            },
            listcatgen: [],
            listcodgen: []
        }
    },
    methods: {
        async getData(){
            this.loading=!this.loading
            this.inboxData=[]
            const categ = (
                await this.$http.get("specificCategory", {
                headers: {
                    authorization: this.token,
                },
                })).data;
            for (let i of categ){
                if (i.cod_categoriageneral==this.listcodgen[this.listcatgen.indexOf(this.categoriaGeneral)]){
                    const response= (await this.$http.get(
                    `expenseItem?type=cat&nombre=${i.nombre_categoriaespecifica}`,
                    {
                        headers: {
                            authorization: this.token,
                        },
                    }
                    )).data
                    
                    for (let j of response){
                        const it={
                            cod_itemgasto: j.cod_itemgasto,
                            nombre_itemgasto: j.nombre_itemgasto,
                            nombre_categoriaespecifica: i.nombre_categoriaespecifica,
                            descripcion_item: j.descripcion_item,
                            justificacion: j.justificacion
                        }
                        this.inboxData.push(it)
                    }
                }
            }
            this.loading=!this.loading
        },
        async startTransition(i){
          this.changeIt=true;
          await this.showItem(i);
          this.changeIt=false;
        },
        async showItem(i) {
            this.selectedItem.cod = this.inboxData[i].cod_itemgasto
            this.selectedItem.name = this.inboxData[i].nombre_itemgasto
            this.selectedItem.category = this.inboxData[i].nombre_categoriaespecifica
            this.selectedItem.description = this.inboxData[i].descripcion_item
            this.selectedItem.justification = this.inboxData[i].justificacion
        },
        async newItem() {
            this.$router.push('/item/nuevo')
        },
        async obtenerCategorias() {
            this.loading=!this.loading
            const listaCategorias = (
                await this.$http.get("generalCategory", {
                headers: {
                    authorization: this.token,
                },
                })
            ).data;
                for (let i of listaCategorias){
                    this.listcatgen.push(i.nombre_categoriageneral)
                    this.listcodgen.push(i.cod_categoriageneral)
                }
                this.loading=!this.loading
        },
    },
    mounted(){
        this.obtenerCategorias()
    }
}
</script>

<style lang="scss" scoped>
.itmlst {
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
.new-item {
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
.container-cat {
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