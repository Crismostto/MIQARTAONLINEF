<template>
  <div>
    <table>
      <tr>
        <th>pedido numero</th>
        <th>Cantidad</th>
        <th>precio</th>
        <th>articulo</th>
      </tr>
      <tr v-for="(mesaPedido, index) in datos" :key="index">
        
          <td>{{mesaPedido.id}}</td>
          <td>{{ mesaPedido.nombre }}</td>
          <td>{{ mesaPedido.cantidad }}</td>
          <td>{{ mesaPedido.precio }}</td>
      
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
      datos: [],
    };
  },
  created() {
    this.traerDatos();
  },
  methods: {
    traerDatos() {
      this.obtenerDatos("pedidos").then((respuesta) => {
        this.datos = respuesta;
      });
    },
  },
};
</script>