(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-abf1bc06"],{1276:function(t,e,i){"use strict";var s=i("d784"),a=i("44e7"),o=i("825a"),n=i("1d80"),r=i("4840"),c=i("8aa5"),l=i("50c4"),d=i("14c3"),u=i("9263"),m=i("9f7f"),_=m.UNSUPPORTED_Y,v=[].push,h=Math.min,p=4294967295;s("split",2,(function(t,e,i){var s;return s="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,i){var s=String(n(this)),o=void 0===i?p:i>>>0;if(0===o)return[];if(void 0===t)return[s];if(!a(t))return e.call(s,t,o);var r,c,l,d=[],m=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),_=0,h=new RegExp(t.source,m+"g");while(r=u.call(h,s)){if(c=h.lastIndex,c>_&&(d.push(s.slice(_,r.index)),r.length>1&&r.index<s.length&&v.apply(d,r.slice(1)),l=r[0].length,_=c,d.length>=o))break;h.lastIndex===r.index&&h.lastIndex++}return _===s.length?!l&&h.test("")||d.push(""):d.push(s.slice(_)),d.length>o?d.slice(0,o):d}:"0".split(void 0,0).length?function(t,i){return void 0===t&&0===i?[]:e.call(this,t,i)}:e,[function(e,i){var a=n(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,a,i):s.call(String(a),e,i)},function(t,a){var n=i(s,t,this,a,s!==e);if(n.done)return n.value;var u=o(t),m=String(this),v=r(u,RegExp),g=u.unicode,f=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(_?"g":"y"),b=new v(_?"^(?:"+u.source+")":u,f),C=void 0===a?p:a>>>0;if(0===C)return[];if(0===m.length)return null===d(b,m)?[m]:[];var x=0,w=0,I=[];while(w<m.length){b.lastIndex=_?0:w;var $,k=d(b,_?m.slice(w):m);if(null===k||($=h(l(b.lastIndex+(_?w:0)),m.length))===x)w=c(m,w,g);else{if(I.push(m.slice(x,w)),I.length===C)return I;for(var S=1;S<=k.length-1;S++)if(I.push(k[S]),I.length===C)return I;w=x=$}}return I.push(m.slice(x)),I}]}),_)},1414:function(t,e,i){"use strict";i("5103")},"370e":function(t,e,i){"use strict";i("fd78")},"40c9":function(t,e,i){},"44e7":function(t,e,i){var s=i("861d"),a=i("c6b6"),o=i("b622"),n=o("match");t.exports=function(t){var e;return s(t)&&(void 0!==(e=t[n])?!!e:"RegExp"==a(t))}},5103:function(t,e,i){},"7e7c":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"soli_container"},[i("solicitud-datos")],1)},a=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container-soli"},[i("link",{attrs:{href:"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css",rel:"stylesheet",integrity:"sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0",crossorigin:"anonymous"}}),i("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm(e)}}},[i("div",{staticClass:"form_title"},[i("div",{staticClass:"formulario_label"},[t._v("Titulo:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.solicitud.nombre_solicitud,expression:"solicitud.nombre_solicitud"}],class:t.$v.solicitud.nombre_solicitud.$invalid?"form_check-input-error":"form__input",attrs:{type:"text"},domProps:{value:t.solicitud.nombre_solicitud},on:{input:function(e){e.target.composing||t.$set(t.solicitud,"nombre_solicitud",e.target.value)}}}),t.$v.solicitud.nombre_solicitud.required?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Campo obligatorio. ")]),t.$v.solicitud.nombre_solicitud.maxLength?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Máximo "+t._s(t.$v.solicitud.nombre_solicitud.$params.maxLength.max)+"caracteres. ")]),t.$v.solicitud.nombre_solicitud.minLength?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Minimo 5 caracteres. ")]),t.$v.solicitud.nombre_solicitud.alpha1?t._e():i("div",{staticClass:"form_check-error"},[t._v(" No se aceptan caracteres especiales. ")])]),i("div",{staticClass:"lista"},[i("div",{staticClass:"izquierda"}),i("div",{staticClass:"derecha"},[i("lista-desplegable",{key:t.componentKey,attrs:{required:"",nombreLista:"Unidad de gasto:",lista:t.listaUnidadesDeGasto,Mensaje:"Campo Obligatorio",value:t.solicitud.unidadgasto_solicitud},model:{value:t.solicitud.unidadgasto_solicitud,callback:function(e){t.$set(t.solicitud,"unidadgasto_solicitud",e)},expression:"solicitud.unidadgasto_solicitud"}})],1)]),i("div",{staticClass:"form__justficacion"},[i("div",{staticClass:"formulario_label"},[t._v("Detalle de solicitud:")]),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.solicitud.detalle_solicitud,expression:"solicitud.detalle_solicitud"}],class:t.$v.solicitud.detalle_solicitud.$invalid?"form_check-input-error":"form__input",attrs:{rows:"7",cols:"50",type:"text"},domProps:{value:t.solicitud.detalle_solicitud},on:{input:function(e){e.target.composing||t.$set(t.solicitud,"detalle_solicitud",e.target.value)}}}),t.$v.solicitud.detalle_solicitud.required?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Campo obligatorio. ")]),t.$v.solicitud.detalle_solicitud.maxLength?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Máximo "+t._s(t.$v.solicitud.detalle_solicitud.$params.maxLength.max)+"caracteres. ")]),t.$v.solicitud.detalle_solicitud.minLength?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Minimo 5 caracteres. ")])]),i("div",{staticClass:"seccion2"},[i("div",{staticClass:"seccion__Izq"},[i("div",{staticClass:"formulario_label seccion__Izq-titulo"},[t._v(" Agregar un nuevo item: ")]),i("div",{staticClass:"seccion__Izq-fila1"},[i("div",{staticClass:"form__categoria"},[i("div",{staticClass:"container__label"},[t._v("Categoria:")]),i("div",{staticClass:"contenedor-select"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.solicitud.categoria,expression:"solicitud.categoria"}],staticClass:"container__list",on:{change:[function(e){var i=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.solicitud,"categoria",e.target.multiple?i:i[0])},function(e){return t.obtenerItems()}]}},[i("option",{attrs:{disabled:"true"}},[t._v(t._s(t.solicitud.categoria))]),t._l(t.listaCategorias,(function(e,s){return i("option",{key:s,staticClass:"container__list__option",domProps:{value:e}},[t._v(" "+t._s(e)+" ")])}))],2)])]),i("div",{staticClass:"container-nombre-item"},[i("div",{staticClass:"container__label"},[t._v("item de gasto:")]),i("div",{staticClass:"contenedor-select"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.solicitud.nombre_item,expression:"solicitud.nombre_item"}],staticClass:"container__list",attrs:{required:""},on:{change:[function(e){var i=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.solicitud,"nombre_item",e.target.multiple?i:i[0])},function(e){return t.obtenerDescripcion()}]}},[i("option",{attrs:{disabled:"true"}},[t._v(t._s(t.solicitud.nombre_item))]),t._l(t.listItems,(function(e,s){return i("option",{key:s,staticClass:"container__list__option",domProps:{value:e}},[t._v(" "+t._s(e))])}))],2)])])]),i("div",{staticClass:"seccion__Izq-fila2"},["Servicios"!=this.solicitud.categoria?i("div",{staticClass:"form__cantidad"},[i("div",{staticClass:"formulario_label"},[t._v(" Cantidad: ")]),i("div",{staticClass:"cantidad-input"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.elemento.cantidad,expression:"elemento.cantidad"}],class:t.$v.elemento.cantidad.$invalid?"form_check-input-error":"form__input",attrs:{required:!t.habilitar,disabled:!t.disabled,type:"number"},domProps:{value:t.elemento.cantidad},on:{input:function(e){e.target.composing||t.$set(t.elemento,"cantidad",e.target.value)}}})]),t.$v.elemento.cantidad.between?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Ingrese valores entre 1-100. ")])]):t._e(),i("div",{staticClass:"form__boton"},[i("a",{staticClass:"btn btn-success boton-agregar",on:{click:function(e){return t.agregarItem()}}},[t._v("Agregar")])])])]),i("div",{staticClass:"seccion__Der"},["Seleccione una opcion"!=t.solicitud.nombre_item?i("div",{staticClass:"form__descripcion"},[i("div",{staticClass:"formulario_label"},[t._v(" Descripción: ")]),i("div",{staticClass:"form__descripcion-contenido"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.descripcionItem,expression:"descripcionItem"}],staticClass:"form__input",attrs:{rows:"7",cols:"50",type:"text"},domProps:{value:t.descripcionItem},on:{input:function(e){e.target.composing||(t.descripcionItem=e.target.value)}}})])]):t._e()])]),0!=this.listaSolicitudItems.length?i("div",{staticClass:"form__lista col-sm-8 col-sm-offset-2"},["Servicios"!=this.solicitud.categoria?i("div",{staticClass:"formulario_label"},[t._v(" Lista de items: ")]):t._e(),"Servicios"==this.solicitud.categoria?i("div",{staticClass:"formulario_label"},[t._v(" Lista de Servicios: ")]):t._e(),i("div",{staticClass:"form__tabla"},[i("table",{staticClass:"table table-striped tabla "},[t._m(0),i("tbody",t._l(this.listaSolicitudItems,(function(e,s){return i("tr",{key:s},[i("td",[t._v(" "+t._s(e.cantidad)+" ")]),i("td",[t._v(" "+t._s(e.nombre_item)+" ")]),i("td",[i("a",{staticClass:"btn btn-danger",on:{click:function(e){return t.eliminarItems(s)}}},[t._v("Eliminar")])])])})),0)])])]):t._e(),0==this.listaSolicitudItems.length?i("h4",{staticClass:"form_check-error"},[t._v(" (*) Agregue un item ")]):t._e(),i("div",{staticClass:"form__presupuesto"},[i("div",{staticClass:"aux-izquierdo"}),i("div",{staticClass:"presupuesto"},[i("div",{staticClass:"formulario_label"},[t._v("Presupuesto:")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.solicitud.estimado_solicitud,expression:"solicitud.estimado_solicitud"}],class:t.$v.solicitud.estimado_solicitud.$invalid?"form_check-input-error":"form__input",attrs:{type:"text"},domProps:{value:t.solicitud.estimado_solicitud},on:{input:function(e){e.target.composing||t.$set(t.solicitud,"estimado_solicitud",e.target.value)}}}),t.$v.solicitud.estimado_solicitud.required?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Campo Obligatorio. ")]),t.$v.solicitud.estimado_solicitud.between?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Ingrese valores entre (1-10000). ")]),t.$v.solicitud.estimado_solicitud.validate_decimales?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Maximo 2 decimales. ")]),t.$v.solicitud.estimado_solicitud.alpha2?t._e():i("div",{staticClass:"form_check-error"},[t._v(" Ingrese un valor numérico. ")])])]),i("Alert",{ref:"alert"}),i("AlertConfirmation",{ref:"alertConfirmation"}),t._m(1)],1)])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("tr",{staticClass:"primera-fila"},[i("th",[t._v("Cantidad")]),i("th",[t._v("Nombre de item")]),i("th",[t._v("Eliminar")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"boton-contenedor"},[i("div",{staticClass:"boton-contenedor-izq"}),i("div",{staticClass:"boton-contenedor-der"},[i("input",{staticClass:"btn btn-success boton-agregar",attrs:{type:"submit",value:"Enviar"}})])])}],r=i("1da1"),c=i("5530"),l=(i("96cf"),i("ac1f"),i("1276"),i("b5ae")),d=i("c906"),u=i("f3c4"),m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("div",{staticClass:"alert",class:t.type},[t._v(" "+t._s(t.message)+" "),i("div",{staticClass:"botones"},[i("p",{staticClass:"advertencia"},[t._v("(Se borrara la lista si cambia de categoria)")]),i("button",{staticClass:"btn btn-success botonBorrar",on:{click:function(e){return t.eliminarLista()}}},[t._v(" Cambiar Categoria ")]),i("button",{staticClass:"btn btn-light",on:{click:function(e){return t.hideAlert()}}},[t._v(" Cancelar ")])])]):t._e()},_=[],v=i("4360"),h={name:"AlertConfirmation",store:v["store"],data:function(){return{show:!1,type:"",message:""}},methods:{showAlert:function(t,e){this.type=t,this.message=e,this.show=!0},hideAlert:function(){this.show=!1},eliminarLista:function(){this.$store.commit("setDelete"),this.hideAlert()}}},p=h,g=(i("a1f6"),i("2877")),f=Object(g["a"])(p,m,_,!1,null,"3ec56eca",null),b=f.exports,C=i("2f62"),x=l["helpers"].regex("alpha1",/^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ.\s]*$/),w=l["helpers"].regex("alpha1",/^[0-9,.\s]*$/),I=function(t){var e=String(t);if(e.indexOf(".")>0){var i=e.split("."),s=String(i[1]);return!l["helpers"].req(t)||!(s.length>2)}return!0},$={components:{Alert:d["a"],ListaDesplegable:u["a"],AlertConfirmation:b},name:"SolicitudDatos",store:v["store"],mounted:function(){this.getCategories(),this.getDepartamento()},computed:Object(c["a"])({},Object(C["c"])(["token","listaSolicitudItems"])),data:function(){return{solicitud:{nombre_solicitud:null,detalle_solicitud:null,categoria:"Seleccione una opcion",nombre_item:"Seleccione una opcion",unidadgasto_solicitud:"Seleccione una opcion",estimado_solicitud:null},elemento:{cantidad:null},listaCategorias:[],listItems:[],listaPeticion:[],item:"",disabled:!0,habilitar:!0,listaUnidadesDeGasto:[],descripcionItem:null,componentKey:0}},validations:{solicitud:{nombre_solicitud:{required:l["required"],minLength:Object(l["minLength"])(5),maxLength:Object(l["maxLength"])(50),alpha1:x},detalle_solicitud:{required:l["required"],minLength:Object(l["minLength"])(5),maxLength:Object(l["maxLength"])(1e3)},unidadgasto_solicitud:{required:l["required"]},estimado_solicitud:{required:l["required"],between:Object(l["between"])(1,1e4),validate_decimales:I,alpha2:w}},elemento:{cantidad:{required:l["required"],between:Object(l["between"])(1,100)}}},methods:Object(c["a"])(Object(c["a"])({},Object(C["b"])(["setlistaSolicitudItems"])),{},{forceRerender:function(){this.componentKey+=1},submitForm:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,t.$v.solicitud.$invalid||!(t.listaSolicitudItems.length>0)){e.next=21;break}return e.next=4,t.$http.post("request",{nombre_solicitud:t.solicitud.nombre_solicitud,detalle_solicitud:t.solicitud.detalle_solicitud,estimado_solicitud:t.solicitud.estimado_solicitud,unidadgasto_solicitud:t.solicitud.unidadgasto_solicitud},{headers:{authorization:t.token}});case 4:return console.log("pasa el request"),e.next=7,t.$http.post("itemsPerRequest",{nombre_solicitud:t.solicitud.nombre_solicitud,items:t.listaSolicitudItems},{headers:{authorization:t.token}});case 7:console.log("pasa el itemPerRequest"),t.alert("success","Solicitud enviada"),t.solicitud.nombre_solicitud=null,t.solicitud.detalle_solicitud=null,t.solicitud.categoria="Seleccione una opcion",t.solicitud.nombre_item="Seleccione una opcion",t.solicitud.unidadgasto_solicitud="Seleccione una opcion",t.solicitud.estimado_solicitud=null,t.$store.commit("setDelete"),t.listaUnidadesDeGasto=[],t.getDepartamento(),t.forceRerender(),e.next=22;break;case 21:t.alert("warning","Rellene todos los datos correctamente");case 22:e.next=29;break;case 24:e.prev=24,e.t0=e["catch"](0),t.alert("warning",e.t0),console.log(e.t0),t.alert("warning","Algo salio mal");case 29:case"end":return e.stop()}}),e,null,[[0,24]])})))()},getCategories:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("specificCategory",{headers:{authorization:t.token}});case 2:for(i=e.sent.data,s=0;s<i.length;s++)t.listaCategorias.push(i[s].nombre_categoriaespecifica);case 4:case"end":return e.stop()}}),e)})))()},obtenerItems:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i,s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return null!=t.solicitud.categoria&&t.listaSolicitudItems.length>0&&(i=t.listaSolicitudItems[t.listaSolicitudItems.length-1].categoria,i!=t.solicitud.categoria&&t.alertConfirmation("warning","No puede seleccionar Items de distinta categoria")),"Servicios"==t.solicitud.categoria?(t.disabled=!1,t.elemento.cantidad=null):t.disabled=!0,t.listItems=[],e.next=5,t.$http.get("expenseItem?type=cat&nombre=".concat(t.solicitud.categoria),{headers:{authorization:t.token}});case 5:for(s=e.sent.data,a=0;a<s.length;a++)t.listItems.push(s[a].nombre_itemgasto);case 7:case"end":return e.stop()}}),e)})))()},eliminarItems:function(t){this.$store.commit("setEliminar",t)},agregarItem:function(){if(this.obtenerItems(),"Seleccione una opcion"!=this.solicitud.nombre_item&&"Servicios"===this.solicitud.categoria){var t={nombre_item:this.solicitud.nombre_item,cantidad:1,categoria:this.solicitud.categoria,unidad_solicitud:this.solicitud.nombre_item,detalle_solicitud:this.descripcionItem};this.$store.commit("setlistaSolicitudItems",t),this.solicitud.nombre_item="Seleccione una opcion",this.elemento.cantidad=null}else if("Seleccione una opcion"==this.solicitud.nombre_item||this.$v.elemento.cantidad.$invalid)this.alert("warning","Rellene correctamente la seccion de items");else{var e={nombre_item:this.solicitud.nombre_item,cantidad:this.elemento.cantidad,categoria:this.solicitud.categoria,unidad_solicitud:this.solicitud.nombre_item,detalle_solicitud:this.descripcionItem};this.$store.commit("setlistaSolicitudItems",e),this.solicitud.nombre_item="Seleccione una opcion",this.elemento.cantidad=null}if(this.listaSolicitudItems.length>1){var i=this.listaSolicitudItems[this.listaSolicitudItems.length-2].categoria,s=this.listaSolicitudItems[this.listaSolicitudItems.length-1].categoria;if(i!=s)for(var a=0;a<this.listaSolicitudItems.length;a++)this.listaSolicitudItems[a].categoria===s&&this.$store.commit("setEliminar",a)}},alert:function(t,e){this.$refs.alert.showAlert(t,e)},alertConfirmation:function(t,e){this.$refs.alertConfirmation.showAlert(t,e)},getDepartamento:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("spendingUnit?type=name&departamento=".concat(localStorage.getItem("depto")),{headers:{authorization:t.token}});case 2:for(i=e.sent.data,s=0;s<i.datos.length;s++)t.listaUnidadesDeGasto.push(i.datos[s].nombre_unidadgasto);case 4:case"end":return e.stop()}}),e)})))()},obtenerDescripcion:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("expenseItem?type=item&nombre=".concat(t.solicitud.nombre_item),{headers:{authorization:t.token}});case 2:i=e.sent.data,t.descripcionItem=i.datos[0].descripcion_item;case 4:case"end":return e.stop()}}),e)})))()}})},k=$,S=(i("df6c"),Object(g["a"])(k,o,n,!1,null,"47b631c9",null)),y=S.exports,q={components:{SolicitudDatos:y},name:"SolicitudPage"},O=q,j=(i("370e"),Object(g["a"])(O,s,a,!1,null,"f935eea4",null));e["default"]=j.exports},a1f6:function(t,e,i){"use strict";i("40c9")},b8d8:function(t,e,i){},c906:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("div",{staticClass:"alert",class:t.type},[i("span",{staticClass:"closebtn",on:{click:function(e){return t.hideAlert()}}},[t._v("×")]),t._v(" "+t._s(t.message)+" ")]):t._e()},a=[],o={name:"Alert",data:function(){return{show:!1,type:"",message:""}},methods:{showAlert:function(t,e){this.type=t,this.message=e,this.show=!0},hideAlert:function(){this.show=!1}}},n=o,r=(i("1414"),i("2877")),c=Object(r["a"])(n,s,a,!1,null,"dedf184a",null);e["a"]=c.exports},df6c:function(t,e,i){"use strict";i("b8d8")},fd78:function(t,e,i){}}]);
//# sourceMappingURL=chunk-abf1bc06.b858c4bc.js.map