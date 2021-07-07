<template>
    <div class="usrlst">
        <div>
        <div class="btn">
            <button class="new-user" v-on:click="newUser()">Nuevo Usuario</button>
        </div>
        <div style="display: flex;">
        <div class="filter-title">Filtros</div>
        <div class="arrow" style="display: inline;" v-on:click="showFilters = !showFilters" :class="showFilters ? 'rotate' : ''">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    fill="currentColor" 
                    class="bi bi-caret-down-fill" 
                    viewBox="0 0 16 16"
                >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </div>
        </div>
        <transition class="animation"
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOutUp"
                        >
          <div v-if="showFilters" class="filters">
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
            <div class="container-facu">
                <div class="container__label">Departamento:</div>
                <select
                    v-model="departamento"
                    @change="getData()"
                    class="container__list"
                    :disabled="facultad=='TODAS'"
                >
                    <option disabled="true">{{ departamento }}</option>
                    <option
                        class="container__list__option"
                        v-for="(item, index) in listdepartamentos"
                        :key="index"
                        :value="item"
                    >
                    {{ item }}</option
                    >
                </select>
            </div>
            <div class="container-facu">
                <div class="container__label">Rol:</div>
                <select
                    v-model="rol"
                    @change="getData()"
                    class="container__list"
                >
                    <option disabled="true">{{ rol }}</option>
                    <option
                        class="container__list__option"
                        v-for="(item, index) in listroles"
                        :key="index"
                        :value="item"
                    >
                    {{ item }}</option
                    >
                </select>
            </div>
          </div>
        </transition>
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
            <div class="list-cards">
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
                        <div v-if="usr.nombre_usuario==selectedUser.username" class="user-data">
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

<script defer>
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
            showFilters: false,
            facultad: "TODAS",
            departamento: "Todos",
            rol: "Todos",
            inboxData: [],
            changeUser: false,
            selectedUser: {
                cod: null,
                name: '',
                rol: '',
                username: '',
                depto: '',
                cell: '',
                facu:''
            },
            listfacultad: ["TODAS"],
            listdepartamentos: ["Todos"],
            listroles: ["Todos", "Super Usuario"]
        }
    },
    watch: {
        facultad: async function(facu){
            if (facu!="TODAS"){
                this.departamento="Todos"
                await this.obtenerDepartamentos()
            }
        },
    },
    methods: {
        async getAllUsers(){
                return (
                    await this.$http.get(
                        `allUsers`,
                        {
                            headers: {
                                authorization: this.token,
                            },
                        }
                    )
                ).data
        },
        async getFacuUsers(){
            return (
                    await this.$http.get(
                        `users?criterio=facultad&nombre=${this.facultad}`,
                        {
                            headers: {
                                authorization: this.token,
                            },
                        }
                    )
                ).data
        },
        async getDepaUsers(){
            return (
                    await this.$http.get(
                        `users?criterio=departamento&nombre=${this.departamento}`,
                        {
                            headers: {
                                authorization: this.token,
                            },
                        }
                    )
                ).data
        },
        async getData() {
            this.loading=!this.loading
            this.inboxData=[]
            let response
            if (this.facultad=="TODAS"){
                response = await this.getAllUsers()
            }else{
                if (this.departamento=="Todos"){
                    response = await this.getFacuUsers()
                }else{
                    response = await this.getDepaUsers()
                }
            }
            for (let i = 0; i < response.length; i++) {
                const roleId= (await this.$http.get(`usersPerRole/${response[i].cod_usuario}`,
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
                    this.inboxData.push(response[i])
                    this.inboxData[i].nombre_completo=`${this.inboxData[i].nombres} ${this.inboxData[i].apellidos}`
                    this.inboxData[i].role=userRole
            }
            if (this.rol!="Todos"){
                this.inboxData=this.inboxData.filter(el => el.role == this.rol)
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
            this.selectedUser.facu = this.inboxData[i].facultad
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
        async obtenerDepartamentos() {
            this.listdepartamentos = ["Todos"];

            let listaDepartamentos = (
                await this.$http.get(`department?facu=${this.facultad}`, {
                headers: {
                    authorization: this.token,
                },
                })
            ).data.datos;
            for (let i of listaDepartamentos) {
                this.listdepartamentos.push(i.nombre_departamento);
            }
            listaDepartamentos.splice(1, 5);
        },
        async obtenerRoles() {
        const listaRoles = (
            await this.$http.get(`roles`, {
            headers: {
                authorization: this.token,
            },
            })
        ).data.datos;

        for (let i of listaRoles) {
            this.listroles.push(i.nombre_rol);
        }
        },
    },
    mounted() {
        this.obtenerFacultades()
        this.obtenerRoles()
        this.getData()
    },
}
</script>

<style lang="scss" scoped>
.usrlst {
    position: relative;
}
.filters{
    display: flex;
    justify-content: space-between;
    width: 100%;
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
    width: 100%;
}
.user-data {
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
.new-user {
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
:root{
  --animate-duration: 500ms;
}
.container-facu {
  padding-top: 1%;
  padding-bottom: 1%;
  text-align: left;
  width: 30%;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 0.8%;
  font-weight: bold;
}
.container__list {
  width: 100%;
  color: #576574;
  padding: 0.4%;
  background: #ecf0f1;
  border: 1px solid;
}
.filter-title{
    align-self: flex-start;
    text-align: left;
    font-size: 4vh;
    color: #3f4b5b;
    font-weight: 740;
    padding: 0 1% 0 0;
}
.arrow{
    align-self: center;
}
.rotate {
  -webkit-transform: rotateX(180deg);
          transform: rotateX(180deg);
}
</style>
