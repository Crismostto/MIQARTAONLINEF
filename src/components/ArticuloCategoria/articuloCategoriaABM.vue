<template>
  <div class=" collapsed formulario">
    <form>
      <div>
        <div>
          <hr>
          <h3>Ingrese nueva categoria</h3>
        </div>

        <div class="form-group">
          <label for="">Nombre</label>
          <input type="text"  class="form-control" v-model="datos.nombre" /><br />
        </div>

        <button @click="aceptar()" type="button" class="btn btn-outline-primary">Aceptar</button>
        <button @click="cancelar()" type="button" class="btn btn-outline-danger">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import Web from "@/components/Api/Web.vue";

export default {
  props: ["AbmAccion", "AbmId"],
  mixins: [Web],
  data() {
    return {
      datos: {
        id: 0,
        nombre: "",
      },
    };
  },
  created() {
    if (this.AbmAccion != "agregar") {
      this.traerDatosPorId("articulos/categorias", this.AbmId).then(
        (respuesta) => {
          this.datos = respuesta;
        }
      );
    }
  },
  methods: {
    aceptar() {
      if (this.AbmAccion == "agregar") {
        this.insertarDatosApi("articulos/categorias", this.datos).then(
          (respuesta) => {
            if (respuesta.id != 0) {
              console.log("exito");
            } else {
              console.log("fracaso");
            }
            this.$emit("salirDeAbmRubros", true);
          }
        );
      }
      if (this.AbmAccion == "editar") {
        this.EditarDatosApi(
          "articulos/categorias",
          this.AbmId,
          this.datos
        ).then((respuesta) => {
          this.$emit("salirDeAbmRubros", true);
          this.datos = respuesta;
        });
      }
      if (this.AbmAccion == "eliminar") {
        this.EliminarDatosApi("articulos/categorias", this.AbmId).then(
          (respuesta) => {
            this.$emit("salirDeAbmRubros", true);
            this.datos = respuesta;
          }
        );
      }
    },
    cancelar() {
      this.$emit("salirDeAbmRubros", false);
    },
  },
};
</script>

