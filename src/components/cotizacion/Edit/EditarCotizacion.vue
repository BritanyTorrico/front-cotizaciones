<template>
  <div class="cot-edit">
      <div class="form-title">Actualizar cotización</div>
      <div class="head-part">
      <div class="head-top">
        <h2>{{ cot.name }}</h2>
      </div>
      <h5>Items: </h5>
      <form @submit.prevent="submitForm">
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
                </td>
                <td style="border:1px solid;" class="table-totalprice" >{{ item.valor_unitario*item.cantidad }}</td>
                </tr>
          </tbody>
        </table>
        <div class="botoncito">
        <button
          class="accept-button"
        >
          Enviar
        </button>
      </div>
      </div>
      </form>
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
          }
      }
  },
  methods: {
      async submitForm(){
          try {
              await this.sendItemsData()
              await this.sendQuotData()
              await this.updateStatus()
              this.alert("success", "Cotización actualizada exitosamente");
              //this.$router.push(`/cotizaciones`)

          } catch (error) {
              this.alert("warning", error);
          }
      },
      async sendItemsData(){
          try {
              for (let i of this.cot.itemList){
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
                      imagen_cotizacion:null,
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
        this.cot.imagen_cotizacion=response.imagen_cotizacion
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
            if (it.cantidad==-1){it.cantidad="-"}
            this.cot.itemList.push(it)
        }

  }
}
</script>

<style scoped>
.single-quotation-details{
    background: #fff;
    margin: 40px;
    padding: 10px 10px 20px 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
    width: 100%;
    border: 1px solid #808C8F;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
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
  padding: 1.2% 2.5% 1.2% 2.5%;
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
  background-color: #b70d0d;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
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
</style>