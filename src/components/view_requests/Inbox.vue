<template>
  <div class="inbox">
    <div class="inbox-container">
      <div class="inbox-cards">
        <div class="card-side">
          <div class="desc">Solicitudes entrantes:</div>
          <div class="card-index" v-for="(req, i) in inboxData" :key="i">
            <div
              class="single-card-container "
              v-on:click="showRequest(i)"
              :class="
                selectedRequest.name == req.nombre_solicitud
                  ? 'selected-card'
                  : ''
              "
            >
              <Card
                :name="req.nombre_solicitud"
                :date="req.fecha_solicitud"
                :author="req.usuario_solicitante_name"
                :description="req.detalle_solicitud"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="inbox-details">
        <div v-if="selectedRequest.name === ''"></div>
        <div v-else>
          <Details :request="selectedRequest" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Details from "./Details.vue";
import { mapState } from "vuex";
export default {
  name: "Inbox",
  computed: {
    ...mapState(["token"]),
  },
  components: { Details, Card },
  data() {
    return {
      inboxData: [],
      items: [],
      selectedRequest: {
        cod: null,
        name: "",
        date: "",
        author: "",
        unit:"",
        description: "",
        budget: null,
        itemList: [],
      },
    };
  },
  methods: {
    async getData() {
      const response = (
        await this.$http.get(
          `request?type=criteria&status=ABIERTA&from=depto&nombre=${localStorage.getItem(
            "depto"
          )}`,
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
        console.log(`%c${date.substr(0,4)}`,"font-size: 20px; color:red;");
        console.log(`%c${date.substr(5,2)}`,"font-size: 17px; color:green;");
        console.log(`%c${date.substr(8,2)}`,"font-size: 12px; color:blue;");
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
      this.selectedRequest.author = this.inboxData[i].usuario_solicitante_name;
      this.selectedRequest.unit = this.inboxData[i].unidadgasto_solicitud;
      this.selectedRequest.description = this.inboxData[i].detalle_solicitud;
      this.selectedRequest.budget = this.inboxData[i].estimado_solicitud;
      this.selectedRequest.itemList = this.items[i];
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.inbox {
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
  width: 30%;
  display: flex;
  height: 42rem;
  overflow: auto;
}
.inbox-details {
  width: 70%;
  padding: 0 5rem 5rem 0;
  margin: 10px;
  background: #a7c8ee;
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
  background: #a7c8ee;
  border: 3px solid #030303;
  border-radius: 10px;
}
.desc{
  font-size: 29px;
  text-align: left;
  font-weight: 600;
  padding: 2.5% 1% 1% 1%;
  background: #dddfe7;
  border: 1px solid #dddfe7;
  border-radius: 0 0 10% 10%;
  width: 75%;
}
</style>
