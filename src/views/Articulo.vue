<template>
  <div class="about">
    <ArticulosABM v-if="verabmarticulos"/>
    <span>Ingresar</span>
       
       <button v-on:click="ABMARTICULOS('agregar',articulos.id)">Agregar</button>
       <ul v-for="(articulos, index) in datos" :key="index">
           <li>
               {{articulos.nombre}}
           </li>
           <button v-on:click="ABMARTICULOS('editar',articulos.id)">Editar</button>
           <button v-on:click="ABMARTICULOS('eliminar',articulos.id)">Eliminar</button>
       </ul>
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
        }
  },

  created(){
    this.ObtenerDatos()
  },
  
  methods: {
        ABMARTICULOS(accion){
          if (accion=='editar'){
             this.verabmrubro= true;
          }
         
        },

        ObtenerDatos(){
        this.funcObtenerDatos('articulos')
        .then (res => {
          this.datos = res
          console.log (res);
        })
      }

  },

}
</script>

<style scoped>
.about{
  text-align: center;
  
}
</style>