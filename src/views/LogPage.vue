<template>
  <div class="mayor" v-if="permisoBitacora">
    <div class="contenedor__log">
      <h2 class="item_title">
        Historial de modificaciones del sistema
        <b-icon icon="check-circle-fill" aria-hidden="true"></b-icon>
      </h2>

      <div class="form_desc"></div>

      <div class="lista">
        <label class="botons">
          <label @click="obtenerLog()" class="btn btn-primary botoncito"
            >Ver todo</label
          >
        </label>

        <label class="container__label">Fecha:</label>
        <input
          class="calendario"
          name="fechaVencProducto"
          type="date"
          value="DD/MM/AA"
          onkeydown="return false"
          v-model="fechaRango"
          @change="obtenerPorFecha()"
        />
      </div>
      <div class="form_check-error fechaa" v-if="!$v.fechaRango.validate_date">
        fecha invalida
      </div>
      <div class="mensaje" v-if="fechaRango == ''">
        Historial de todos los cambios
      </div>

      <div class="form__tabla" v-if="this.listaLog.length > 0">
        <table class="table table-hove table-bordered">
          <thead>
            <tr class="primera-fila">
              <th>N# Log</th>
              <th>Nombre tabla</th>
              <th>Usuario</th>
              <th>Fecha Modificación</th>
              <th>Acción</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.listaLog" :key="index">
              <td>
                {{ item.id }}
              </td>
              <td>
                {{ item.tabla }}
              </td>
              <td>
                {{ item.usuario }}
              </td>
              <td>
                {{ item.fecha }}
              </td>
              <td>
                {{ item.accion }}
              </td>
              <td>
                <b-button
                  size="sm"
                  v-b-modal="'myModal'"
                  user="'item'"
                  @click="sendInfo(item)"
                  >Ver detalle</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.listaLog.length == 0" class=" form_check-error mensaje">
        No existen datos.
      </div>
      <!--modal-->
      <b-modal id="myModal" ok-only>
        <label class="titulo_MODAL">Dato Anterior:</label>
        <p
          class="contenido_MODAL"
          v-for="(itemA, index1) in selectedUser.dato_viejo"
          :key="index1"
        >
          {{ itemA }}
        </p>
        <label class="titulo_MODAL">Dato Nuevo:</label>
        <p
          class="contenido_MODAL"
          v-for="(item1, index) in selectedUser.datoNuevo"
          :key="'A' + index"
        >
          {{ item1 }}
        </p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { helpers } from "vuelidate/lib/validators";
