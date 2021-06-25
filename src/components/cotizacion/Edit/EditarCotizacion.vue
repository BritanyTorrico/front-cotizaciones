<template>
  <div class="cot-edit">
      <div class="form-title">Actualizar cotización</div>
      <div class="head-part">
      <div class="head-top">
        <h2>{{ cot.name }}</h2>
      </div>
      <h5>Items: </h5>
      <div class="items">
          <table
          class="items-list"
          >
          <thead>
                <tr>
                <th>Cantidad</th>
                <th>Unidad</th>
                <th>Item</th>
                <th>Detalle</th>
                <th>Unitario</th>
                <th>Total</th>
                </tr>
          </thead>
          <tbody>
                <tr v-for="(item, index) in cot.itemList" :key="index">
                <td style="border:1px solid;" class="table-quantity" >{{ item.cantidad }}</td>
                <td style="border:1px solid;" class="table-unity" >{{ item.unidad }}</td>
                <td style="border:1px solid;" class="table-itemname" >{{ item.nombre }}</td>
                <td style="border:1px solid;" class="table-detail" >
                    <textarea
                    name="detalleItem"
                        rows="3"
                        cols="50"
                        class="detalle-item"
                        type="text"
                        maxlength="1000"
                        v-model="item.detalle"
                    ></textarea>
                    <div class="form_check-error" v-if="item.detalle===''">
                      Campo obligatorio
                    </div>
                </td>
                <td style="border:1px solid;" class="table-unitprice" >
                    <input
                        id="unitarioItem"
                        class="unitario-item"
                        type="number"
                        max="99999"
                        min="0"
                        step=".01"
                        required
                        v-model="item.valor_unitario"
                        />
                      <div class="form_check-error" v-if="item.valor_unitario===null || item.valor_unitario===''">
                      Campo obligatorio
                    </div>
                    <div class="form_check-error" v-if="item.valor_unitario<0">
                      No se aceptan valores negativos
                    </div>
                    <div class="form_check-error" v-if="item.valor_unitario>9999">
                      No se aceptan valores mayores a 9999
                    </div>
                </td>
                <td style="border:1px solid;" class="table-totalprice" >{{ item.valor_unitario*item.cantidad }}</td>
                </tr>
          </tbody>
        </table>
        <div class="botoncito">
          <input
            type="file"
            id="file"
            ref="file"
            accept="image/*"
            @change="fileChange"
            class="image-input"
            hidden
          />
          <label v-if="cot.imagen_cotizacion===null" for="file">Subir Imagen</label>
          <button v-if="cot.imagen_cotizacion!=null" class="reject-button" @click="preview=!preview" id="show-button">
            <span for="show-button" v-if="preview">Ocultar Imagen</span>
            <span for="show-button" v-if="!preview">Mostrar Imagen</span>
          </button>
          <button
            class="accept-button"
            @click="submitForm"
          >
            Enviar
          </button>
      </div>
      <div v-if="preview" class="image-preview">
            <img :src="image" class="image-show" height="360px">
            <button class="delete-button" @click="removeFile()">Eliminar imagen</button>
      </div>
      </div>
  </div>
  <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Alert from "@/components/Alert.vue";
