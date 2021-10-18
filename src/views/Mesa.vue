<template>
  <div class="mesas">
    <div class="header">
      <h1 id="h1">Estado de las mesas</h1>
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
      >
        <template #cell(Accion)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Ocultar" : "Mostrar" }} Detalles
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2 hijo">
              <mesaPedido :id_Mesa="row.item.id"></mesaPedido>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Ocultar Detalles</b-button
            >
            <b-button size="sm" variant="danger" class="ml-1"
              >Cerrar Pedido</b-button
            >
          </b-card>
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
        { key: "id" , label:"Mesa" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "estado" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "fechaApertura" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
        { key: "Accion", label: "Accion" , thStyle: { backgroundColor: 'rgb(209,231,221)'}},
      ],
      datos: [],
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
