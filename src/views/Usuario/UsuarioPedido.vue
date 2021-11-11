
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
              <em>Mesa {{ mesa_id }}</em>
            </template>
            <b-dropdown-item href="http://localhost:8080/"
              >Desconectar</b-dropdown-item
            >
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
    <b-container fluid="sm Tables">
      <b-table striped hover :fields="fields" :items="this.datos"></b-table>
      <hr />
      <div v-if="mostrarTotal" class="sumaTotal">
        <a href="http://localhost:8080">
          <button
            v-if="calcularPrecioTotal == 0 || salir == true"
            class="btn btn-outline-danger"
          >
            Salir
          </button>
        </a>
        <button
          v-if="calcularPrecioTotal != 0 && salir == false"
          @click="pedirCuenta"
          class="btn btn-outline-danger"
        >
          Pedir la cuenta
        </button>
        <p class="Total">Total $ {{ calcularPrecioTotal }}</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import pedidosAbm from "@/components/pedidos/pedidosAbm.vue";
import User from "@/components/Api/User.vue";
export default {
  mixins: [User],
  components: {
    pedidosAbm,
  },
  data() {
    return {
      fields: [
        { key: "nombre", thStyle: { backgroundColor: "rgb(209,231,221)" } },
        { key: "cantidad", thStyle: { backgroundColor: "rgb(209,231,221)" } },
        {
          key: "precio",
          label: "Precio",
          thStyle: { backgroundColor: "rgb(209,231,221)" },
        },
        {
          key: "subTotal",
          label: "Sub-Total",
          thStyle: { backgroundColor: "rgb(209,231,221)" },
        },
      ],
      datos: [],
      verPedidoCliente: false,
      tipoDeAccion: "",
      llamadoId: 0,
      mesa_id: this.$route.params.id,
      precioTotal: 0,
      mostrarTotal: true,
      salir: false,
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

    pedirCuenta() {
      const Swal = require("sweetalert2");
      console.log(this.mesa_id);
      Swal.fire({
        title: "Estas seguro de pedir la cuenta?",
        text: "Esta accion finaliza el pedido por completo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, pedir la cuenta!",
      }).then((result) => {
        if (result.isConfirmed) {
          let habilitar = 3;
          this.cambiarEstadoMesa("mesas", this.mesa_id, habilitar).then(
            (respuesta) => {
              console.log(respuesta);
              if (respuesta.cod == 200) {
                Swal.fire({
                  title: "La cuenta ha sido enviada!",
                  text: "Espere hasta que el mozo se acerque a cobrarle",
                  icon: "success",
                  showConfirmButton: false,
                });
                this.salir = true;
              }
            }
          );
        }
      });
    },
  },

  computed: {
    calcularPrecioTotal: function () {
      let precioTotal = 0;
      //Foreach al array de datos y se calcula el total dentro del front.
      Array.from(this.datos).forEach(
        (dato) => (precioTotal = precioTotal + dato.subTotal)
      );

      return precioTotal;
    },
  },
};
</script>

<style scoped>
.about {
  text-align: center;
}

.Tables {
  display: flex;
  flex-direction: column;
}

.sumaTotal {
  flex-direction: column-reverse;
}
.Total {
  float: right;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #dc3545;
  margin-right: 5em;
  text-shadow: grey 1px 1px 1px;
}

/*.ListaCentrada{
  margin: 0
}*/
</style>