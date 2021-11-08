<template>
  <div class="mesas">
    <div class="header">
      <h1 id="h1">Historico de los pedidos</h1>
    </div>
    <hr />
    <div class="filtraje">
      <div class="filtro-fechas">
        <h6>Filtrar por fechas</h6>
        <hr />
        <input type="date" v-model="fechaUno" />
        <input type="date" v-model="fechaDos" />
        <hr />
        <button
          type="button"
          class="btn btn-outline-info btn-sm"
          @click="filtrarHistoricos"
        >
          Filtrar por fecha
        </button>
        <button
          type="button"
          class="btn btn-outline-info btn-sm"
          @click="todosLosHistoricos"
        >
          Mostrar todos
        </button>
      </div>

      <div class="filtro-mesa">
        <h6>Filtrar por numero de mesa</h6>
        <hr />
        <input type="numer" v-model="numMesa" />
        <hr />
        <button
          type="button"
          class="btn btn-outline-info btn-sm"
          @click="filtrarHistoricosPorMesa"
        >
          Filtrar por numero de mesa
        </button>
      </div>

      <div class="filtro-calculo">
        <h6>Calcular ingresos</h6>
        <!-- <hr /> -->
        <!-- <b-button
          v-b-modal.modal-1
          variant="outline-primary"
          class="btn  btn-sm"
          @click="MostrarIngresoHistorico"
          >Ingreso historico</b-button
        > -->
        <!-- <b-modal id="modal-1" title="Ingresos Historicos">
          <p class="my-4">El ingreso historico es de: ${{ingresoHistorico}}</p>
        </b-modal> -->

        <hr />
        <b-button
          v-b-modal.modal-2
          variant="outline-primary"
          class="btn  btn-sm"
          @click="MostrarIngresoFiltrado"
        >
          Ingresos por filtrado (Fecha o Mesa)
        </b-button>

         <b-modal id="modal-2" title="Ingresos generados a partir del filtrado">
          <p class="my-4">El ingreso es de: ${{ingresoFiltrado}}</p>
        </b-modal>

      </div>
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
        :items="fecha"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #cell(fecha_cierre)="row">
          {{ transformarfecha(row.item.fecha_cierre) }}
        </template>

        <template #cell(Accion)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Detalles
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2 hijo">
              <HistoricoPedidos
                v-on:tengo_total="ObtenerTotal"
                :id_Pedido="row.item.id"
              ></HistoricoPedidos>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Ocultar Detalles</b-button
            >
          </b-card>
        </template>

        <template #cell(Total)="row">
          <p>$ {{ row.item.totalMesa }}</p>
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "@/components/Api/Api.vue";
import HistoricoPedidos from "@/views/HistoricoPedidos.vue";
export default {
  mixins: [Api],
  components: { HistoricoPedidos },
  data() {
    return {
      fields: [
        {
          key: "id",
          label: "Id_Pedido",
          thStyle: { backgroundColor: "rgb(209,231,221)" },
        },
        {
          key: "mesa_id",
          label: "Mesa",
          thStyle: { backgroundColor: "rgb(209,231,221)" },
        },
        // { key: "fecha_apertura" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        {
          key: "fecha_cierre",
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

      fechaUno: 0,
      fecha: [],
      fechaDos: 0,
      currentPage: 1,
      perPage: 10,
      numMesa: 0,
      Total: 0,
      ingresoHistorico:0,
      ingresoFiltrado:0,
    };
  },
  created() {
    this.traerDatos();
  },
  computed: {
    rows() {
      return this.datos.length;
    },
  },
  methods: {
    traerDatos() {
      this.ObtenerDatos("historico/mesas").then((respuesta) => {
        this.datos = respuesta;
      });
    },

    filtrarHistoricos() {
      this.fecha = this.datos.filter(
        (n) => n.fecha_cierre > this.fechaUno && n.fecha_cierre < this.fechaDos
      );
    },
    todosLosHistoricos() {
      this.fecha = this.datos;
    },

    filtrarHistoricosPorMesa() {
      this.fecha = this.datos.filter((n) => n.mesa_id == this.numMesa);
    },

    transformarfecha(fecha) {
      fecha = new Date(fecha);
      var options = { year: "numeric", month: "long", day: "numeric" };
      fecha = fecha.toLocaleDateString("es-AR", options);

      return fecha;
    },

    ObtenerTotal(precioTotal) {
      this.Total = precioTotal;
    },

    MostrarIngresoHistorico() {
      let ingresoHistorico = 0;
      this.datos.forEach((e) => {
        ingresoHistorico = ingresoHistorico + e.totalMesa;
        this.ingresoHistorico = ingresoHistorico;
      });
    },

    MostrarIngresoFiltrado(){
      let ingresoFiltrado = 0;
      if (this.fecha.length != 0){
        this.fecha.forEach((e) => {
          ingresoFiltrado = ingresoFiltrado + e.totalMesa;
          this.ingresoFiltrado = ingresoFiltrado;
        });
      }else{ this.ingresoFiltrado = 0}
    } 
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

#h1 {
  padding-top: 20px;
  color: white;
}

.filtraje {
  display: flex;
  justify-content: space-around;
}
</style>
