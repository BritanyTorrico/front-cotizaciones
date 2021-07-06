<template>
    <div class="usrlst">
        <div>
        <div class="btn">
            <button class="new-user" v-on:click="newUser()">Nuevo Usuario</button>
        </div>
        <div class="container-facu">
            <div class="container__label">Facultad:</div>
            <select
                  v-model="facultad"
                  @change="getData()"
                  class="container__list"
            >
                <option disabled="true">{{ facultad }}</option>
                <option
                    class="container__list__option"
                    v-for="(item, index) in listfacultad"
                    :key="index"
                    :value="item"
                >
                {{ item }}</option
                >
            </select>
        </div>
        <div v-if="loading">
            <div class="loading-info">
                <div class="clock-loader"></div>
            </div>
        </div>
        <div v-else>
        <div v-if="inboxData.length===0">
            <div class="desc">No hay usuarios registrados en esta facultad</div>
        </div>
        <div v-else class="inbox-container">
            <div class="list-cards full-screen">
                <div class="card-side">
                    <div class="desc">Usuarios registrados:</div>
                    <div class="card-index" v-for="(usr, i) in inboxData" :key="i">
                        <div
                            class="single-card-container "
                            v-on:click="startTransition(i)"
                            :class="selectedUser.cod == usr.cod_usuario ? 'selected-card' : ''"
                        >
                            <UserCard
                                :name="usr.nombre_completo"
                                :username="usr.nombre_usuario"
                                :depto="usr.departamento"
                                :rol="usr.role"
                            />
                        </div>
                        <div v-if="usr.nombre_usuario==selectedUser.username" class="user-data" :class="selectedUser.cod === null ? 'no-selected' : ''">
                            <div v-if="selectedUser.cod!=null">
                                <transition
                                    enter-active-class="animate__animated animate__fadeInDown"
                                    leave-active-class="animate__animated animate__fadeOutUp"
                                >
                                        <div v-if="!changeUser">
                                            <UserView :user="selectedUser"/>
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
    </div>
</template>

<script>
import UserCard from './UserCard.vue'
import { mapState } from 'vuex'
import UserView from './UserView.vue'
export default {
    name: 'InboxUsuarios',
    computed: {
        ...mapState(['token']),
    },
    components: { UserCard, UserView },
    data() {
        return {
            loading: false,
            facultad: "Seleccione una opción",
            inboxData: [],
            changeUser: false,
            selectedUser: {
                cod: null,
                name: '',
                rol: '',
                username: '',
                depto: '',
                cell: '',
            },
            listfacultad: [],
        }
    },
    methods: {
        async getData() {
            this.loading=!this.loading
            this.inboxData=[]
            const response = (
                await this.$http.get(
                    `users?criterio=facultad&nombre=${this.facultad}`,
                    {
                        headers: {
                            authorization: this.token,
                        },
                    }
                )
            ).data
            for (let i = 0; i < response.length; i++) {
                this.inboxData.push(response[i])
                this.inboxData[i].nombre_completo=`${this.inboxData[i].nombres} ${this.inboxData[i].apellidos}`
                const roleId= (await this.$http.get(`usersPerRole/${this.inboxData[i].cod_usuario}`,
                    {
                        headers: {
                            authorization: this.token,
                        },
                    })).data.datos[0].cod_rol
                const userRole=(await this.$http.get(`roles/${roleId}`,
                    {
                        headers: {
                            authorization: this.token,
                        },
                    })).data.datos[0].nombre_rol
                this.inboxData[i].role=userRole
            }
            this.loading=!this.loading
        },
        async startTransition(i){
          this.changeUser=true;
          await this.showUser(i);
          this.changeUser=false;
        },
        async showUser(i) {
            this.selectedUser.cod = this.inboxData[i].cod_usuario
            this.selectedUser.name = this.inboxData[i].nombre_completo
            this.selectedUser.rol = this.inboxData[i].role
            this.selectedUser.username = this.inboxData[i].nombre_usuario
            this.selectedUser.depto = this.inboxData[i].departamento
            this.selectedUser.cell = this.inboxData[i].celular
        },
        async newUser() {
            this.$router.push('/register')
        },
        async obtenerFacultades() {
            const listaFacultades = (
                await this.$http.get("faculty", {
                headers: {
                    authorization: this.token,
                },
                })
            ).data;
                for (let i of listaFacultades){
                    this.listfacultad.push(i.nombre_facultad)
                }
        },
    },
    mounted() {
        this.obtenerFacultades()
    },
}
</script>

<style lang="scss" scoped>
.usrlst {
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
.list-cards {
    display: flex;
    overflow: auto;
}
.user-data {
    width: 100%;
    padding: 0 5% 5% 0;
    margin: 10px;
    background: #97ced8;
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
    border: 3px solid #030303;
    border-radius: 10px;
}
.new-user {
    margin: auto;
    display: block;
    background-color: #003570;
    padding: 1.2% 11.5% 1.2% 11.5% !important;
    border-radius: 22px;
    color: #fafafa;
    font-size: 22px;
    font-weight: bold;
    border: 0px;
    height: 50px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.btn {
    align-self: flex-start;
    padding: 2%;
    width: 30%;
}
.desc {
    font-size: 29px;
    text-align: left;
    font-weight: 600;
    padding: 2.5% 1% 1% 1%;
    background: #dddfe7;
    border: 1px solid #dddfe7;
    border-radius: 5%;
    width: 100%;
}
:root{
  --animate-duration: 1000ms;
}
.no-selected {
    padding: 0 !important;
    margin: 0;
    width: 0% !important;
}
.full-screen {
    width: 100% !important;
}
.side-view {
    width: 40% !important;
}
.container-facu {
  padding-top: 20px;
  text-align: left;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
}
.container__list {
  width: 100%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
  border: 1px solid;
}
</style>
