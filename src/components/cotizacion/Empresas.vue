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
                  <button class="confirm-company" @click="confirmCompany()">Confirmar empresa</button>
              </div>
              <div class="confirmed-companies">
                  <div class="confirmed-title">Empresas confirmadas:</div>
                  <ul class="company-list">
                      <li v-for="(company, index) in confirmed" :key="index">
                          {{ company }}
                          <div class="remove-list" v-on:click="removeElement(index)">x</div>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
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
        confirmed: []
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
        this.listaEmpresas.splice(this.listaEmpresas.indexOf(this.empresa.nombre),1)
    },
    removeElement: function (index){
        this.listaEmpresas.push(this.confirmed[index])
        this.confirmed.splice(index, 1)
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
    width: 50%;
    padding: 3% 0 0 2%;
}
.filter-title{
    font-size: 24px;
    padding: 0 2% 0 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.company-cat{
    width: 50%;
  color: #3a3a3a;
  padding: 6px 6px 6px 0;
  background: #F7F6F6;
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border: none;
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
    width: 70%;
}
.data-line{
    display: flex;
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.data-label{
    font-weight: 700;
    padding: 0 1% 0 0;
}
</style>