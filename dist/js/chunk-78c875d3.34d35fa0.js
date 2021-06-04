(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78c875d3"],{2532:function(e,t,a){"use strict";var r=a("23e7"),i=a("5a34"),n=a("1d80"),s=a("ab13");r({target:"String",proto:!0,forced:!s("includes")},{includes:function(e){return!!~String(n(this)).indexOf(i(e),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(e,t,a){var r=a("861d"),i=a("c6b6"),n=a("b622"),s=n("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==i(e))}},"5a34":function(e,t,a){var r=a("44e7");e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},"6d61":function(e,t,a){"use strict";a("d469")},7197:function(e,t,a){},"7f78":function(e,t,a){"use strict";a("9139")},"90d9":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return this.permisoItemDeGasto?a("div",{staticClass:"register"},[a("div",{staticClass:"register_container"},[a("RegistroItem",{staticClass:"register_item"})],1)]):e._e()},i=[],n=a("5530"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"reg_item"},[a("h2",{staticClass:"item_title"},[e._v("Registrar Item de Gasto")]),e._m(0),a("form",{staticClass:"form_itemreg",attrs:{autocomplete:"off"},on:{submit:function(t){return t.preventDefault(),e.submitForm(t)}}},[a("div",{staticClass:"form_section"},[a("div",{staticClass:"form_name"},[e._v("Item:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.item.nombre_itemgasto,expression:"item.nombre_itemgasto"}],class:e.$v.item.nombre_itemgasto.$invalid?"form_check-input-error":"form_check-input",attrs:{id:"nombreItem",type:"text",maxlength:"50",required:"",placeholder:"Ingrese el nombre aquí"},domProps:{value:e.item.nombre_itemgasto},on:{input:function(t){t.target.composing||e.$set(e.item,"nombre_itemgasto",t.target.value)}}}),e.$v.item.nombre_itemgasto.required?e._e():a("div",{staticClass:"form_check-error"},[e._v(" Campo obligatorio. ")])]),a("div",{staticClass:"form_section"},[a("div",{staticClass:"form_name"},[e._v("Categoría:")]),a("div",{staticClass:"form-categ"},[a("div",{staticClass:"form-categ-gen",on:{click:e.getSpeCategories}},[a("lista-desplegable",{class:e.$v.item.categoria_general.$invalid?"form_check-input-error":"form_check-input",attrs:{nombreLista:"categoriaGeneral",lista:e.listaCatGen,placeholder:"Seleccione una categoría general",required:""},model:{value:e.item.categoria_general,callback:function(t){e.$set(e.item,"categoria_general",t)},expression:"item.categoria_general"}}),e.$v.item.categoria_general.required?e._e():a("div",{staticClass:"form_check-error"},[e._v(" Campo obligatorio. ")])],1),a("div",{staticClass:"form-categ-esp"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.item.categoria_especifica,expression:"item.categoria_especifica"}],class:e.$v.item.categoria_especifica.$invalid?"form_check-input-error":"form_check-input",attrs:{name:"categoriaItem",id:"categoriaItem",list:"categorias",maxlength:"50",required:"",placeholder:"Seleccione o ingrese una categoría específica"},domProps:{value:e.item.categoria_especifica},on:{input:function(t){t.target.composing||e.$set(e.item,"categoria_especifica",t.target.value)}}}),e.$v.item.categoria_especifica.required?e._e():a("div",{staticClass:"form_check-error"},[e._v(" Campo obligatorio. ")]),a("datalist",{attrs:{id:"categorias"}},e._l(e.listaCategorias,(function(t,r){return a("option",{key:r,domProps:{value:t}},[e._v(e._s(t))])})),0)])])]),a("div",{staticClass:"form_section"},[a("div",{staticClass:"form_name"},[e._v("Descripción:")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.item.descripcion_item,expression:"item.descripcion_item"}],class:e.$v.item.descripcion_item.$invalid?"form_check-input-error":"form_check-input",attrs:{name:"descripcionItem",cols:"50",rows:"10",maxlength:"1000",required:"",placeholder:"Ingrese una descripción del ítem"},domProps:{value:e.item.descripcion_item},on:{input:function(t){t.target.composing||e.$set(e.item,"descripcion_item",t.target.value)}}}),e._v(" "),e.$v.item.descripcion_item.required?e._e():a("div",{staticClass:"form_check-error"},[e._v(" Campo obligatorio. ")])]),a("div",{staticClass:"form_section"},[a("div",{staticClass:"form_name"},[e._v("Justificación:")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.item.justificacion,expression:"item.justificacion"}],class:e.$v.item.justificacion.$invalid?"form_check-input-error":"form_check-input",attrs:{name:"justificacionItem",cols:"50",rows:"10",maxlength:"1000",required:"",placeholder:"Ingrese la justificación del ítem"},domProps:{value:e.item.justificacion},on:{input:function(t){t.target.composing||e.$set(e.item,"justificacion",t.target.value)}}}),e._v(" "),e.$v.item.justificacion.required?e._e():a("div",{staticClass:"form_check-error"},[e._v(" Campo obligatorio. ")])]),a("div",{staticClass:"item-form-button"},[a("button",{staticClass:"form_button",class:e.$v.item.$invalid?"button-disabled":"",attrs:{disabled:e.$v.item.$invalid}},[e._v(" Crear ")])])]),a("Alert",{ref:"alert"})],1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",[a("div",{staticClass:"form_desc"},[e._v("Ingrese los datos de un nuevo item de gasto")])])}],c=a("b85c"),m=a("1da1"),u=(a("caad"),a("2532"),a("96cf"),a("b5ae")),l=a("98ab"),d=a("2f62"),g=a("961c"),p={name:"RegistroItem",computed:Object(n["a"])({},Object(d["c"])(["token"])),components:{Alert:l["a"],ListaDesplegable:g["a"]},data:function(){return{disabled:!1,item:{nombre_itemgasto:null,categoria_general:null,categoria_especifica:null,descripcion_item:"",justificacion:""},listaCategorias:[],listaUnidades:[],listaCatGen:[],listaCodGen:[]}},validations:{item:{nombre_itemgasto:{required:u["required"],maxLength:Object(u["maxLength"])(50)},categoria_especifica:{required:u["required"],maxLength:Object(u["maxLength"])(50)},categoria_general:{required:u["required"]},descripcion_item:{required:u["required"],maxLength:Object(u["maxLength"])(1e3)},justificacion:{required:u["required"],maxLength:Object(u["maxLength"])(1e3)}}},methods:{getGenCategories:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("generalCategory",{headers:{authorization:e.token}});case 2:a=t.sent.data,r=Object(c["a"])(a);try{for(r.s();!(i=r.n()).done;)n=i.value,e.listaCatGen.push(n.nombre_categoriageneral),e.listaCodGen.push(n.cod_categoriageneral)}catch(s){r.e(s)}finally{r.f()}e.getSpeCategories();case 6:case"end":return t.stop()}}),t)})))()},getSpeCategories:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.listaCategorias=[],t.next=3,e.$http.get("specificCategory",{headers:{authorization:e.token}});case 3:a=t.sent.data,r=Object(c["a"])(a);try{for(r.s();!(i=r.n()).done;)n=i.value,n.cod_categoriageneral==e.listaCodGen[e.listaCatGen.indexOf(e.item.categoria_general)]&&e.listaCategorias.push(n.nombre_categoriaespecifica)}catch(s){r.e(s)}finally{r.f()}case 6:case"end":return t.stop()}}),t)})))()},submitForm:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,e.$v.item.$invalid){t.next=12;break}return t.next=4,e.manageCat();case 4:return t.next=6,e.sendItemData();case 6:return t.next=8,e.sendItemUnitData();case 8:e.alert("success","Item creado exitosamente"),window.setInterval(window.location.reload(),1e4),t.next=13;break;case 12:e.alert("warning","Rellene todos los datos correctamente");case 13:t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](0),e.alert("warning",t.t0);case 18:case"end":return t.stop()}}),t,null,[[0,15]])})))()},sendItemData:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$http.post("expenseItem",{nombre_itemgasto:e.item.nombre_itemgasto,nombre_categoriaespecifica:e.item.categoria_especifica,descripcion_item:e.item.descripcion_item,justificacion:e.item.justificacion},{headers:{authorization:e.token}});case 3:t.next=8;break;case 5:throw t.prev=5,t.t0=t["catch"](0),new Error("Este ítem ya está registrado");case 8:case"end":return t.stop()}}),t,null,[[0,5]])})))()},getSpendingUnits:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("spendingUnit?type=name&departamento=".concat(localStorage.getItem("depto")),{headers:{authorization:e.token}});case 2:a=t.sent.data.datos,r=Object(c["a"])(a);try{for(r.s();!(i=r.n()).done;)n=i.value,e.listaUnidades.push(n.nombre_unidadgasto)}catch(s){r.e(s)}finally{r.f()}case 5:case"end":return t.stop()}}),t)})))()},sendItemUnitData:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:t.prev=0,a=Object(c["a"])(e.listaUnidades),t.prev=2,a.s();case 4:if((r=a.n()).done){t.next=10;break}return i=r.value,t.next=8,e.$http.post("itemsPerUnit",{nombre_unidadgasto:i,nombre_itemgasto:e.item.nombre_itemgasto,activo_item:!0},{headers:{authorization:e.token}});case 8:t.next=4;break;case 10:t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](2),a.e(t.t0);case 15:return t.prev=15,a.f(),t.finish(15);case 18:t.next=23;break;case 20:throw t.prev=20,t.t1=t["catch"](0),new Error("Unidad inválida");case 23:case"end":return t.stop()}}),t,null,[[0,20],[2,12,15,18]])})))()},manageCat:function(){var e=this;return Object(m["a"])(regeneratorRuntime.mark((function t(){var a,r,i,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$http.get("specificCategory",{headers:{authorization:e.token}});case 3:a=t.sent.data,r=[],i=Object(c["a"])(a);try{for(i.s();!(n=i.n()).done;)s=n.value,r.push(s.nombre_categoriaespecifica)}catch(o){i.e(o)}finally{i.f()}if(r.includes(e.item.categoria_especifica)){t.next=13;break}return t.next=10,e.$http.post("specificCategory",{cod_categoriageneral:e.listaCodGen[e.listaCatGen.indexOf(e.item.categoria_general)],nombre_categoriaespecifica:e.item.categoria_especifica},{headers:{authorization:e.token}});case 10:if("Servicios"!=e.item.categoria_general){t.next=13;break}return t.next=13,e.$http.post("market",{nombre_rubro:e.item.categoria_especifica},{headers:{authorization:e.token}});case 13:t.next=18;break;case 15:throw t.prev=15,t.t0=t["catch"](0),new Error("Categoría Inválida");case 18:case"end":return t.stop()}}),t,null,[[0,15]])})))()},alert:function(e,t){this.$refs.alert.showAlert(e,t)}},mounted:function(){this.getGenCategories(),this.getSpendingUnits();var e=[32,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,193,201,205,209,211,218,225,233,237,241,243,250],t=document.getElementById("nombreItem");t.addEventListener("keypress",(function(t){var a=t.charCode;if(0!=a){var r=e.includes(a);r||t.preventDefault()}}),!1);var a=[32,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,193,201,205,209,211,218,225,233,237,241,243,250],r=document.getElementById("categoriaItem");r.addEventListener("keypress",(function(e){var t=e.charCode;if(0!=t){var r=a.includes(t);r||e.preventDefault()}}),!1)}},f=p,v=(a("7f78"),a("2877")),_=Object(v["a"])(f,s,o,!1,null,"633c87a2",null),h=_.exports,b={name:"RegistroItemGasto",components:{RegistroItem:h},computed:Object(n["a"])({},Object(d["c"])(["permisoItemDeGasto"])),mounted:function(){this.permisoItemDeGasto||this.$router.push("/")}},C=b,x=(a("eefd"),Object(v["a"])(C,r,i,!1,null,"0e46e9de",null));t["default"]=x.exports},9139:function(e,t,a){},"961c":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"list-container"},[a("select",{staticClass:"container__list",class:null===e.value?"container-list-placeholder":"",attrs:{required:""},on:{input:function(t){return e.$emit("input",t.target.value)}}},[a("option",{staticClass:"container__list__placeholder",attrs:{selected:"true",disabled:"disabled"}},[e._v(e._s(e.placeholder))]),e._l(e.lista,(function(t,r){return a("option",{key:r,staticClass:"container__list__option",domProps:{value:t}},[e._v(" "+e._s(t))])}))],2)])},i=[],n={name:"ListaDesplegable",data:function(){return{}},props:{value:String,nombreLista:String,nombre:String,lista:Array,placeholder:String}},s=n,o=(a("6d61"),a("2877")),c=Object(o["a"])(s,r,i,!1,null,"4d72f0cc",null);t["a"]=c.exports},ab13:function(e,t,a){var r=a("b622"),i=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(a){try{return t[i]=!1,"/./"[e](t)}catch(r){}}return!1}},d469:function(e,t,a){},eefd:function(e,t,a){"use strict";a("7197")}}]);
//# sourceMappingURL=chunk-78c875d3.34d35fa0.js.map