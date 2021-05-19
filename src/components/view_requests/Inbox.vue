<template>
  <div class="inbox">
      <div class="container">
              <div class="inbox-cards">
                  <div class="card-left-side">
                      <div class="card-index" v-for="(req,i) in inboxData" :key="i">
                          <div class="card-container" v-on:click=showRequest(req)>
                              <Card
                                :name="req.nombre_solicitud"
                                :date="req.fecha_solicitud"
                                author="Jefe de Unidad"
                                :description="req.detalle_solicitud"
                              />
                          </div>
                      </div>
                  </div>
              </div>
              <div class="inbox-details">
                  <div class="card-right-side">
                      <Details
                        :request="selectedRequest"
                      />
                  </div>
              </div>
      </div>
  </div>
</template>

<script>
import Card from './Card.vue'
import Details from './Details.vue'
export default {
    name: "Inbox",
    components: { Details, Card },
    data(){
        return{
            inboxData: [],
            selectedRequest: {
                name: "",
                date: "",
                author: "",
                description: "",
                budget: null,
                //itemList: []
            }
        }
    },
    methods: {
        async getData(){
            const response = (await this.$http.get(`request?type=criteria&from=depto&nombre=Ingeniería%20de%20Sistemas`)).data;
            for (let i = 0; i < response.length; i++) {
                this.inboxData.push(response[i]);
                this.inboxData[i].fecha_solicitud=this.inboxData[i].fecha_solicitud.substr(5, this.inboxData[i].fecha_solicitud.indexOf('T'));
                this.inboxData[i].fecha_solicitud=this.inboxData[i].fecha_solicitud.substr(0, this.inboxData[i].fecha_solicitud.indexOf('T'));
            }
        },
        async showRequest(req){
            this.selectedRequest.name=req.nombre_solicitud;
            this.selectedRequest.date=req.fecha_solicitud;
            this.selectedRequest.author="Jefe de Unidad";
            this.selectedRequest.description=req.detalle_solicitud;
            this.selectedRequest.budget=req.estimado_solicitud;
        }
    },
    mounted: function(){
        this.getData();
        this.showRequest();
    }
}
</script>

<style>
.inbox{
    position: relative;
}
.container{
    padding: 0px!important;
    gap: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.card-left-side{
    height: 92vh;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    background: #fff;
    padding: 10px 0px;
}
.card-left-side ::-webkit-scrollbar{width: 5px;}
.card-left-side ::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 8px transparent;
    box-shadow: inset 0 0 8px transparent;
}
.card-left-side ::-webkit-scrollbar-thumb{background-color: rgba(61,151,227,.2);}
.card-index{
    position: relative;
    align-items: baseline;
    padding: 20px 20px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}
.card-index ::before{
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: #4698e5;
    opacity: 0;
    visibility: hidden;
}
.card-right-side{
    height: 92vh;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    -webkit-overflow-scrolling: touch;
}
.card-right-side ::-webkit-scrollbar{width: 5px;}
.card-right-side ::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 8px transparent;
    box-shadow: inset 0 0 8px transparent;
}
.card-right-side ::-webkit-scrollbar-thumb{background-color: rgba(61,151,227,.2);}
.inbox-cards{
    width: 30%;
    margin: 10px;
    display: flex;
}
.inbox-details{
    width: 60%;
    padding:0 5rem 5rem 0;
    margin: 10px;
    background: #C4DEE4;
}
.card-container{
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>