<template>
  <div class="inbox">
      <div class="inbox-container">
              <div class="inbox-cards">
                  <div class="card-side">
                      <div class="card-index" v-for="(req,i) in inboxData" :key="i">
                          <div class="single-card-container " v-on:click=showCot(i) :class="selectedRequest.name==req.nombre_solicitud ? 'selected-card' :''">
                              <CardFiltro
                                :name="req.nombre_solicitud"
                                :date="req.fecha_solicitud"
                                :author="req.usuario_solicitante"
                                :description="req.detalle_solicitud"
                              />
                          </div>
                      </div>
                  </div>
              </div>
              <div class="inbox-selected">
                  <div v-if="selectedRequest.name===''">
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
                itemList: [],
                companies: [],
            },
        }
    },
    props: {
        inboxData: Array,
        items: Array,
    },
    methods: {
        async showCot(i){
            this.selectedCot.name=this.inboxData[i].nombre_solicitud;
            this.selectedCot.date=this.inboxData[i].fecha_solicitud;
            this.selectedCot.author=this.inboxData[i].usuario_solicitante;
            this.selectedCot.description=this.inboxData[i].detalle_solicitud;
            this.selectedCot.itemList=this.items[i];
        }
    },
    mounted (){
    }
}
</script>

<style>
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