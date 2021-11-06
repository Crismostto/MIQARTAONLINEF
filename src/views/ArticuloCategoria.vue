<template>
   <div class="about">
   <div class="bg-light"> 
    <div class="header" v-show="!verabmrubro">
        <h1>Categorias</h1>
        <button @click="abmrubros('agregar')" class="agregar btn btn-success">Agregar nueva categoria</button>
    </div>
        <articuloCategoriaABM 
       v-if="verabmrubro"
       :AbmAccion=tipoDeAccion
       :AbmId=llamadoId 
       @salirDeAbmRubros = mostrarAbmRubros($event)        
       ></articuloCategoriaABM>
    <hr>   
   </div>
       <table class="table table-striped table-bordered table-condensed" style="width:100%">           
           <thead class="text-center">
            <tr class="table-success">
                <th>Id</th>
                <th>nombre</th>
                <th>Accion</th>
            </tr>
           </thead>

           <tbody>
            <tr v-for="(rubros, index) in datos" :key="index">
                <td>{{rubros.id}}</td>
                <td>{{rubros.nombre}}</td>
                <td><button @click="abmrubros('editar', rubros.id)" class="editar btn btn-primary">Editar</button>               
                    <button @click="abmrubros('eliminar', rubros.id)" class="eliminar btn btn-danger">Eliminar</button>
                </td>
                    
            </tr>
           </tbody> 
       </table>          
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
            this.ObtenerDatos('articulos/categorias')
                .then(respuesta =>{
                    this.datos = respuesta
                    console.log('traer datos')
                })
        },
        mostrarAbmRubros(ver){
            this.verabmrubro = false
            if(ver == true){
                this.traerDatos()
                console.log ("mostrarAbmRubros")
            }
        }
    }
}
</script>

<style scoped>
.about{
  text-align: center;
}

.header{
  background-color: #201f1f;
  padding-bottom: 10px;
  border: 2px solid;
}

h1{
    color: white;
}
</style>