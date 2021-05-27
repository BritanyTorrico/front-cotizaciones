<template>
  <div class="inbox">
      <div class="btn">
      <button class="new-request" v-on:click=newRequest()>Nueva Solicitud</button>
    </div>
      <div class="inbox-container">
              <div class="inbox-cards">
                  <div class="card-side">
                      <div class="card-index" v-for="(req,i) in inboxData" :key="i">
                          <div class="single-card-container " v-on:click=showRequest(i) :class="selectedRequest.name==req.nombre_solicitud ? 'selected-card' :''">
                              <SolCard
                                :name="req.nombre_solicitud"
                                :date="req.fecha_solicitud"
                                :status="req.estado_solicitud"
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
                      <SolView
                      :request="selectedRequest"/>
                  </div>
              </div>
      </div>
    </div>
</template>

<script>
import SolCard from "./SolCard.vue";
import SolView from "./SolView.vue";
import { mapState } from "vuex";
export default {
  name: "InboxSolicitudes",
  computed: {
    ...mapState(["token"]),
  },
  components: {SolCard, SolView},
  data(){
      return{
        inboxData: [],
        items: [],
        selectedRequest: {
            cod: null,
            name: "",
            date: "",
            status: "",
            description: "",
            budget: "",
            itemList: [],
        },
      };
  },
  methods: {
    async getData() {
      const response = (
        await this.$http.get(
          `request?type=criteria&from=depto&nombre=${localStorage.getItem("depto")}&petitioner=${localStorage.getItem("nombreUsuario")}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
      ).data;
      for (let i = 0; i < response.length; i++) {
        this.inboxData.push(response[i]);
        const date= this.inboxData[i].fecha_solicitud;
        this.inboxData[i].fecha_solicitud = `${date.substr(8,2)}/${date.substr(5,2)}/${date.substr(0,4)}`
        const reqItems = (
          await this.$http.get(
            `itemsPerRequest?searchby=solicitud&typeinput=nombre&inputdata=${this.inboxData[i].nombre_solicitud}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data.datos;
        let currentItems = [];
        for (let j of reqItems){
          currentItems.push(j)
        }
        this.items.push(currentItems);
      }
    },
    async showRequest(i) {
      this.selectedRequest.cod = this.inboxData[i].cod_solicitud;
      this.selectedRequest.name = this.inboxData[i].nombre_solicitud;
      this.selectedRequest.date = this.inboxData[i].fecha_solicitud;
      this.selectedRequest.status = this.inboxData[i].estado_solicitud;
      this.selectedRequest.description = this.inboxData[i].detalle_solicitud;
      this.selectedRequest.budget = this.inboxData[i].estimado_solicitud;
      this.selectedRequest.itemList = this.items[i];
    },
    async newRequest(){
      this.$router.push("/solicitud/nueva")
    },
  },
  mounted(){
      this.getData();
  }
}
</script>

<style scoped>
.inbox{
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
.inbox-cards{
    width: 30%;
    display: flex;
    height: 42rem;
    overflow: auto;
}
.inbox-form {
  width: 70%;
  padding: 0 5rem 5rem 0;
  margin: 10px;
  background: #c4dee4;
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
.selected-card{
    background: #b4cace;
  border: 3px solid #030303;
  border-radius: 10px;
}
.new-request{
    margin: auto;
  display: block;
  background-color: #003570;
  padding: 1.2% 11.5% 1.2% 11.5%!important;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
    height: 50px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.btn{
    align-self: flex-start;
    padding:2%;
    width:30%;
}
</style>