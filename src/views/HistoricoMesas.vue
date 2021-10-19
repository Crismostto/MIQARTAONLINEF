<template>
  <div class="mesas">
    <div class="header">
      <h1 id="h1">Historico de los pedidos</h1>
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
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #cell(Accion)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Detalles
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2 hijo">
              <HistoricoPedidos :id_Pedido="row.item.id"></HistoricoPedidos>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Ocultar Detalles</b-button
            >
          </b-card>
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
        { key: "id" , label:"Id_Pedido" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "mesa_id" , label:"Mesa" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "fecha_apertura" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "fecha_cierre" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "Accion", label: "Accion" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
      ],
      datos: [],
      currentPage: 1,
      perPage:10,
    };
  },
  created() {
    this.traerDatos();
  },
  computed: {
      rows() {
        return this.datos.length
      }
    },
  methods: {
    traerDatos() {
      this.ObtenerDatos("historico/mesas").then((respuesta) => {
        this.datos = respuesta;
      });
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
}

#h1 {
  padding-top: 20px;
}


</style>