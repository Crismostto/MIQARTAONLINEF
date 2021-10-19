<template>
  <div class="collapsed formulario">
      <div class="form-group">
        <div>
          <hr>
          <h3>Ingrese nuevo articulo</h3>
        </div>
        <div class="form-group">
          <label for="">Articulo: </label>
          <select type="text" class="form-control" v-model="datos.articulo_id">
            <option disabled selected>Selecciona una categoria</option>
            <option v-for="(pedido , index) in pedidos" :key="index" :value="pedido.id">{{pedido.nombre}}</option>
          </select>  
        </div>

        <div class="form-group">
          <label for="">Mesa: </label>
          <select type="text" class="form-control" v-model="datos.mesa_id">
            <option disabled selected>Selecciona una categoria</option>
            <option v-for="(pedido , index) in pedidos" :key="index" :value="pedido.id">{{pedido.nombre}}</option>
          </select>  
        </div>

        <div class="form-group">
          <label for="">Cantidad: </label>
          <input type="text" placeholder="Ingrese el nombre" class="form-control" v-model="datos.nombre" />
        </div>

        <div class="form-group">
          <label for="">Precio: </label>
          <input type="text" placeholder="Ingrese el precio" class="form-control" v-model="datos.precio"/><br />
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
        cantidad:0,
        precio:0,
        Articulo_id:0,
        mesa_id:0,
    },

      pedidos:[],
    };
  },

  created() {
    if (this.AbmAccion != "agregar") {
      this.traerDatosPorId("pedidos", this.AbmId).then((respuesta) => {
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

