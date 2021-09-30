<template>
  <div>
    <table>
      <tr>
        <th>pedido numero</th>
        <th>articulo</th>
        <th>Cantidad</th>
        <th>precio</th>
      </tr>
      <tr v-for="(mesaPedido, index) in datos" :key="index">
        
          <td>{{mesaPedido.id}}</td>
          <td>{{mesaPedido.nombre }}</td>
          <td>{{mesaPedido.cantidad }}</td>
          <td>{{mesaPedido.precio }}</td>
      
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/components/Api/Api.vue";

export default {
  mixins: [Api],
  data() {
    return {
      datos: [
        {id:1,
        nombre:"Cristian",
        cantidad: 10,
        precio: 1500,
        }],
    };
  },
  created() {
    this.traerDatos();
  },
  methods: {
    traerDatos() {
      this.ObtenerDatos("pedidos").then((respuesta) => {
        this.datos = respuesta;
      });
    },
  },
};
</script>
