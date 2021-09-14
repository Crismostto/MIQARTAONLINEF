<template>
   <div>
       
       <h1>rubros</h1>
       <button @click="abmrubros('agregar')" class="agregar">Agregar nuevo Rubro</button>
        <articuloCategoriaABM 
       v-if="verabmrubro"
       :AbmAccion=tipoDeAccion
       :AbmId=llamadoId 
       @salirDeAbmRubros = mostrarAbmRubros($event)        
       ></articuloCategoriaABM>
       
       <table>
           
           <tr>
               <th>Id</th>
               <th>tipo</th>
               <th>nombre</th>
               <th>Accion</th>
           </tr>
           <tr v-for="(rubros, index) in datos" :key="index">
               <td>{{rubros.id}}</td>
               <td>{{rubros.tipo}}</td>
               <td>{{rubros.nombre}}</td>
               <td><button @click="abmrubros('editar', rubros.id)" class="editar">Editar</button>               
                <button @click="abmrubros('eliminar', rubros.id)" class="eliminar">Eliminar</button></td>
                
                           </tr>
       </table>
               
       
       <!-- <ul v-for="(rubros, index) in datos" :key="index">
           <li>
               {{rubros.nombre}}
                <button @click="abmrubros('editar', rubros.id)">Editar</button>               
                <button @click="abmrubros('eliminar', rubros.id)">Eliminar</button>
                <button @click="abmrubros('consultar', rubros.id)">Consultar</button>
           </li>
           
       </ul> -->
    </div> 
</template>

<script>
import Web from '@/components/Api/Web.vue';
import articuloCategoriaABM from '@/components/ArticuloCategoria/articuloCategoriaABM.vue';

export default {
  mixins: [Web],
  components: { articuloCategoriaABM },
    data(){
        return {
         datos:[],
         verabmrubro:false,
         tipoDeAccion: '',
         llamadoId:0,   
         
        }
    },

    created(){
        this.traerDatos()
    }
    ,

    methods:{
        abmrubros(accion, id=0){
            this.tipoDeAccion= accion;
            this.llamadoId=id
            this.verabmrubro = !this.verabmrubro
        },
        traerDatos(){
            this.obtenerDatos('articulos/categorias')
                .then(respuesta =>{
                    this.datos = respuesta
                })
        },
        mostrarAbmRubros(ver){
            this.verabmrubro = false
            if(ver == true){
                this.traerDatos()
            }
        }
    }
}
</script>