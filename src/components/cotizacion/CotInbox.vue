<template>
  <div class="inbox">
      <div class="inbox-container">
              <div class="inbox-cards">
                  <div class="card-side">
                      <div class="card-index" v-for="(req,i) in inboxData" :key="i">
                          <div class="single-card-container " v-on:click=showRequest(i) :class="selectedRequest.name==req.nombre_solicitud ? 'selected-card' :''">
                              <CardCot
                                :name="req.nombre_solicitud"
                                :date="req.fecha_solicitud"
                                :author="req.usuario_solicitante"
                                :description="req.detalle_solicitud"
                              />
                          </div>
                      </div>
                  </div>
              </div>
              <div class="inbox-form">
                  <div v-if="selectedRequest.name===''">

                  </div>
                  <div v-else>
                      <CotForm 
                      :request="selectedRequest"/>
                  </div>
              </div>
      </div>
  </div>
</template>

<script>
import CardCot from './CardCot.vue'
import CotForm from './CotForm.vue';
import { mapState } from "vuex";
export default {
    name: "CotInbox",
    computed: {
    ...mapState(["token"]),
  },
    components: { CardCot, CotForm },
    data(){
        return{
            inboxData: [],
            items: [],
            selectedRequest: {
                name: "",
                date: "",
                author: "",
                description: "",
                budget: null,
                itemList: []
            },
        }
    },
    methods: {
        async getData(){
            const response = (await this.$http.get(`request?type=criteria&status=ACEPTADA&from=depto&nombre=${localStorage.getItem('depto')}`, {
          headers: {
            authorization: this.token,
          },
        })).data;
            for (let i = 0; i < response.length; i++) {
                this.inboxData.push(response[i]);
                this.inboxData[i].fecha_solicitud=this.inboxData[i].fecha_solicitud.substr(5, this.inboxData[i].fecha_solicitud.indexOf('T'));
                this.inboxData[i].fecha_solicitud=this.inboxData[i].fecha_solicitud.substr(0, this.inboxData[i].fecha_solicitud.indexOf('T'));
                const reqItems = (await this.$http.get(`itemsPerRequest?searchby=solicitud&typeinput=nombre&inputdata=${this.inboxData[i].nombre_solicitud}`, {
                    headers: {
                        authorization: this.token,
                    },
                })).data.datos;
                let currentItems=[]
                for (let j = 0; j<reqItems.length;j++){
                    currentItems.push(reqItems[j])
                }
                this.items.push(currentItems)
            }
            
        },
        async showRequest(i){
            this.selectedRequest.name=this.inboxData[i].nombre_solicitud;
            this.selectedRequest.date=this.inboxData[i].fecha_solicitud;
            this.selectedRequest.author=this.inboxData[i].usuario_solicitante;
            this.selectedRequest.description=this.inboxData[i].detalle_solicitud;
            this.selectedRequest.itemList=this.items[i];
        }
    },
    mounted (){
        this.getData();
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
.inbox-form{
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