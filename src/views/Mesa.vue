<template>
  <div class="mesas">
    <div class="header">
      <h1 id="h1">Estado de las mesas</h1>
    </div>
    <hr />
    <div class="body">
      <table
        class="table table-striped table-bordered table-condensed"
        style="width: 100%"
      >
        <thead class="text-center">
          <tr class="table-success">
            <th>Mesa</th>
            <th>Estado</th>
            <th>Fecha Apertura</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-b-toggle.collapse-2
            class="m-1"
            v-for="(mesas, index) in datos"
            :key="index"
          >
            <td>{{ mesas.id }}</td>
            <td>{{ mesas.estado }}</td>
            <td>{{ mesas.fechaApertura }}</td>
            <!--  <td><button @click="abmmesas('editar', mesas.id)" class="editar btn btn-primary">Editar</button>               
                    <button @click="abmmesas('eliminar', mesas.id)" class="eliminar btn btn-danger">Eliminar</button>
                </td>
              -->
          </tr>
          <b-collapse id="collapse-2">
            <mesaPedido class="hijo"></mesaPedido>
          </b-collapse>
        </tbody>
      </table>

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
              <mesaPedido :id_Mesa="row.index + 1"></mesaPedido>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails"
              >Ocultar Detalles</b-button
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
