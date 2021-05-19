<template>
  <section>
      <div class="company-filter">
          <div class="filter-head">
              <h3 class="filter-title">Seleccionar Empresa:</h3>
              <select
                    name="companySearch"
                    class="company-cat"
                    @change="onChange($event)"
                    v-model="selectedCompany"
                  >
                  <option 
                    v-for="(company, index) in listaEmpresas"
                    :key="index"
                    :value="company"
                  >{{  company  }}</option>
              </select>
          </div>
          <div class="selected">
              <div v-if="this.empresa.nombre===null"></div>
              <div v-else>
                <div class="selected-data">
                    <div class="data-line">
                        <div class="data-label">Nombre:</div>
                        <div class="data-info">{{ this.empresa.nombre }}</div>
                    </div>
                    <div class="data-line">
                        <div class="data-label">NIT:</div>
                        <div class="data-info">{{ this.empresa.nit }}</div>
                    </div>
                    <div class="data-line">
                        <div class="data-label">Representante legal:</div>
                        <div class="data-info">{{ this.empresa.representante }}</div>
                    </div>
                    <div class="data-line">
                        <div class="data-label">Teléfono:</div>
                        <div class="data-info">{{ this.empresa.telefono }}</div>
                    </div>
                    <div class="data-line">
                        <div class="data-label">Dirección:</div>
                        <div class="data-info">{{ this.empresa.direccion }}</div>
                    </div>
                    <div class="data-line">
                        <div class="data-label">Correo electrónico:</div>
                        <div class="data-info">{{ this.empresa.correo }}</div>
                    </div>
                    <div class="data-line">
                        <div class="data-label">Cuenta bancaria:</div>
                        <div class="data-info">{{ this.empresa.banco }}</div>
                    </div>
                    <div class="confirm-button">
                        <button 
                        class="confirm-company" 
                        @click="confirmCompany()"
                        :disabled="this.confirmed.length===3 || this.confirmed[this.confirmed.length-1]===this.empresa.nombre"
                        :class="this.confirmed.length===3 || this.confirmed[this.confirmed.length-1]===this.empresa.nombre ? 'button-disabled':''" 
                        >Confirmar empresa</button>
                    </div>
                    
                </div>
              </div>
              <div class="confirmed-companies">
                  <div class="confirmed-title">Empresas confirmadas:</div>
                  <ul class="company-list">
                      <li v-for="(company, index) in confirmed" :key="index" class="list-item">
                          {{ company }}
                          <div class="remove-list" v-on:click="removeElement(index)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                             </svg>
                          </div>
                          <div class="redirect-cot">
                              <button class="accept-button" v-on:click="printDiv(company, date)">Enviar</button>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
name: "Empresas",
computed: {
    ...mapState(["token"]),
  },
data(){
    return{
        disabled:false,
        empresa: {
            nombre: null,
            nit: null,
            representante: null,
            telefono: null,
            direccion: null,
            correo: null,
            banco: null,
        },
        listaEmpresas: [],
        companiesData: [],
        selectedCompany: '',
        confirmed: [],
        confirmedData: []
    }
},
props: {
    date: String,
},
validations: {
    confirmed: {
        required,
        maxLength: maxLength(3),
        minLength: minLength(3)
    }
},
methods: {
    async getCompanies(){
            const emp = (await this.$http.get('company?rubro=All', {
          headers: {
            authorization: this.token,
          },
        })).data;
            for (let i=0;i<emp.length;i++){
                this.listaEmpresas.push(emp[i].nombre_empresa)
                this.companiesData.push (emp[i])
            }
    },
    async showData(i){
        console.log(i);
        this.empresa.nombre=this.companiesData[i].nombre_empresa
        this.empresa.nit=this.companiesData[i].nit_empresa
        this.empresa.representante=this.companiesData[i].representante_empresa
        this.empresa.telefono=this.companiesData[i].telf_empresa
        this.empresa.direccion=this.companiesData[i].direccion_empresa
        this.empresa.correo=this.companiesData[i].correo_empresa
        this.empresa.banco=this.companiesData[i].cuenta_bancaria
    },
    onChange(event){
        let comp=event.target.value;
        for (let i=0; i < this.companiesData.length;i++){
            if (this.listaEmpresas[i]==comp) {
                this.showData(i)}
        }
    },
    confirmCompany(){
        this.confirmed.push(this.empresa.nombre)
        this.confirmedData.push(this.companiesData[this.listaEmpresas.indexOf(this.empresa.nombre)])
        this.companiesData.splice(this.listaEmpresas.indexOf(this.empresa.nombre),1)
        this.listaEmpresas.splice(this.listaEmpresas.indexOf(this.empresa.nombre),1)
        
    },
    removeElement: function (index){
        this.listaEmpresas.push(this.confirmed[index])
        this.companiesData.push(this.confirmedData[index])
        this.confirmed.splice(index, 1)
        this.confirmedData.splice(index, 1)
    },
    printDiv(emp, fecha){
        console.log(emp)
        console.log(fecha);
    }
},
mounted(){
    this.getCompanies();
}
}
</script>

<style>
.company-filter{
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
}
.filter-head{
    display: flex;
    width: 75%;
    padding: 3% 0 0 2%;
    align-self: flex-start;
}
.filter-title{
    font-size: 24px;
    padding: 0 2% 0 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 650;
}
.company-cat{
    width: 80%;
  color: #3a3a3a;
  padding: 6px 6px 6px 0;
  background: #F7F6F6;
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border: 1px solid #c0c0c0;
  border-radius: 3px;
}
.selected{
    display: flex;
    width: 100%;
    align-content: center;
    justify-content: space-between;
    padding: 2% 2% 2% 2%;
}
.selected-data{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: initial;
}
.data-line{
    display: flex;
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 1% 0 1% 0;
    color: #3f4b5b;
    
}
.data-label{
    font-weight: 700;
}
.data-info{
    padding: 0 0 0 0.5rem;
}
.confirm-button{
    padding: 2% 0 0 0 ;
}
.button-disabled {
    background:#999999;
    border: 0px;
}
.confirm-company{
  display: block;
  background-color: #003570;
  padding: 1.2% 1.5% 1.2% 1.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 18px;
  font-weight: bold;
  border: 0px;
}
.confirmed-companies{
    width: 40%;
}
.confirmed-title{
    color: #3f4b5b;
    font-size: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
    padding-bottom: 4%;
}
.company-list{
    color: #030303;
    list-style-position: inside;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.list-item{
    padding: 0 0 3% 15%;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 420;
    width: 100%;
}
.remove-list{
    display: inline;
    color: #ed1c24;
    padding: 0 5% 0 3%;
}
.accept-button{
    margin: auto;
  background-color: #003570;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 13px;
  font-weight: bold;
  border: 0px;
}
.redirect-cot{
    display: inline;
}
</style>