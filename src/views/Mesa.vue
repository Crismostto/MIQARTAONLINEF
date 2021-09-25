<template>
  <div class="mesas">
     
       <h1>Bienvenido a la seccion de mesas</h1>
      
      <table class="table table-striped table-bordered table-condensed" style="width:100%">           
           <thead class="text-center">
            <tr class="table-success">
                <th>Mesa</th>
                <th>Estado</th>
                <th>Fecha Apertura</th>
                <th>Accion</th>
            </tr>
           </thead>

           <tbody>
            <tr v-for="(mesas, index) in datos" :key="index">
                <td>{{mesas.id}}</td>
                <td>{{mesas.estado}}</td>
                <td>{{mesas.fechaApertura}}</td>
                <td><button @click="abmmesas('editar', mesas.id)" class="editar btn btn-primary">Editar</button>               
                    <button @click="abmmesas('eliminar', mesas.id)" class="eliminar btn btn-danger">Eliminar</button>
                </td>
                    
            </tr>
           </tbody> 
       </table>     
  </div>
</template>

<script>
import Web from '@/components/Api/Web.vue';

export default {
  mixins:[Web],
  name: 'MesaINFO',
  
  data(){
    return{
    datos:[]
    }
  },

  created(){
      this.traerDatos()
  },

  methods:{
    traerDatos(){
       this.ObtenerDatos('mesas')
                .then(respuesta =>{
                    this.datos = respuesta
                    console.log('traer datos')
                })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mesas{
  text-align: center;
}
</style>
