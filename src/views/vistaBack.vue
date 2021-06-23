<template>
  <div class="contendor_mayor" v-if="permisoBackup">
    <div class="backs">
      <h2 class="item_title">
        Respaldos y restauracion de la base de datos
      </h2>

      <div class="form_desc"></div>
      <div class="conte-boton">
        <div class="btn btn-primary botoncito" @click="crearBack()">
          Crear Backup
        </div>
      </div>

      <div class="form__tabla" v-if="this.listaBack.length > 0">
        <table class="table table-hove table-bordered">
          <thead>
            <tr class="primera-fila">
              <th>Codigo respaldo</th>
              <th>Nombre de respaldo</th>
              <th>Restaurar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.listaBack" :key="index">
              <td>
                {{ item.cod_respaldo }}
              </td>
              <td>
                {{ item.nombre_respaldo }}
              </td>
              <td>
                <b-button
                  size="sm"
                  v-b-modal="'myModal'"
                  user="'item'"
                  @click="sendInfo(item)"
                  >Restaurar</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--modal-->
      <b-modal
        id="myModal"
        @ok="restaurar(selectedUser.nombre_respaldo)"
        ok-title="Confirmar"
      >
        Esta seguro de que quiere restaurar a esta version?
      </b-modal>
      <Alert ref="alert"></Alert>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Alert from "@/components/User/Alert.vue";
export default {
  name: "vistaBack",
  computed: {
    ...mapState(["token", "permisoBackup"]),
  },
  components: {
    Alert,
  },
  data() {
    return {
      listaBack: [],
    };
  },
  mounted() {
    this.obtenerDatos();
  },
  methods: {
    sendInfo(item) {
      this.selectedUser = item;
    },
    async restaurar(value) {
      try {
        console.log(value);
        const lista123 = (
          await this.$http.get(`databaseRestore?file=${value}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data;
        this.alert("success", "Restauracion exitosa");
        window.setInterval(window.location.reload(), 10000);
        console.log(lista123);
      } catch (error) {
        this.alert("warning", error);
        console.log(error);
      }
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
    async obtenerDatos() {
      try {
        this.listaBack = [];
        let listaItems = (
          await this.$http.get(`backups`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data;
        console.log(listaItems);
        for (let i = 0; i < listaItems.length; i++) {
          this.listaBack.push(listaItems[i]);
        }
        //console.log(this.listaBack);
      } catch (error) {
        this.alert("warning", error);
        console.log(error);
      }
    },
    async crearBack() {
      try {
        let listaItems = (
          await this.$http.get(`databaseBackup`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data;
        console.log(listaItems);
        this.alert("success", "Backup creado");
        window.setInterval(window.location.reload(), 10000);
      } catch (error) {
        this.alert("warning", error);
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.contendor_mayor {
  padding: 50px 100px 50px 100px;
  background-color: #46b1c95b;
  margin-top: 0;
}
.backs {
  text-align: left;
  background-color: #f1f2f6;
  padding: 40px 80px 40px 80px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 450px;
}
.botoncito {
  width: 50%;
  margin: 20px;
}
.item_title {
  text-align: left;
  color: #3d8af7;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.form_desc {
  text-align: left;
  color: #0d58cf;
  font-size: 18px;
  font-weight: 400;
  padding-bottom: 5px;
  border-bottom: 2px solid #0d58cf;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.conte-boton {
  text-align: center;
}
.primera-fila {
  background: #dfe4ea;
}
</style>
