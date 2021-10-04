<template>
  <div>
    <table class="table-success">
      <tr>
        
        <th>Articulo</th>
        <th>Cantidad</th>
        <th>Precio</th>
      </tr>
      <tr v-for="(mesaPedido, index) in datos" :key="index">
        

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
      this.traerDatosPorId("pedidos/lista", this.id_Mesa).then((respuesta) => {
        this.datos = respuesta;
      });
    },
  },
};
</script>
