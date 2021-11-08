<template>
  <div class="about">
    <div class="bg-light">
      <div class="header" v-show="!verabmarticulos">
        <h1>Articulos</h1>
        <button
          v-on:click="ABMARTICULOS('agregar')"
          class="agregar btn btn-success"
        >
          Agregar nuevo articulo
        </button>
      </div>
      <ArticulosABM
        v-if="verabmarticulos"
        :AbmAccion="tipoDeAccion"
        :AbmId="llamadoId"
        @salirDeAbmArticulos="mostrarAbmArticulos($event)"
      />
      <hr />
    </div>
    <table
      class="table table-striped table-bordered table-condensed"
      style="width: 100%"
    >
      <thead class="text-center">
        <tr class="table-success">
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripcion</th>
          <th>Categoria</th>
          <th>Accion</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(articulos, index) in datos" :key="index">
          <td>{{ articulos.id }}</td>
          <td>{{ articulos.nombre }}</td>
          <td>{{ articulos.precio }}</td>
          <td>{{ articulos.descripcion }}</td>
          <td>{{ articulos.ArticuloCategorias_id }}</td>
          <td>
            <button v-on:click="ABMARTICULOS('editar', articulos.id)" class="editar btn btn-primary"> 
              Editar
            </button>
            <button v-on:click="ABMARTICULOS('eliminar', articulos.id)" class="eliminar btn btn-danger">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ArticulosABM from "@/components/Articulo/ArticulosABM.vue";
import Web from "@/components/Api/Web.vue";

export default {
  mixins: [Web],

  components: {
    ArticulosABM,
  },

  data() {
    return {
      datos: [],
      verabmarticulos: false,
      tipoDeAccion: "",
      llamadoId: 0,
    };
  },

  created() {
    this.traerDatos();
  },

  methods: {
    ABMARTICULOS(accion, id = 0) {
      this.tipoDeAccion = accion;
      this.llamadoId = id;
      this.verabmarticulos = !this.verabmarticulos;
    },

    traerDatos() {
      this.ObtenerDatos("articulos").then((res) => {
        this.datos = res;
        console.log(res);
      });
    },

    mostrarAbmArticulos(ver) {
      this.verabmarticulos = false;
      if (ver == true) {
        this.traerDatos();
        console.log("mostrarAbmArticulos");
      }
    },
  },
};
</script>

<style scoped>
.about {
  text-align: center;
}

.header{
  background-color: #201f1f;
  padding-bottom: 10px;
  border: 2px solid;
}

h1{
  color:white;
}
/*.ListaCentrada{
  margin: 0
}*/
</style>