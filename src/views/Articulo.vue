<template>
  <div class="about">
       
    <span>Ingresar Articulo</span>
    <button v-on:click="ABMARTICULOS('agregar')">Agregar</button>
    <ArticulosABM 
    v-if="verabmarticulos"
    :AbmAccion=tipoDeAccion
    :AbmId=llamadoId 
    @salirDeAbmArticulos = mostrarAbmArticulos($event)
    />
    
      <table>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripcion</th>
          <th>Categoria</th>
          <th>Accion</th>
        </tr>
        <tr v-for="(articulos, index) in datos" :key="index">
            <td>{{articulos.id}}</td>
            <td>{{articulos.nombre}}</td>
            <td>{{articulos.precio}}</td>
            <td>{{articulos.descripcion}}</td>
            <td>{{articulos.ArticuloCategorias_id}}</td>
            <td>
            <button v-on:click="ABMARTICULOS('editar',articulos.id)">Editar</button>
            <button v-on:click="ABMARTICULOS('eliminar',articulos.id)">Eliminar</button>
            </td>        
        </tr>
      </table>

  </div>


</template>

<script>

import ArticulosABM from '@/components/Articulo/ArticulosABM.vue'
import Web from  '@/components/Api/Web.vue'

export default {

  mixins:[Web],
  
  components: {
    ArticulosABM,
  },

  data(){
        return {
         datos:[],
         verabmarticulos:false,
         tipoDeAccion: '',
         llamadoId:0, 
        }
  },

  created(){
    this.traerDatos()
  },
  
  methods: {
        ABMARTICULOS(accion, id=0){
            this.tipoDeAccion= accion
            this.llamadoId= id
            this.verabmarticulos= !this.verabmarticulos;
        },

        traerDatos(){
         this.ObtenerDatos('articulos')
          .then (res => {
            this.datos = res
            console.log (res);
          })
        },
       
        mostrarAbmArticulos(ver){
          this.verabmarticulos = false
          if(ver == true){
              this.traerDatos()
              console.log ("mostrarAbmArticulos")
          }
        }
        

  }

}
</script>

<style scoped>
.about{
 text-align: center;
}

/*.ListaCentrada{
  margin: 0
}*/
</style>