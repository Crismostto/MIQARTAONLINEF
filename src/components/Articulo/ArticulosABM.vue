<template>
  <div class="collapsed formulario">
    <form>
      <div class="form-group">
        <div>
          <hr>
          <h3>Ingrese nuevo articulo</h3>
        </div>
        <div class="form-group">
          <label for="">Nombre: </label>
          <input type="text" class="form-control" v-model="datos.nombre" />
        </div>
        <div class="form-group">
          <label for="">Precio: </label>
          <input type="text" class="form-control" v-model="datos.precio" /><br />
        </div>
        <div class="form-group">
          <label for="">Descripcion: </label>
          <input type="text" class="form-control" v-model="datos.descripcion" /><br />
        </div>

        <div class="form-group">
          <label for="">Categoria: </label>
          <input type="text" class="form-control" v-model="datos.ArticuloCategorias_id" />
        </div>
        <br>
        <button @click="aceptar()" class="btn btn-outline-primary">Aceptar</button>
        <button @click="cancelar()" class="btn btn-outline-danger">Cancelar</button>
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

