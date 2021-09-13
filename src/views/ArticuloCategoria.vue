<template>
  <div class="home">
    <h1>Bienvenidos a la seccion de RUBROS</h1> 
    <div>
      <articuloCategoriaINFO/> 
    </div>  

  </div>
</template>

<script>
// @ is an alias to /src
import articuloCategoriaINFO from '@/components/ArticuloCategoria/articuloCategoriaINFO.vue'

export default {
  name: 'RUBRO',
  components: {
    articuloCategoriaINFO
  }
}
</script>