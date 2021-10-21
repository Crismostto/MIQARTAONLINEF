<template>
  <div class="collapsed formulario">
      <div class="form-group">
        <div>
          <hr>
          <h3>Ingrese nuevo pedido</h3>
        </div>
        <div class="form-group">
          <label for="">Articulo: </label>
          <select type="text" class="form-control" v-model="datos.articulo_id">
            <option disabled selected>Selecciona un Articulo</option>
            <option v-for="(articulos , index) in articulos" :key="index" :value="articulos.id">{{articulos.nombre}}</option>
          </select>  
        </div>

        <div class="form-group">
          <label for="">Mesa: </label>
          <select type="text" class="form-control" v-model="datos.mesa_id">
            <option disabled selected>Selecciona una Mesa</option>
            <option v-for="(mesa , index) in mesas" :key="index" :value="mesa.id">{{mesa.id}}</option>
          </select>  
        </div>

        <div class="form-group">
          <label for="">Cantidad: </label>
          <input type="text" placeholder="Ingrese la cantidad" class="form-control" v-model="datos.cantidad" />
        </div>

        <div class="form-group">
          <label for="">Precio: </label>
          <input type="text" placeholder="Ingrese el precio" class="form-control"  v-model="datos.precio"/><br />
        </div>

        <br>
        <button @click="aceptar()" class="btn btn-outline-primary">Aceptar</button>
        <button @click="cancelar()" class="btn btn-outline-danger">Cancelar</button>
      </div>
  </div>
</template>

<script>
import Api from "@/components/Api/Api.vue";
import Web from "@/components/Api/Web.vue";

export default {
  name: "PedidoABM",
  props: ["AbmAccion", "AbmId"],
  mixins: [Api, Web],

  data() {
    return {
      datos: {
        id: 0,
        cantidad:0,
        precio:0,
        Articulo_id:0,
        mesa_id:0,
    },

      articulos:[],
      mesas:[],
      
    };
  },

  created() {
    if (this.AbmAccion != "agregar") {
      this.traerDatosPorId("pedidos", this.AbmId).then((respuesta) => {
        this.datos = respuesta;
      });
    }

    this.ObtenerDatos('articulos')
                .then(respuesta =>{
                    this.articulos = respuesta
                    console.log('Se trajeron los datos de articulos')
                })

    this.ObtenerDatos('mesas')
                .then(respuesta =>{
                    this.mesas = respuesta
                    console.log('Se trajeron los datos de mesa')
                })


  },

  methods: {
    aceptar() {
      if (this.AbmAccion == "agregar") {
        this.insertarDatosApi("pedidos", this.datos).then((respuesta) => {
          if (respuesta.id != 0) {
            console.log("exito");
          } else {
            console.log("fracaso");
          }
          this.$emit("salirDePedidoCliente", true);
        });
      }

      if (this.AbmAccion == "editar") {
        this.EditarDatosApi("pedidos", this.AbmId, this.datos).then(
          (respuesta) => {
            this.$emit("salirDePedidoCliente", true);
            this.datos = respuesta;
          }
        );
      }

      if (this.AbmAccion == "eliminar") {
        this.EliminarDatosApi("pedidos", this.AbmId).then((respuesta) => {
          this.$emit("salirDePedidoCliente", true);
          this.datos = respuesta;
        });
      }
    },

    cancelar() {
      this.$emit("salirDePedidoCliente", false);
    },
  },
};
</script>

