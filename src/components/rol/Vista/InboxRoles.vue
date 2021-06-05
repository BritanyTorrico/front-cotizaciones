<template>
    <div class="rolst">
        <div class="btn">
            <button class="new-role" v-on:click="newRole()">Nuevo Rol</button>
        </div>
        
        <div class="inbox-container">
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
                    </div>
                </div>
            </div>
            <div class="rol-data" :class="selectedRole.cod === null ? 'no-selected' : ''">
              <div v-if="selectedRole.cod!=null">
                <transition
                    enter-active-class="animate__animated animate__fadeInRight"
                    leave-active-class="animate__animated animate__fadeOutRight"
                >
                        <div v-if="!changeRole">
                            <RolView :rol="selectedRole"/>
                        </div>
                </transition>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
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
                console.log(`el rol %c${i} es %c${this.inboxData[i].nombre_rol}`,
                "font-size: 19px",
                "font-size: 24px");
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

<style scoped>
.rolst {
    position: relative;
}
.inbox-container {
    padding: 0px !important;
    gap: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.card-index {
    position: relative;
    align-items: baseline;
    padding: 2.5% 2.5%;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    width: 100%;
}
.list-cards {
    display: flex;
    height: 42rem;
    overflow: auto;
}
.rol-data {
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
.new-role {
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
</style>