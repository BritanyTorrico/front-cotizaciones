<template>
  <div class="untlst">
    <div class="btn">
      <button class="new-unit" v-on:click="newUnit()">Nueva Unidad</button>
    </div>
    <div v-if="loading">
            <div class="loading-info">
                <div class="clock-loader"></div>
            </div>
        </div>
        <div v-else>
    <div v-if="inboxData.length === 0">
      <div class="desc">No hay unidades registradas en este departamento</div>
    </div>
    <div v-else class="inbox-container">
      <div
        class="inbox-cards"
        :class="selectedUnit.name === '' ? 'full-screen' : 'side-view'"
      >
        <div class="card-side">
          <div class="desc">Unidades registradas:</div>
          <div class="card-index" v-for="(un, i) in inboxData" :key="i">
            <div
              class="single-card-container "
              v-on:click="startTransition(i)"
              :class="
                selectedUnit.name == un.nombre_unidadgasto
                  ? 'selected-card'
                  : ''
              "
            >
              <UnitCard
                :name="un.nombre_unidadgasto"
                :attendant="un.jefe_unidad"
                :description="un.descripcion_unidadgasto"
              />
            </div>
            <div
        class="inbox-form"
        v-if="un.nombre_unidadgasto==selectedUnit.name"
      >
        <div v-if="selectedUnit.name != ''">
          <transition
            enter-active-class="animate__animated animate__fadeInRight"
            leave-active-class="animate__animated animate__fadeOutRight"
          >
            <div v-if="!changeUn">
              <UnitView :unit="selectedUnit" />
            </div>
          </transition>
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script defer>
import UnitCard from "./UnitCard.vue";
import UnitView from "./UnitView.vue";
import { mapState } from "vuex";
export default {
  name: "InboxUnidad",
  components: { UnitCard, UnitView },
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {
      loading: false,
      inboxData: [],
      changeUn: false,
      selectedUnit: {
        cod: null,
        name: "",
        attendant: "",
        budget: null,
        description: "",
      },
      gestion: "",
    };
  },
  methods: {
    async getData() {
      this.loading=!this.loading
      const response = (
        await this.$http.get(
          `spendingUnit?type=name&departamento=${localStorage.getItem(
            "depto"
          )}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
      ).data.datos;
      for (let i of response) {
        this.inboxData.push(i);
      }
      this.loading=!this.loading
    },
    async startTransition(i) {
      this.changeUn = true;
      await this.showUnit(i);
      this.changeUn = false;
    },
    async obtenerpresupuesto() {
      try {
        const response = (
          await this.$http.get(
            `spendingUnitWithBudget?type=name&departamento=${localStorage.getItem(
              "depto"
            )}&gestion=${this.gestion}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data;
        return response;
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async showUnit(i) {
      let presu = await this.obtenerpresupuesto();
      this.selectedUnit.cod = this.inboxData[i].cod_unidadgasto;
      this.selectedUnit.name = this.inboxData[i].nombre_unidadgasto;
      this.selectedUnit.attendant = this.inboxData[i].jefe_unidad;
      this.selectedUnit.description = this.inboxData[i].descripcion_unidadgasto;
      this.selectedUnit.budget = presu[i].presupuesto_unidad;
    },
    async newUnit() {
      this.$router.push("/unidad/nueva");
    },
  },
  mounted() {
    this.gestion = null;
    const today = new Date();
    this.gestion = today.getFullYear();
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.untlst {
  position: relative;
}
.inbox-container {
  width: 100%;
    flex-direction: row;
}
.card-index {
  position: relative;
    border-bottom: 1px solid #9b9b9b;
    width: 100%;
}
.loading-info{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
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
.inbox-cards {
  display: flex;
  overflow: auto;
}
.inbox-form {
  display: flex;
    flex-direction: column;
    width: 100%!important;
    background: #97ced8;
    border-right: 3px solid #030303;
    border-left: 3px solid #030303;
    border-bottom: 3px solid #030303;
    border-radius: 0 0 10px 10px;
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
  background: #97ced8;
    border-right: 3px solid #030303;
    border-left: 3px solid #030303;
    border-top: 3px solid #030303;
    border-radius: 10px 10px 0 0;
}
.new-unit {
  margin: auto;
    display: block;
    background-color: #003570;
    width: 22vw;
    border-radius: 22px;
    color: #fafafa;
    font-size: 1.5em;
    font-weight: bold;
    border: 0px;
    height: 6vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.btn {
  align-self: flex-start;
    padding: 2%;
    width: 40%;
}
.desc {
  font-size: 3.9vh;
    text-align: left;
    font-weight: 600;
    padding: 1% 1% 1% 1%;
    background: #c9c9c9;
    width: 100%;
}
:root {
  --animate-duration: 500ms;
}
</style>
