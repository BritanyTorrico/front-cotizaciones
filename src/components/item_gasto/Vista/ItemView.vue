<template>
  <div class="single-item-details">
    <div class="head-part">
      <div class="head-top">
        <h2>{{ item.name }}</h2>
      </div>
      <div class="head-info">
        <div class="head-subject">
          <h3>Categoría:</h3>
          {{ item.category }}
        </div>
      </div>
    </div>
    <div class="body-part">
      <h5>Descripción:</h5>
      <p>{{ item.description }}</p>
      <h5>Justificación:</h5>
      <p>{{ item.justification }}</p>
    </div>
    <div class="options">
      <button class="accept-button" v-on:click="editItem()">Editar</button>
      <!--<button class="reject-button">Eliminar</button>-->

      <b-button class="reject-button" v-b-modal.modal-prevent-closing
        >Eliminar</b-button
      >
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Eliminar ítem"
        ok-title="Si"
        cancel-title="No"
        hide-header-close
        @ok="handleOk"
      >
        <p class="delete-message">¿Está seguro que desea eliminar este item?</p>
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
  name: "ItemView",
  data() {
    return {};
  },
  computed: {
    ...mapState(["token"]),
  },
  components: { Alert, BButton, BModal },
  props: {
    item: {
      cod: Number,
      name: String,
      category: String,
      description: String,
      justification: String,
    },
  },
  methods: {
    editItem() {
      const id = this.item.cod;
      this.$router.push(`/item/editar/${id}`);
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleDelete();
    },
    async handleDelete() {
      try {
        const id = this.item.cod;
        console.log(id);
        await this.$http.delete(`expenseItem/${id}`, {
          headers: {
            authorization: this.token,
          },
        });
        this.alert("success", "item eliminado");
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
.single-item-details {
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
