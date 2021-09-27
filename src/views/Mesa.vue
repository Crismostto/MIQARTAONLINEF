<template>
  <div class="mesas">
      <div class=" header bg-light">
       <h1 id="h1">Estado de las mesas</h1>
      </div>
      <hr>
      <table class="table table-striped table-bordered table-condensed" style="width:100%">           
           <thead class="text-center">
            <tr class="table-success">
                <th>Mesa</th>
                <th>Estado</th>
                <th>Fecha Apertura</th>
            </tr>
           </thead>

           <tbody>
            <tr v-for="(mesas, index) in datos" :key="index">
                <td>{{mesas.id}}</td>
                <td>{{mesas.estado}}</td>
                <td>{{mesas.fechaApertura}}</td>
              <!--  <td><button @click="abmmesas('editar', mesas.id)" class="editar btn btn-primary">Editar</button>               
                    <button @click="abmmesas('eliminar', mesas.id)" class="eliminar btn btn-danger">Eliminar</button>
                </td>
              -->  
              <mesaPedido v-show="false"></mesaPedido>      
            </tr>
           </tbody> 
       </table>    
  </div>
</template>

<script>

// @ is an alias to /src
import Web from "@/components/Api/Web.vue";
import mesaPedido from "@/views/MesaPedido.vue"
export default {
  mixins: [Web],
  components:{mesaPedido},
  data() {
    return {
      datos: [],
    };
  },
  created() {
    this.traerDatos();
  },
  methods: {
    traerDatos() {
      this.ObtenerDatos("mesas").then((respuesta) => {
        this.datos = respuesta;
      });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mesas{
  text-align: center;
}

.header{
 height: 95px;
}

#h1{
  padding-top: 20px;
}
</style>
