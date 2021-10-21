<template>
<div>
  <!-- NAV-BAR SECCION -->
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">MiQartaOnline</b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Mesa 1</em>
          </template>
          <b-dropdown-item href=" http://localhost:8080/">Desconectar</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <!-- Cartas presentando las mesas -->
  <div class="mesas">
    
   <b-card-group v-for="(mesa,index) in mesas" :key="index"> 
      <b-card
        :title="'Mesa ' + mesa.id"
        img-src="https://elcirculo.com.ar/wp-content/uploads/2020/08/Anuncios.jpeg"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
      
      <router-link to="/usuario/pedido"> <b-button v-if="mesa.estado == 0" variant="success">Disponible</b-button> </router-link>
      <b-button v-if="mesa.estado == 1 || mesa.estado ==  2" variant="danger">Ocupada</b-button>      
      </b-card>
      
   </b-card-group> 
  </div>    
    

</div>

</template>

<script>
import Web from "@/components/Api/Web.vue";

export default {
  mixins: [Web],
  data(){
    return{
      mesas:[]
    };
  },

  created() {
    this.traerDatos();
  },

  methods:{
     traerDatos() {
      this.ObtenerDatos("mesas").then((respuesta) => {
        this.mesas = respuesta;
      });
    },
  }
}
</script>

<style scoped>
.mesas{
  display:flex; 
  flex-wrap: wrap;
}
</style>