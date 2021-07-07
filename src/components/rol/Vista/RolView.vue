<template>
  <div class="single-role-details">
    <div class="head-part">
      <div class="head-top">
        <h2>{{ rol.name }}</h2>
      </div>
    </div>
    <div class="body-part">
      <div class="body-functions">
        <h5>Funciones:</h5>
        <ul class="role-functions">
          <li v-for="(func, i) in rol.functions" :key="i" class="list-rol">
            {{ func }}
          </li>
        </ul>
      </div>
      <div class="body-users">
        <h5>Usuarios:</h5>
        <ul class="role-users">
          <li v-for="(usr, i) in rol.users" :key="i" class="list-rol">
            {{ usr }}
          </li>
        </ul>
      </div>
    </div>
    <div class="options">
      <button class="accept-button" v-on:click="editRole()">Editar</button>

      <b-button v-if="rol.users.length === 0" class="reject-button" v-b-modal.modal-prevent-closing
        >Eliminar</b-button
      >
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Eliminar rol"
        ok-title="Si"
        cancel-title="No"
        hide-header-close
        @ok="handleOk"
      >
        <p class="delete-message">
          ¿Está seguro que desea eliminar este rol?
        </p>
        
      </b-modal>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script defer>
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";
import { BButton, BModal } from "bootstrap-vue";
export default {
  name: "RolView",
  components: { Alert, BButton, BModal },
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {};
  },
  props: {
    rol: {
      cod: Number,
      name: String,
      functions: Array,
      users: Array,
    },
  },
  methods: {
    editRole() {
      const id = this.rol.cod;
      this.$router.push(`/roles/editar/${id}`);
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleDelete();
    },
    async handleDelete() {
      try {
        const id = this.rol.cod;
        await this.$http.delete(`roles/${id}`, {
          headers: {
            authorization: this.token,
          },
        });
        this.alert("success", "Rol eliminado");
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
.single-role-details {
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
h3 {
  color: #030303 !important;
  font-size: 3vh;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.body-part {
  text-align: left;
  display: flex;
}
h5 {
  font-size: 2.7vh;
  color: #030303 !important;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-right: 2.2%;
}
.body-functions {
  display: flex;
  flex-direction: column;
  color: #626262;
  font-size: 2.3vh;
  display: flex;
  width: 50%;
  align-items: baseline;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.body-users {
  display: flex;
  flex-direction: column;
  color: #626262;
  font-size: 2.3vh;
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
.options {
  display: flex;
}
.role-functions .role-users {
  color: #030303;
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.list-rol {
  font-size: 2vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 420;
  width: 100%;
}
</style>
