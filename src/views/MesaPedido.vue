<template>
  <div>
    <table class="table table-striped">
      <thead>
      <tr>
        
        <th>Articulo</th>
        <th>Cantidad</th>
        <th>Total</th>
      </tr>
      </thead>
      <tr v-for="(mesaPedido, index) in datos" :key="index">
        

          <td>{{mesaPedido.nombre }}</td>
          <td>{{mesaPedido.cantidad }}</td>
          <td>{{mesaPedido.subTotal }}</td>
      
      </tr>
    </table>
   <div>
     <p>Total $ {{calcularPrecioTotal}} </p>
   </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/components/Api/Api.vue";

export default {
  mixins: [Api],
  props:["id_Mesa"],
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
      this.traerDatosPorId("pedidos/mesa", this.id_Mesa).then((respuesta) => {
        this.datos = respuesta;
      });
    },
  },

   computed:
  {
    calcularPrecioTotal: function(){    
      let precioTotal=0
      //Foreach al array de datos y se calcula el total dentro del front.
      Array.from(this.datos).forEach( dato=>
        precioTotal=  precioTotal + dato.subTotal
      )
      
      return precioTotal

    }
  }
};
</script>
