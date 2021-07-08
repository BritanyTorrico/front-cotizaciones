<template>
  <div class="single-unit-details">
    <div class="head-part">
      <div class="head-top">
        <h2>{{ unit.name }}</h2>
      </div>
      <div class="head-info">
        <div class="head-subject">
          <h3>Encargado:</h3>
          {{ unit.attendant }}
        </div>
      </div>
    </div>
    <div class="body-part">
      <div class="money">
        <h5>Presupuesto:</h5>
        Bs. {{ unit.budget }}
      </div>
      <h5>Descripción:</h5>
      <p>{{ unit.description }}</p>
    </div>
    <div class="options">
      <button class="accept-button" v-on:click="editUnit()">Editar</button>
      <b-button class="reject-button" v-b-modal.modal-prevent-closing
        >Eliminar</b-button
      >
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Eliminar unidad"
        ok-title="Si"
        cancel-title="No"
        hide-header-close
        @ok="handleOk"
      >
        <p class="delete-message">
          ¿Está seguro que desea eliminar esta unidad?
        </p>
        <Alert ref="alert"></Alert>
      </b-modal>
    </div>
  </div>
</template>

<script defer>
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";
import { BButton, BModal } from "bootstrap-vue";
export default {
  name: "UnitView",
  data() {
    return {};
  },
  components: { Alert, BButton, BModal },
  computed: {
    ...mapState(["token"]),
  },
  props: {
    unit: {
      cod: Number,
      name: String,
      attendant: String,
      budget: Number,
      description: String,
    },
  },
  methods: {
    editUnit() {
      const id = this.unit.cod;
      this.$router.push(`/unidad/editar/${id}`);
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleDelete();
    },
    async handleDelete() {
      try {
        const id = this.unit.cod;
        await this.$http.delete(`spendingUnit/${id}`, {
          headers: {
            authorization: this.token,
          },
        });
        this.alert("success", "Unida de gasto eliminada");
        window.setInterval(window.location.reload(), 10000);
      } catch (error) {
        this.alert("warning", error);
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
};
</script>

<style scoped>
.single-unit-details {
  background: #fff;
  margin: 1%;
  padding: 1.2% 1% 1.2% 1%;
  width: 98%;
  border: 1px solid #808c8f;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}
.head-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  color: #030303 !important;
  font-size: 3.9vh;
  font-weight: 600;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-subject {
  font-size: 3vh;
  font-weight: 500;
  color: #555252 !important;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  align-items: baseline;
  width: 100%;
}
h3 {
  color: #030303 !important;
  font-size: 3vh;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-right: 1%;
}
.body-part {
  text-align: left;
}
h5 {
  font-size: 2.7vh;
  color: #030303 !important;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-right: 2.2%;
}
.money {
  text-align: left;
  word-break: keep-all;
  color: #626262;
  font-size: 2.3vh;
  display: flex;
  width: 25%;
  align-items: baseline;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
p {
  font-size: 2.5vh;
  color: #626262 !important;
  line-height: 1.8;
  margin-bottom: 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    word-wrap: break-word;
}
.accept-button {
  margin: auto;
  display: block;
  background-color: #003570;
  height: 6vh;
  width: 22vw;
  border-radius: 22px;
  color: #fafafa;
  font-size: 1.1em;
  border: 0px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reject-button {
  margin: auto;
  display: block;
  background-color: #b70d0d;
  height: 6vh;
  width: 22vw;
  border-radius: 22px;
  color: #fafafa;
  font-size: 1.1em;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-info {
  display: flex;
  width: 100%;
}
.options {
  display: flex;
}
</style>
