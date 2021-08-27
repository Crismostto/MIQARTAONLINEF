<template>
  <div class="home">
    <h1>Bienvenidos a la seccion de mesas</h1> 
    <div>
      <MesaINFO/> 
    </div>  

  </div>
</template>

<script>
// @ is an alias to /src
import MesaINFO from '@/components/MesaINFO.vue'

export default {
  name: 'Home',
  components: {
    MesaINFO
  }
}
</script>
