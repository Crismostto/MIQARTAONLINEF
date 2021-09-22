<template>
  <div>
    <table>
      <tr>
        <th>NUMERO MESA</th>
        <th>ESTADO</th>
        <th>FECHA APERTURA</th>
      </tr>
      <tr v-for="(mesas, index) in datos" :key="index">
        <button>
          <td>{{ mesas.id }}</td>
          <td>{{ mesas.estado }}</td>
          <td>{{ mesas.fechaApertura }}</td>
        </button>
        <mesaPedido></mesaPedido>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import Web from "@/components/Api/Web.vue";
import mesaPedido from "@/views/MesaPedido.vue"
export default {
  mixins: [Web],
  components:{mesaPedido},
  data() {
    return {
      datos: [],
    };
  },
  created() {
    this.traerDatos();
  },
  methods: {
    traerDatos() {
      this.obtenerDatos("mesas").then((respuesta) => {
        this.datos = respuesta;
      });
    },
  },
};
</script>