const validate_date = (value) => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const yyvalue = parseInt(value.slice(0, 4));
  const mmvalue = parseInt(value.slice(5, 7));
  const ddvalue = parseInt(value.slice(8, 10));
  return (
    !helpers.req(value) ||
    !(yyvalue > yyyy) &
      !(yyvalue == yyyy && mmvalue > mm) &
      !(yyyy == yyvalue && mm == mmvalue && ddvalue > dd)
  );
};
//import ListaDesplegableChange from "@/components/Presupuestos/ListaDesplegableChange.vue";
export default {
  name: "LogPage",
  //components: { ListaDesplegableChange },
  computed: {
    ...mapState(["token", "permisoBitacora"]),
  },
  data() {
    return {
      fechaRango: "",
      selectedUser: "",
      listaLog: [],
    };
  },
  mounted() {
    this.obtenerLog();
  },
  validations: {
    fechaRango: {
      validate_date,
    },
  },
  methods: {
    async obtenerPorFecha() {
      try {
        this.listaLog = [];
        const fecha123 = await this.transformarFecha(this.fechaRango);
        const lista = (
          await this.$http.get(`log?type=Date&date=${fecha123}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data;

        for (let i = 0; i < lista.length; i++) {
          let usuarioModifico = lista[i].usuario;
          let codUsuario = await this.transformarNombreUsuario(usuarioModifico);
          let nombreUser = await this.obtenerNombrePorCod(codUsuario);
          let fechaModificacion = lista[i].fecha;
          let fechaFormato = await this.transformarFecha(fechaModificacion);
          let datovalue = lista[i].dato_nuevo;
          let cadena = JSON.stringify(datovalue);
          let cadenaSin = cadena.replace(/"/g, " ");
          let cadenaSin1 = cadenaSin.replace(/{/g, " ");
          let cadenaSin2 = cadenaSin1.replace(/}/g, " ");
          const parts = cadenaSin2.split(",");
          //viejo
          let datovalue11 = lista[i].dato_viejo;
          let cadena1 = JSON.stringify(datovalue11);
          let cadenaSin11 = cadena1.replace(/"/g, " ");
          let cadenaSin111 = cadenaSin11.replace(/{/g, " ");
          let cadenaSin21 = cadenaSin111.replace(/}/g, " ");
          const parts1 = cadenaSin21.split(",");
          const dato = {
            id: lista[i].id_log,
            tabla: lista[i].tabla_log,
            usuario: nombreUser,
            fecha: fechaFormato,
            accion: lista[i].accion,
            dato_viejo: parts1,
            datoNuevo: parts,
          };
          this.listaLog.push(dato);
        }
      } catch (error) {
        console.log(error);
      }
    },
    sendInfo(item) {
      this.selectedUser = item;
    },
    async obtenerLog() {
      try {
        this.listaLog = [];
        this.fechaRango = "";
        const lista = (
          await this.$http.get(`log?type=All`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data;

        for (let i = 0; i < lista.length; i++) {
          let usuarioModifico = lista[i].usuario;
          let codUsuario = await this.transformarNombreUsuario(usuarioModifico);
          let nombreUser = await this.obtenerNombrePorCod(codUsuario);
          let fechaModificacion = lista[i].fecha;
          let fechaFormato = await this.transformarFecha(fechaModificacion);
          let datovalue = lista[i].dato_nuevo;
          let cadena = JSON.stringify(datovalue);
          let cadenaSin = cadena.replace(/"/g, " ");
          let cadenaSin1 = cadenaSin.replace(/{/g, " ");
          let cadenaSin2 = cadenaSin1.replace(/}/g, " ");
          const parts = cadenaSin2.split(",");
          //viejo
          let datovalue11 = lista[i].dato_viejo;
          let cadena1 = JSON.stringify(datovalue11);
          let cadenaSin11 = cadena1.replace(/"/g, " ");
          let cadenaSin111 = cadenaSin11.replace(/{/g, " ");
          let cadenaSin21 = cadenaSin111.replace(/}/g, " ");
          const parts1 = cadenaSin21.split(",");
          const dato = {
            id: lista[i].id_log,
            tabla: lista[i].tabla_log,
            usuario: nombreUser,
            fecha: fechaFormato,
            accion: lista[i].accion,
            dato_viejo: parts1,
            datoNuevo: parts,
          };
          this.listaLog.push(dato);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async transformarNombreUsuario(value) {
      try {
        const nombreUsuario = (
          await this.$http.get(`users/name/${value}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos[0];

        return nombreUsuario.cod_usuario;
      } catch (error) {
        console.log(error);
      }
    },
    async obtenerNombrePorCod(value) {
      try {
        const nombreUsuario = (
          await this.$http.get(`users/${value}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos[0];
        const nombreU = nombreUsuario.nombres;
        const apellidoU = nombreUsuario.apellidos;
        const nombreCompleto = nombreU + " " + apellidoU;
        return nombreCompleto;
      } catch (error) {
        console.log(error);
      }
    },
    async transformarFecha(value) {
      const yyvalue = value.slice(0, 4);
      const mmvalue = value.slice(5, 7);
      const ddvalue = value.slice(8, 10);
      const fechaNormal = ddvalue + "-" + mmvalue + "-" + yyvalue;
      return fechaNormal;
    },
  },
};
</script>

<style scoped>
.mayor {
  padding: 50px 100px 50px 100px;
  background-color: #46b1c95b;
  margin-top: 0;
}
.contenedor__log {
  text-align: left;
  background-color: #f1f2f6;
  padding: 40px 80px 40px 80px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 450px;
}
.titulo_MODAL {
  color: #0d6efd;
  font-weight: bold;
}
.contenido_MODAL {
  margin: 0;
  padding: 0;
}
.primera-fila {
  background: #dfe4ea;
}
.lista {
  margin-top: 20px;
  width: 100%;
  display: flex;

  text-align: right;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.form__tabla {
  margin-top: 30px;
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
.calendario {
  background: transparent;
}
.container__label {
  color: var(--color-name);
  font-weight: bold;
  margin-right: 10px;

  position: relative;
  top: 10px;
}
.botoncito {
  width: 20%;
}
.botons {
  width: 80%;
  text-align: left;
}
.mensaje {
  margin-top: 40px;
  text-align: center;
  font-size: 16px;

  margin-right: 20px;
}
.fechaa {
  text-align: right;
}
.mensaje {
  text-align: left;
  color: #0d58cf;
  font-weight: bold;
}
</style>
