<template>
  <div class="mesas">
    <div class="header">
      <h1 id="h1">Estado de las mesas</h1>
      <button @click="refrescarMesas" class="btn btn-primary">
        Refrescar mesas
      </button>
    </div>
    <hr />
    <div class="body">
      <!-- Prueba de tabla en Vue -->
      <b-table
        responsive
        bordered
        fixed
        striped
        hover
        :items="datos"
        :fields="fields"
        :tbody-tr-class="rowClass"
      >
        <template #cell(Accion)="row">
          <b-button
            v-if="row.item.estado == 2 || row.item.estado == 3"
            size="sm"
            @click="row.toggleDetails"
            class="mr-2"
          >
            {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Detalles
          </b-button>

          <b-button
            v-if="row.item.estado == 2 || row.item.estado == 3"
            size="sm"
            variant="success"
            @click="habilitarMesa(row.item.id)"
            >Habilitar mesa</b-button
          >
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2 hijo">
              <mesaPedido
                v-on:tengo_total="ObtenerTotal"
                :id_Mesa="row.item.id"
              ></mesaPedido>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Ocultar Detalles</b-button
            >
            <b-button
              v-if="Total !== 0"
              size="sm"
              variant="danger"
              @click="cerrarPedido(row.item.id)"
              >Cerrar pedido</b-button
            >
          </b-card>
        </template>

        <template #cell(Total)="row">
          <p v-if="row.item.estado == 2 || row.item.estado == 3">
            $ {{ row.item.totalMesa }}
          </p>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Web from "@/components/Api/Web.vue";
import mesaPedido from "@/views/MesaPedido.vue";
export default {
  mixins: [Web],
  components: { mesaPedido },
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "Mesa",
          thStyle: { backgroundColor: "rgb(209,231,221)" },
        },
        {
          key: "fechaApertura",
          thStyle: { backgroundColor: "rgb(209,231,221)" },
        },
        {
          key: "Accion",
          label: "Accion",
          thStyle: { backgroundColor: "rgb(209,231,221)" },
        },
        {
          key: "Total",
          label: "Total gastado",
          thStyle: { backgroundColor: "rgb(209,231,221)" },
        },
      ],
      datos: [],
      estadoLibre: false,
      Total: 0,
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

    //Chequea el estado de las mesas y cambia el estilo de la fila segun el estado.
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.estado === 1) return "table-info";
      if (item.estado === 2) return "table-danger";
      if (item.estado === 3) return "table-warning";
    },

    //Metodo para cerrar los pedidos de las mesas.
    cerrarPedido(id_Mesa) {
      const Swal = require("sweetalert2");
      console.log(id_Mesa);
      Swal.fire({
        title: "Estas seguro de cerrar el pedido?",
        text: "No hay vuelta atras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar pedido!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.cierrePedido("cierre", id_Mesa).then((respuesta) => {
            console.log(respuesta);
            if (respuesta.cod == 200) {
              Swal.fire({
                title: "Se cerro el pedido correctamente",
                icon: "success",
              });
              this.traerDatos();
            }
          });
        }
      });

      this.traerDatos();
    },

    habilitarMesa(id_Mesa) {
      const Swal = require("sweetalert2");
      console.log(id_Mesa);
      Swal.fire({
        title: "Estas seguro de habilitar una mesa ocupada?",
        text: "ASEGURATE DE QUE NO ESTE OCUPADA EN ESTOS MOMENTOS (EL PEDIDO QUEDA GUARDADO)!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, habilitar mesa!",
      }).then((result) => {
        if (result.isConfirmed) {
          let habilitar = 0;
          this.cambiarEstadoMesa("mesas", id_Mesa, habilitar).then(
            (respuesta) => {
              console.log(respuesta);
              if (respuesta.cod == 200) {
                Swal.fire(
                  "Se habilito la mesa!",
                  "Ya se encuentra disponible nuevamente.",
                  "success"
                );
              }
            }
          );
          this.traerDatos();
        }
      });
    },

    ObtenerTotal(precioTotal) {
      this.Total = precioTotal;
    },

    refrescarMesas() {
      this.traerDatos();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hijo {
  display: flex;
  text-align: center;
}
.header {
  text-align: center;
  background-color: #201f1f;
  padding-bottom: 20px;
  border: 2px solid;
}

.header button {
  color: white;
}

#h1 {
  padding-top: 20px;
  color: white;
}
</style>
