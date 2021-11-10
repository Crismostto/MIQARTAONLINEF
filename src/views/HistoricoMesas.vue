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
        <hr />
        <b-button
          v-b-modal.modal-2
          variant="primary"
          class="btn btn-sm"
          
        >
          Ingresos por filtrado (Fecha o Mesa)
        </b-button>

        <b-modal id="modal-2" title="Ingresos generados a partir del filtrado">
          <p class="my-4">El ingreso es de: ${{ ingresoFiltrado }}</p>
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
      <nav>
        <ul v-if="filtrof==false" class="pagination">
          <li class="page-item" v-if="paginate.current_page > 1">
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(paginate.current_page - 1)"
            >
              <span>Atras</span>
            </a>
          </li>

          <li
            class="page-item"
            v-for="page in pagesNumber"
            :key="page"
            v-bind:class="[page == isActived ? 'active' : '']"
          >
            <a class="page-link" @click.prevent="changePage(page)">
              {{ page }}
            </a>
          </li>

          <li
            class="page-item"
            v-if="paginate.current_page < paginate.last_page"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="changePage(paginate.current_page + 1)"
            >
              <span>Siguiente</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Paginador desde el front para fechas -->
    
    <b-pagination v-if="filtrof==true"
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
      fecha: [],

      fechaUno: 0,
      fechaDos: 0,

      paginate: {
        total: 0,
        current_page: 0,
        per_page: 0,
        last_page: 0,
        from: 0,
        to: 0,
      },

      numMesa: 0,
      Total: 0,
      ingresoFiltrado: 0,

      filtrom:false,
      sinfiltro:false,
      filtrof:false,

      perPage: 5,
      currentPage: 1,
    };
  },

  created() {
    this.traerDatos(1);
  },

  methods: {
    //-------------------------------------- Seccion de traer datos y paginacion -------------------------//
    traerDatos(page) {
      console.log("historico/mesas?=page" + page);
      this.ObtenerDatos("historico/mesas?page=" + page).then((respuesta) => {
        this.datos = respuesta;
        this.fecha = respuesta.tasks;
        this.paginate = this.datos.paginate;
        this.sinfiltro = true;
      });
    },

    todosLosHistoricos() {
      this.traerDatos(1);
      this.fecha = this.datos.tasks;
      this.paginate = this.datos.paginate;
      this.sinfiltro = true;
      this.filtrom = false;
      this.filtrof = false;
      this.ingresoFiltrado = 0;
    },

    changePage: function (page) {
      this.paginate.current_page = page;
      if (this.sinfiltro == true && this.filtrom== false && this.filtrof == false ){
      this.traerDatos(page);
      }else if (this.filtrom== true && this.sinfiltro== false  && this.filtrof== false){
        this.FiltrajeMesa("historico/mesas/filtro/mesa", this.numMesa + "?page=" + page).then((respuesta) => {
        console.log("el filtraje de mesa es: " + respuesta);
        this.datos = respuesta;
        this.fecha = respuesta.tasks;
        this.ingresoFiltrado= respuesta.totalMesa;
        this.paginate = this.datos.paginate;

        this.sinfiltro = false;
        this.filtrom = true;
        this.filtrof = false;
      });
      }
    },

    //-------------------------------------------------@end---------------------------------------------------//

    //-------------------------------------- Seccion de ingresos --------------------------------------------//

    ObtenerTotal(precioTotal) {
      this.Total = precioTotal;
    },

    // MostrarIngresoFiltrado() {
    //   let ingresoFiltrado = 0;
    //   if (this.fecha.length != 0) {
    //     this.fecha.forEach((e) => {
    //       ingresoFiltrado = ingresoFiltrado + e.totalMesa;
    //       this.ingresoFiltrado = ingresoFiltrado;
    //     });
    //   } else {
    //     this.ingresoFiltrado = 0;
    //   }
    //},

    //------------------------------------------------@end----------------------------------------------------//

    //--------------------------------------- Seccion de filtro de fechas ------------------------------------//

    filtrarHistoricos() {
       this.FiltrajeFecha("historico/mesas/filtro/fecha", this.fechaUno , this.fechaDos).then((respuesta) => {
        console.log("el filtraje de fecha es: " + respuesta.arrayFiltradoFecha);
        this.datos = respuesta;
        this.fecha = respuesta.arrayFiltradoFecha;
        this.ingresoFiltrado= respuesta.totalFiltroFecha;

        this.sinfiltro = false;
        this.filtrom = false;
        this.filtrof = true;


      //Respuesta vieja de filtrado con todos los datos.
      // this.fecha = this.datos.filter(
      // (n) => n.fecha_cierre > this.fechaUno && n.fecha_cierre < this.fechaDos
      // );
       });
    },

    filtrarHistoricosPorMesa() {
      this.FiltrajeMesa("historico/mesas/filtro/mesa", this.numMesa).then((respuesta) => {
        console.log("el filtraje de mesa es: " + respuesta);
        this.datos = respuesta;
        this.fecha = respuesta.tasks;
        this.ingresoFiltrado= respuesta.totalMesa;
        this.paginate = this.datos.paginate;

        this.sinfiltro = false;
        this.filtrom = true;
        this.filtrof = false;
      });
      // this.fecha = this.datos.filter((n) => n.mesa_id == this.numMesa);
    },

    transformarfecha(fecha) {
      fecha = new Date(fecha);
      var options = { year: "numeric", month: "long", day: "numeric" };
      fecha = fecha.toLocaleDateString("es-AR", options);

      return fecha;
    },

    //------------------------------------------------@end----------------------------------------------------//
  },

  computed: {
    // Calculador de filas desde paginador front.
      rows() {
        return this.fecha.length
      },
    
    //Propiedad para alumbrar el numero de la paginas actual.
    isActived: function () {
      return this.paginate.current_page;
    },

    //Propiedad para calcular los elementos que van a aparecer en pantalla.
    pagesNumber: function () {
      // Controlamos si o no , nos aparezcan un numero determinado de paginas.
      if (!this.paginate.to) {
        return [];
      }

      var from = this.paginate.current_page - 3; //TODO offset
      if (from < 1) {
        from = 1;
      }

      var to = from + 3 * 2; //TODO offset
      if (to >= this.paginate.last_page) {
        to = this.paginate.last_page;
      }

      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++;
      }

      return pagesArray;
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

#h1 {
  padding-top: 20px;
  color: white;
}

.filtraje {
  display: flex;
  justify-content: space-around;
}

</style>
