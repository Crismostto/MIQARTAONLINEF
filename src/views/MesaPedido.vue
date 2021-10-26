<template>
  <div>
    <table>
      <tr>
        
        <th>Articulo</th>
        <th>Cantidad</th>
        <th>Total</th>
      </tr>
      <tr v-for="(mesaPedido, index) in datos" :key="index">
        

          <td>{{mesaPedido.nombre }}</td>
          <td>{{mesaPedido.cantidad }}</td>
          <td>{{mesaPedido.Total }}</td>
      
      </tr>
    </table>
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
};
</script>
