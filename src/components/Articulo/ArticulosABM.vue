<template>
  <div class="collapsed formulario">
      <div class="form-group">
        <div>
          <hr>
          <h3>Ingrese nuevo articulo</h3>
        </div>
        <div class="form-group">
          <label for="">Nombre: </label>
          <input type="text" placeholder="Ingrese el nombre" class="form-control" v-model="datos.nombre" />
        </div>
        <div class="form-group">
          <label for="">Precio: </label>
          <input type="text" placeholder="Ingrese el precio" class="form-control" v-model="datos.precio"/><br />
        </div>
        <div class="form-group">
          <label for="">Descripcion: </label>
          <input type="text" placeholder="Ingrese la descripción" class="form-control" v-model="datos.descripcion" /><br />
        </div>

        <div class="form-group">
          <label for="">Categoria: </label>
          <select type="text" class="form-control" v-model="datos.ArticuloCategorias_id">
            <option disabled selected>Selecciona una categoria</option>
            <option v-for="(categoria , index) in categorias" :key="index" :value="categoria.id">{{categoria.nombre}}</option>
          </select>  
        </div>
        <br>
        <button @click="aceptar()" class="btn btn-outline-primary">Aceptar</button>
        <button @click="cancelar()" class="btn btn-outline-danger">Cancelar</button>
      </div>
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
        precio: null,
        descripcion:"",
        ArticuloCategorias_id:0,
    },

      categorias:[],
    };
  },

  created() {
    if (this.AbmAccion != "agregar") {
      this.traerDatosPorId("articulos", this.AbmId).then((respuesta) => {
        this.datos = respuesta;
      });
    }

    this.ObtenerDatos('articulos/categorias')
                .then(respuesta =>{
                    this.categorias = respuesta
                    console.log('Se trajeron los datos de Categoria')
                })
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

