<template>
    <div class="rolst">
        <div class="btn">
            <button class="new-role" v-on:click="newRole()">Nuevo Rol</button>
        </div>
        <div v-if="loading">
            <div class="loading-info">
                <div class="clock-loader"></div>
            </div>
        </div>
        <div v-else class="inbox-container">
            <div class="list-cards" :class="selectedRole.name === '' ? 'full-screen' : 'side-view'">
                <div class="card-side">
                    <div class="desc">Roles registrados:</div>
                    <div class="card-index" v-for="(rol, i) in inboxData" :key="i">
                        <div
                            class="single-card-container "
                            v-on:click="startTransition(i)"
                            :class="selectedRole.cod == rol.cod_rol ? 'selected-card' : ''"
                        >
                            <RolCard
                                :name="rol.nombre_rol"
                                :quant="rol.cantidad"
                            />
                        </div>
                        <div class="rol-data" v-if="rol.nombre_rol==selectedRole.name">
                            <div v-if="selectedRole.cod!=null">
                                <transition
                                    enter-active-class="animate__animated animate__fadeInDown"
                                    leave-active-class="animate__animated animate__fadeOutUp"
                                >
                                        <div v-if="!changeRole">
                                            <RolView :rol="selectedRole"/>
                                        </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script defer>
import RolCard from './RolCard.vue'
import RolView from './RolView.vue'
import { mapState } from 'vuex'
export default {
    name: 'InboxRoles',
    computed: {
        ...mapState(['token']),
    },
  components: { RolCard, RolView },
    data(){
        return{
            loading: false,
            inboxData: [],
            changeRole: false,
            selectedRole: {
                cod: null,
                name: '',
                functions: [],
                users: [],
            },
        }
    },
    methods: {
        async getData(){
            this.loading=!this.loading
            const resp= (
                await this.$http.get(
                    `roles`,
                    {
                        headers: {
                            authorization: this.token,
                        },
                    }
                )
            ).data.datos
            for (let i=0;i<resp.length;i++){
                this.inboxData.push(resp[i])
                const rpf=(
                await this.$http.get(
                    `rolePerFunctions?rol=${this.inboxData[i].nombre_rol}`,
                    {
                        headers: {
                            authorization: this.token,
                        },
                    }
                    )
                ).data.datos
                    const functs=[]
                    for (let j of rpf){
                        if(!j.nombre_funcion.includes('Gestionar')){
                            if (j.nombre_funcion.includes('Vista_')){
                                let nf=j.nombre_funcion.replace(/_/g, " ")
                                nf= nf.slice(6)
                                functs.push(nf)
                            }else{
                                functs.push(j.nombre_funcion)
                            }
                        }
                    }
                    this.inboxData[i].funciones=functs
                    const usrs=[]
                    const uoar=(
                            await this.$http.get(
                                `usersOfARole?rol=${this.inboxData[i].nombre_rol}`,
                                {
                                    headers: {
                                        authorization: this.token,
                                    },
                                }
                                )
                            ).data
                    for (let k of uoar){
                        usrs.push(k)
                    }
                    this.inboxData[i].usuarios=usrs
                    this.inboxData[i].cantidad=usrs.length
            }
            this.loading=!this.loading
        },
        async startTransition(i){
          this.changeRole=true;
          await this.showRole(i);
          this.changeRole=false;
        },
        async showRole(i){
            this.selectedRole.cod = this.inboxData[i].cod_rol
            this.selectedRole.name = this.inboxData[i].nombre_rol
            this.selectedRole.functions = this.inboxData[i].funciones
            this.selectedRole.users = this.inboxData[i].usuarios
        },
        async newRole(){
            this.$router.push('/creaRol')
        }
    },
    mounted (){
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
.rolst {
    position: relative;
}
.inbox-container {
    width: 100%;
    flex-direction: row;
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
.card-index {
    position: relative;
    border-bottom: 1px solid #9b9b9b;
    width: 100%;
}
.list-cards {
    display: flex;
    width: 100%;
}
.rol-data {
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
    padding: 1% 1% 0% 1%;
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
.new-role {
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
</style>