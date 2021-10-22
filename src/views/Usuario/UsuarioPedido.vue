<template>
  <div class="about">
    <div class="bg-light">
      <div v-show="!verPedidoCliente">
        <h1>Pedidos</h1>
        <button
          v-on:click="PedidoClienteABM('agregar')"
          class="agregar btn btn-success"
        >
          Agregar Pedido
        </button>
      </div>
      <pedidosAbm
        v-if="verPedidoCliente"
        :AbmAccion="tipoDeAccion"
        :AbmId="llamadoId"
        @salirDePedidoCliente="mostrarPedidoCliente($event)"
      />
      <hr />
    </div>
    <!-- <table
      class="table table-striped table-bordered table-condensed"
      style="width: 100%"
    >
      <thead class="text-center">
        <tr class="table-success">
          <th>Id</th>
          <th>mesa</th>
          <th>Articulo</th>
          <th>cantidad</th>
          <th>precio</th>
          <th>Accion</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(pedidos, index) in datos" :key="index">
          <td>{{ pedidos.id }}</td>
          <td>{{ pedidos.mesa_id }}</td>
          <td>{{ pedidos.articulo_id }}</td>
          <td>{{ pedidos.cantidad }}</td>
          <td>{{ pedidos.precio }}</td>
          <td>
            <button v-on:click="PedidoClienteABM('editar', pedidos.id)" class="editar btn btn-primary"> 
              Editar
            </button>
            <button v-on:click="PedidoClienteABM('eliminar', pedidos.id)" class="eliminar btn btn-danger">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import pedidosAbm from "@/components/pedidos/pedidosAbm.vue";
import Web from "@/components/Api/Api.vue";

export default {
  mixins: [Web],

  components: {
    pedidosAbm
  },

  data() {
    return {
      datos: [],
      verPedidoCliente: false,
      tipoDeAccion: "",
      llamadoId: 0,
    };
  },

  created() {
    this.traerDatos();
  },

  methods: {
    PedidoClienteABM(accion, id = 0) {
      this.tipoDeAccion = accion;
      this.llamadoId = id;
      this.verPedidoCliente = !this.verPedidoCliente;
      
    },

    traerDatos() {
      this.ObtenerDatos("pedidos").then((res) => {
        this.datos = res;
        console.log(res);
      });
    },

    mostrarPedidoCliente(ver) {
      this.verPedidoCliente = false;
      if (ver == true) {
        this.traerDatos();
        console.log("mostrarAbmPedidos");
      }
    },
  },
};
</script>

<style scoped>
.about {
  text-align: center;
}

/*.ListaCentrada{
  margin: 0
}*/
</style>