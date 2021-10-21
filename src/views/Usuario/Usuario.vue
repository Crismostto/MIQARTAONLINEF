<template>
  <div class="usuario"> 
    <div class="navbar-container">
      <div class="navbar-content">
        <div class="icons">            
            <router-link to="/usuario">
            <img src="..\..\..\src\assets\comida-user.png" alt="" class="bx-sm" />
            </router-link> 
            
            <router-link to="/usuario/pedido">
            <img src="..\..\..\src\assets\comida-user.png" alt="" />
            </router-link>

             <router-link to="/usuario/pedido">
            <img src="..\..\..\src\assets\comida-user.png" alt="" />
            </router-link>

        </div>
      </div>
    </div>
  </div>  
</template>

<style scoped>
.navbar-container{
 width: 100%;
 
 position:fixed;
 bottom:0;
}

.navbar-content{
 
}

a {
  color: rgba(163, 163, 163, 163);
}

a:hover{
  background-color: rgba(255, 131, 62);
}
.icons{
  padding:20px;
  display: flex;
  justify-content: space-around;
}
.usuario{
  text-align: center;
  margin: 0px;
  padding: 0px;
}

</style>