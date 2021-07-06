<template>
  <div class="contendor_mayor" v-if="permisoBackup">
    <div v-if="loading">
      <div class="loading-info">
        <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else class="backs">
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
    </div>
    <Alert ref="alert"></Alert>
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
      loading: false,
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
      this.loading = !this.loading;
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
      }
      this.loading = !this.loading;
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
      this.loading = !this.loading;
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
      }
      this.loading = !this.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.contendor_mayor {
  padding: 2.5% 10%;
  background-color: #46b1c95b;
  margin-top: 0;
}

@media (max-width: 650px) {
  .contendor_mayor {
    padding: 0%;
  }
}
.loading-info {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
.clock-loader {
  --clock-color: #000000;
  --clock-width: 4rem;
  --clock-radius: calc(var(--clock-width) / 2);
  --clock-minute-length: calc(var(--clock-width) * 0.4);
  --clock-hour-length: calc(var(--clock-width) * 0.2);
  --clock-thickness: 0.2rem;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--clock-width);
  height: var(--clock-width);
  border: 3px solid var(--clock-color);
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: calc(var(--clock-radius) * 0.25);
    width: var(--clock-thickness);
    background: var(--clock-color);
    border-radius: 10px;
    transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
    animation: spin infinite linear;
  }

  &::before {
    height: var(--clock-minute-length);
    animation-duration: 2s;
  }

  &::after {
    top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
    height: var(--clock-hour-length);
    animation-duration: 15s;
  }
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
.backs {
  text-align: left;
  background-color: #f1f2f6;
  padding: 5% 12% 5% 12%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
@media (max-width: 650px) {
  .backs {
    height: 100vh;
  }
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
