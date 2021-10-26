<template>
  <div class="collapsed formulario">
    <div class="form-group">
      <div>
        <hr />
        <h3>Realizar pedido de la mesa {{ AbmMesa }}</h3>
      </div>
      <div class="form-group">
        <label for="">Articulo: </label>
        <select @change="precioArticulo" type="text" class="form-control" v-model="datos.articulo_id">
          <option disabled selected>Selecciona un Articulo</option>
          <option
            v-for="(articulos, index) in articulos"
            :key="index"
            :value="articulos.id"
          >
            {{ articulos.nombre }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="">Mesa: </label>
        <input disabled type="number" class="form-control" v-model="datos.mesa_id"/>
      </div>

      <div class="form-group">
        <label for="">Cantidad: </label>
        <input
          type="number"
          placeholder="Ingrese la cantidad"
          class="form-control"
          min="1"
          max="50"
          v-model="datos.cantidad"
        />
      </div>

      <div class="form-group">
        <label for="">Precio individual: </label>
        <input disabled type="number" class="form-control" v-model="this.datos.precio"/>  
        <br />
      </div>

      <br />
      <button @click="aceptar()" class="btn btn-outline-primary">
        Agregar al carrito
      </button>
      <button @click="cancelar()" class="btn btn-outline-danger">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import User from "@/components/Api/User.vue";

export default {
  name: "PedidoABM",
  props: ["AbmAccion", "AbmId", "AbmMesa"],
  mixins: [User],

  data() {
    return {
      datos: {
        cantidad: 0,
        precio: 0,
        articulo_id: 0,
        mesa_id: this.AbmMesa,
      },
      articulos: [],
      mesas: [],
    };
  },

  created() {
    if (this.AbmAccion != "agregar") {
      this.traerDatosPorId("pedidos", this.AbmId).then((respuesta) => {
        this.datos = respuesta;
      });
    }

    this.ObtenerDatos("articulos").then((respuesta) => {
      this.articulos = respuesta;
      console.log("Se trajeron los datos de articulos");
    });

    this.ObtenerDatos("mesas").then((respuesta) => {
      this.mesas = respuesta;
      console.log("Se trajeron los datos de mesa");
    });
  },

  methods: {
    aceptar() {
      if (this.AbmAccion == "agregar") {
        this.insertarPedidos("pedidos", this.datos).then((respuesta) => {
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


    precioArticulo(){
      this.traerDatosPorId('articulos', this.datos.articulo_id)
      .then(res=>{ this.datos.precio = res.precio})
    }
  },

  watch: {
    datos: {
      deep: true,
      handler: (valor) => {
        if (valor.cantidad < 0) {
          alert("no se puede ingresar valores menores a 0");
          valor.cantidad = 1;
        }

        if (valor.cantidad > 50) {
          alert("no se puede ingresar valores mayores a 50");
          valor.cantidad = 1;
        }
      
      },
    },
  },

  computed: {
      // precioArticulo: function(){
      //  let bandera=false;
      //  let i=1;
      //  //Se recorre el array de articulos y se vincula con el  articulo_id que esta dentro de datos.
      //  while(bandera != true & i < this.articulos.length ){
      //      if(this.datos.articulo_id == this.articulos[i].id){
      //          bandera= true;
      //        } else {
      //          i+= 1
      //          bandera=false;
      //        }
            
      //   }
      //    return 50;     

      
    }
};
</script>

<style>
</style>

