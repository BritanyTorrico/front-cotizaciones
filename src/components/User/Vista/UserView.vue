<template>
  <div class="single-user-details">
    <div class="head-part">
      <div class="head-top">
        <h2>{{ user.name }}</h2>
        <div class="head-role">{{ user.rol }}</div>
      </div>
      <div class="head-info">
        <div class="head-subject">
          <h3>Nombre de usuario:</h3>
          {{ user.username }}
        </div>
      </div>
    </div>
    <div class="body-part">
      <div class="body-detail">
        <h5>Celular:</h5>
        {{ user.cell }}
      </div>
      <div class="body-detail">
        <h5>Departamento:</h5>
        {{ user.depto }}
      </div>
    </div>
    <div class="options">
      <button class="accept-button" v-on:click="editUser()">Editar</button>

      <b-button class="reject-button" v-b-modal.modal-prevent-closing
        >Eliminar</b-button
      >
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Eliminar empresa"
        ok-title="Si"
        cancel-title="No"
        hide-header-close
        @ok="handleOk"
      >
        <p class="delete-message">
          ¿Está seguro que desea eliminar este usuario?
        </p>
        <Alert ref="alert"></Alert>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";
import { BButton, BModal } from "bootstrap-vue";
export default {
  name: "UserView",
  data() {
    return {};
  },
  computed: {
    ...mapState(["token"]),
  },
  components: { Alert, BButton, BModal },
  props: {
    user: {
      cod: Number,
      name: String,
      rol: String,
      username: String,
      depto: String,
      cell: Number,
    },
  },
  methods: {
    editUser() {
      const id = this.user.cod;
      this.$router.push(`/usuario/editar/${id}`);
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleDelete();
    },
    async handleDelete() {
      try {
        const id = this.user.cod;
        await this.$http.delete(`users/${id}`, {
          headers: {
            authorization: this.token,
          },
        });
        this.alert("success", "Usuario eliminado");
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
.single-user-details {
  background: #fff;
  margin: 40px;
  padding: 1% 1% 2% 1%;
  box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
  width: 100%;
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
  font-size: 35px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-role {
  font-size: 27px;
  font-weight: 500;
  color: #3f4b5b !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-subject {
  font-size: 20px;
  font-weight: 500;
  color: #555252 !important;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  align-items: baseline;
  width: 50%;
}
h3 {
  color: #030303 !important;
  font-size: 20px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-right: 1%;
}
.body-part {
  text-align: left;
}
h5 {
  font-size: 18px;
  color: #030303 !important;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-right: 2%;
}
.body-detail {
  color: #626262;
  font-size: 18px;
  display: flex;
  width: 50%;
  align-items: baseline;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.accept-button {
  margin: auto;
  display: block;
  background-color: #003570;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reject-button {
  margin: auto;
  display: block;
  background-color: #b70d0d;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
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
