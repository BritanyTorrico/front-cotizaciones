<template>
  <div class="inbox">
      <div class="inbox-container">
              <div class="inbox-cards">
                  <div class="card-side">
                      <div class="card-index" v-for="(cot,i) in inboxData" :key="i">
                          <div class="single-card-container " v-on:click=showCot(i) :class="selectedCot.name==cot.nombre_cotizacion ? 'selected-card' :''">
                              <CardFiltro
                                :name="cot.nombre_cotizacion"
                                :author="cot.autor_solicitud"
                                :status="cot.estado_cotizacion"
                              />
                          </div>
                      </div>
                  </div>
              </div>
              <div class="inbox-selected">
                  <div v-if="selectedCot.name===''">
                  </div>
                  <div v-else>
                      <VistaCot
                      :cot="selectedCot"/>
                  </div>
              </div>
      </div>
  </div>
</template>

<script>
import CardFiltro from './CardFiltro.vue';
import { mapState } from "vuex";
import VistaCot from './VistaCot.vue';

export default {
    name: "InboxFiltro",
    computed: {
    ...mapState(["token"]),
  },
    components: { CardFiltro, VistaCot },
    data(){
        return{
            selectedCot: {
                name: "",
                date: "",
                author: "",
                status: "",
                itemList: [],
                company: "",
            },
        }
    },
    props: {
        inboxData: Array,
        items: Array,
    },
    methods: {
        async showCot(i){
            this.selectedCot.name=this.inboxData[i].nombre_cotizacion;
            this.selectedCot.date=this.inboxData[i].fecha_cotizacion;
            this.selectedCot.author=this.inboxData[i].autor_solicitud;
            this.selectedCot.status=this.inboxData[i].estado_cotizacion;
            this.selectedCot.itemList=this.items[i];
            this.selectedCot.company=this.inboxData[i].empresa;
        }
    },
    mounted (){
    }
}
</script>

<style scoped>
.inbox{
    position: relative;
}
.inbox-container{
    padding: 0px!important;
    gap: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.card-index{
    position: relative;
    align-items: baseline;
    padding: 2.5% 2.5%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    width: 100%;
}
.inbox-cards{
    width: 30%;
    display: flex;
    height: 42rem;
    overflow: auto;
}
.inbox-selected{
    width: 70%;
    padding:0 5rem 5rem 0;
    margin: 10px;
    background: #C4DEE4;
}
.single-card-container{
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding:1% 1% 1% 1%;
}
.card-side{
    width: 100%;
}
.selected-card{
    background: #b4cace;
}
</style>