export default {
  name: "EditarCotizaciones",
  computed: {
    ...mapState(["token"]),
  },
  components: { Alert },
  data(){
      return{
          cot: {
              solcod:null,
              name:'',
              itemList:[],
              total:null,
              entrega:null,
              puesto_obra: null,
              imagen_cotizacion: null,
              fecha_resp: null
          },
          image:null,
          preview: false
      }
  },
  methods: {
      async submitForm(){
          try {
            let valid = true
            for (let i of this.cot.itemList){
              if (i.detalle=='' || i.valor_unitario<0 || i.valor_unitario>9999 || i.valor_unitario==null || i.valor_unitario==''){
                valid=false
              }
            }
            if (valid){
              await this.sendItemsData()
              await this.sendQuotData()
              await this.updateStatus()
              this.alert("success", "Cotización actualizada exitosamente");
              this.$router.push(`/cotizaciones`)
            }else{
              this.alert("warning", "Datos de items inválidos")
            }
          } catch (error) {
              this.alert("warning", error);
          }
      },
      async sendItemsData(){
          try {
              for (let i of this.cot.itemList){
                  
                    if (i.detalle=='' || i.valor_unitario<0 || i.valor_unitario>9999){
                      this.alert("warning", "valores de items inválidos")
                    }else{
                      await(
                      this.$http.put(`itemsPerQuotation/${this.$route.params.id}?item=${i.nombre}`,{
                          cantidad: i.cantidad,
                          unidad: i.unidad,
                          detalle:i.detalle,
                          valor_unitario:i.valor_unitario,
                          precio_total:i.valor_unitario*i.cantidad
                      },{
                        headers: {
                          authorization: this.token,
                        },
                        })
                      )
                    }
              }
          } catch (error) {
              this.alert("warning", "Valores de items inválidos");
          }
      },
      async sendQuotData(){
          try {
              let total=0
              for (let i of this.cot.itemList){
                  total+=i.valor_unitario*i.cantidad
              }
              await(
                  this.$http.put(`quotation/${this.$route.params.id}?type=Answers`,{
                      total_cotizacion:total,
                      tiempo_entrega:null,
                      puesto_obra:null,
                      imagen_cotizacion:this.cot.imagen_cotizacion,
                      fecha_respuesta:this.cot.fecha_resp
                  },{
            headers: {
              authorization: this.token,
            },
          })
              )
              
          } catch (error) {
              this.alert("warning", "Valores de cotización inválidos");
          }
      },
      async updateStatus(){
          try {
              await(
                  this.$http.put(`quotation/${this.$route.params.id}?type=Status`,{
                      estado_cotizacion:'COTIZACION_OBTENIDA'
                  },{
            headers: {
              authorization: this.token,
            },
          })
              )
              
          } catch (error) {
              this.alert("warning", "estado inválidos");
          }
      },
      fileChange(e){
        const file=e.target.files[0]
        this.image=URL.createObjectURL(file)
        this.createBase64Image(file)
        this.preview=true
      },
      createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObject);
      reader.onload = (e) => {
        this.cot.imagen_cotizacion=e.target.result;
      };
    },
    removeFile(){
      this.cot.imagen_cotizacion=null
      this.image=null
      this.preview=false
    },
      alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  mounted: async function(){
      const response=(await this.$http.get(`quotation/${this.$route.params.id}`,{
                headers:{
                  authorization:this.token,
                },
              })).data.datos[0]   
        this.cot.solcod=response.cod_solicitud
        this.cot.name=response.titulo_cotizacion
        this.cot.status=response.estado_cotizacion
        this.cot.total=response.total_cotizacion
        if (response.imagen_cotizacion!=null){
          this.cot.imagen_cotizacion=response.imagen_cotizacion
          let file=response.imagen_cotizacion
          file= await fetch(file)
          file=await file.blob()
          this.image=URL.createObjectURL(file)
        }
        
        this.cot.fecha_resp=new Date();

        const items=(await this.$http.get(`itemsPerQuotation?searchby=solicitud&inputdata=${this.$route.params.id}&typeinput=codigo`,{
                headers:{
                  authorization:this.token,
                },
              })).data.datos
        for (let i of items){
            const idg=(
                    await this.$http.get(
                        `expenseItem/${i.cod_item}`,
                        {
                            headers: {
                                authorization: this.token,
                            },
                        }
                    )
                ).data.datos
            const it={
                cod_item: i.cod_item,
                cantidad: i.cantidad,
                unidad: i.unidad,
                detalle: i.detalle,
                nombre: idg[0].nombre_itemgasto,
                valor_unitario: i.valor_unitario,
                precio_total: i.precio_total
            }
            if (it.cantidad==-1){it.cantidad=1}
            this.cot.itemList.push(it)
        }

  }
}
</script>

<style scoped>
.cot-edit{
    background: #fff;
    margin: 40px;
    padding: 10px 10px 20px 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
    width: 90%;
    border: 1px solid #808C8F;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
}
.cot-edit textarea {
  resize: none;
  word-wrap: break-word;
  overflow-y: auto;
  background-color: #f7f6f6;
  border-radius: 3px;
  padding: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
}
.head-top {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  color: #030303 !important;
  font-size: 30px;
  font-weight: 600;
}
.time {
  font-size: 16px;
  color: #3f4b5b !important;
  text-transform: capitalize;
}
.head-subject {
  font-size: 22px;
  font-weight: 600;
  color: #030303 !important;
  margin-top: 12px;
  text-align: left;
}
h5 {
  font-size: 20px;
  color: #030303 !important;
  line-height: 1.8;
  font-weight: 600;
  text-align: left;
}
.items {
  align-self: center;
  width: 100%;
  padding: 0 0 5% 0;
  font-size: 17px;
}
.items thead {
  padding: 0.5% 1% 0.5% 1%;
  background-color: #f1f2f6;
}
.items th {
  padding: 1% 1% 1% 1%;
  border: 1px solid #c0c0c0;
}
.items td {
  padding: 0.5% 1% 0.5% 1%;
  border: 1px solid #c0c0c0;
}
.confirmed-companies {
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  align-items: baseline;
}
.confirmed-title {
  color: #030303;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  padding-bottom: 1%;
  padding-right: 1%;
}
.company-name{
    color: #030303;
    list-style-position: inside;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 420;
    width: 100%;
}
.table-quantity{
  width: 11.5%!important;
}
.table-unity{
  width: 12%!important;
}
.table-detail{
  width: 37%!important;
}
.table-itemname{
  width: 13%!important; 
}
.table-unitprice{
  width: 10.5%!important; 
}
.table-totalprice{
  width: 9%!important; 
}
.accept-button {
  margin: auto;
  display: block;
  background-color: #003570;
  padding: 0.5% 2.5% 0.5% 2.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reject-button {
  margin: auto;
  display: block;
  background-color: #777272;
  padding: 0.5% 2.5% 0.5% 2.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.delete-button {
  justify-self: left;
  margin: auto;
  display: block;
  background-color: #ed1c24;;
  padding: 0.5% 2.5% 0.5% 2.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 17px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.options{
    display: flex;
    
}
.botoncito {
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  padding: 2%;
}
.form-title {
  text-align: left;
  color: #3d8af7;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border-bottom: 3px solid #0d58cf;
  width: 90%;
  padding: 0 0 1.5% 0;
}
.image-preview{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
.image-show{
  border: 1px;
  border-radius: 5px;
  max-width: auto;
  max-height: auto;
  align-items: center;
  
  padding: 0.2% 0% 1% 1.5%;
}
label{
  margin: auto;
  display: block;
  background-color: #777272;
  padding: 0.5% 2.5% 0.5% 2.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.form_check-error {
  color: #ed1c24;
  font-size: 14px;
  padding: 0 0 0 2%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>