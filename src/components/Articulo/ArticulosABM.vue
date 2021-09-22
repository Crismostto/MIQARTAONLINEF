<template>
  <div class="formulario">
    <form>
      <div class="form-group">
        <div>
          <h2>articulos</h2>
        </div>
        <div>
          <label for="">nombre</label>
          <input type="text" v-model="datos.nombre" />
        </div>
        <div>
          <label for="">precio</label>
          <input type="text" v-model="datos.precio" /><br />
        </div>
        <div>
          <label for="">descripcion</label>
          <input type="text" v-model="datos.descripcion" /><br />
        </div>

        <div>
          <label for="">categoria</label>
          <input type="text" v-model="datos.ArticuloCategorias_id" />
        </div>

        <button @click="aceptar()">aceptar</button>
        <button @click="cancelar()">cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import Web from "@/components/Api/Web.vue";

export default {
  name: "ArticulosABM",
  props: ["AbmAccion", "AbmId"],
  mixins: [Web],

  data() {
    return {
      datos: {
        id: 0,
        nombre: "",
        tipo: "",
      },
    };
  },

  created() {
    if (this.AbmAccion != "agregar") {
      this.traerDatosPorId("articulos", this.AbmId).then((respuesta) => {
        this.datos = respuesta;
      });
    }
  },

  methods: {
    aceptar() {
      if (this.AbmAccion == "agregar") {
        this.insertarDatosApi("articulos", this.datos).then((respuesta) => {
          if (respuesta.id != 0) {
            console.log("exito");
          } else {
            console.log("fracaso");
          }
          this.$emit("salirDeAbmArticulos", true);
        });
      }

      if (this.AbmAccion == "editar") {
        this.EditarDatosApi("articulos", this.AbmId, this.datos).then(
          (respuesta) => {
            this.$emit("salirDeAbmArticulos", true);
            this.datos = respuesta;
          }
        );
      }

      if (this.AbmAccion == "eliminar") {
        this.EliminarDatosApi("articulos", this.AbmId).then((respuesta) => {
          this.$emit("salirDeAbmArticulos", true);
          this.datos = respuesta;
        });
      }
    },

    cancelar() {
      this.$emit("salirDeAbmArticulos", false);
    },
  },
};
</script>

