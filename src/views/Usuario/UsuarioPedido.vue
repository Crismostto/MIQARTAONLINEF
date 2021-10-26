<template>  
  <div class="about">
  <!-- NAV-BAR SECCION -->
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">MiQartaOnline</b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Mesa {{mesa_id}}</em>
          </template>
          <b-dropdown-item href="http://localhost:8080/">Desconectar</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <!-- Seccion donde invocamos los pedidos -->
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
        :AbmMesa="mesa_id"
        @salirDePedidoCliente="mostrarPedidoCliente($event)"
      />
      <hr />
    </div>
    
    <!-- Tabla mostrando los pedidos enviados -->
     <b-table striped hover :fields="fields" :items="this.datos"></b-table>
  </div>
</template>

<script>
import pedidosAbm from "@/components/pedidos/pedidosAbm.vue";
import User from "@/components/Api/User.vue";

export default {
  mixins: [User],

  components: {
    pedidosAbm
  },

  data() {
    return {
       fields: [
        { key: "nombre" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "cantidad" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "precio", label: "Precio" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "Total", label: "Total" , thStyle: { backgroundColor: 'rgb(209,231,221)'}}
      ],

      datos: [],
      verPedidoCliente: false,
      tipoDeAccion: "",
      llamadoId: 0,
      mesa_id: this.$route.params.id
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
      this.traerDatosPorIdApi("pedidos/mesa", this.mesa_id).then((res) => {
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