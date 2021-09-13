<template>
  <div id="app">
    
    <img alt="Restaurant logo" src="C:\xampp\htdocs\MIQARTAONLINE\miqartaonlinef\src\assets\logo-restaurant.jpg">
    
  <div id="nav">
      <router-link to="/">Mesas</router-link> |
      <router-link to="/articulos">Articulos</router-link>
      <router-link to="/articulos/categorias">rubros</router-link>
  </div>
  <router-view/>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
