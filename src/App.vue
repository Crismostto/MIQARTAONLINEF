<template>
 <div id="app">
   <div id="vista" > 
     <!--Seleccion de hacia la vista de usuario o vista de admin-->
    <div class="globalLogin">
      <div class="cajaLogin" v-if="useroradmin">
        <div class="headerLogin"> 
          <h5 id="titleLogin">Selccione el tipo de usuario</h5>
        </div>
        
        <div class="bodyLogin">
            <router-link to="/mesas"> <b-button class="btnLogin" v-if="useroradmin" @click="seleccionarVista('admin')"  variant="outline-light">Admin</b-button> </router-link>
            <router-link to="/usuario">  <b-button class="btnLogin" v-if="useroradmin" @click="seleccionarVista('user')" variant="outline-light">Usuario</b-button></router-link>
        </div>
      
      </div> 
   </div> 
 
 
  <!--Vista de admin --> 
  <div id="admin" v-if="admin">
    <!--  <img alt="Restaurant logo" class="logo" src="..\src\assets\logo-restaurant.jpg"> -->
   
    <div id="nav">
      <div id="side-menu" class="menu-collapsed">
        <!--HEADER-->
        <div id="header">
          <div id="title"><span>MiQartaOnline</span></div>
          <div id="menu-btn" @click="AbrirMenu">
            <div class="btn-hamburger"></div>
            <div class="btn-hamburger"></div>
            <div class="btn-hamburger"></div>
          </div>
        </div>

        <!--PERFIL-->
        <div id="profile">
          <div id="photo">
            <img
              alt="Usuario logo"
              class="user-logo"
              src="..\src\assets\user.png"
            />
          </div>
          <div id="name"><span>Admin</span></div>
        </div>

        <!--ITEMS-->
       

        <div id="menu-items">
          <div class="item separator">
            <router-link to="/mesas">
              <div class="icon">
                <img src="..\src\assets\table.png" alt="" />
              </div>
              <div class="title">Mesas</div>
            </router-link>
          </div>
          
          <div class="item">
            <router-link to="/articulos">
              <div class="icon">
                <img src="..\src\assets\food-drink.png" alt="" />
              </div>
              <div class="title">Articulos</div>
            </router-link>
          </div>

          <div class="item">
            <router-link to="/articulos/categorias">
              <div class="icon">
                <img src="..\src\assets\ladybug.png" alt="" />
              </div>
              <div class="title">Categorias</div>
            </router-link>
          </div>

           <div class="item">
            <router-link to="/historico/mesas">
              <div class="icon">
                <img src="..\src\assets\historicos.png" alt="" />
              </div>
              <div class="title">Historicos</div>
            </router-link>
          </div>

           <div class="item">
             <a id="desconectar" href="http://localhost:8080/">
              <div class="icon">
                <img src="..\src\assets\desconectar.png" alt="" />
              </div>
              <div class="title">Desconectar</div>
             </a>  
          </div>
        </div>
      </div>
    </div>



    <div class="components">
      <router-view />
    </div>
 </div>  
  
  <!--Vista de usuario -->
  <div id="usuario" v-if="usuario">
      <div class="components-usuario">
       <router-view />
       </div>
  </div>
 </div>
</div>

</template>

<script>
export default {
  
  data(){
    return {
       admin:false,
       usuario:false,
       useroradmin: true
    };
  },

  methods: {
    AbrirMenu() {
      const menu = document.querySelector("#side-menu");

      menu.classList.toggle("menu-expanded");
      menu.classList.toggle("menu-collapsed");

      document.querySelector("body").classList.toggle("body-expanded");
    },

    //Se selecciona la vista en la cual se va a ver el sistema , si desde usuario o si desde un admin.
    seleccionarVista(tipo){
    
     if (tipo=="admin") {
        this.useroradmin=false;
        this.usuario= false;
        this.admin = true; 
      }
      
      if (tipo=="user") {
        this.useroradmin=false;
        this.admin=false;
        this.usuario = true; 
      }

    }
  },
};
</script> 






<style>
:root {
  --width: 300px;
  --padding: 10px;
  --bgcolor: rgb(52, 52, 52);
  --hovercolor: rgb(23, 23, 23);
  --width-collapsed: 50px;
}

.components {
  margin-left: 40px;
}
body {
  background-color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  padding: 10px;
  padding-top: 0;
  margin: 0;
  margin-left: var(--width-collapsed);
}

.body-expanded {
  margin-left: var(--width);
}

#main-container {
  color: white;
}

#side-menu {
  background-color: var(--bgcolor);
  color: white;
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
}

#side-menu a {
  color: white;
  text-decoration: none;
}

/* Header */

#side-menu #header {
  box-sizing: border-box;
  border-bottom: solid 1px var(--hovercolor);
}

#side-menu #header #title {
  box-sizing: border-box;
  overflow: hidden;
}

#side-menu #header #title #side-menu #header #menu-btn {
  vertical-align: middle;
}

#side-menu #header #menu-btn {
  display: inline-block;
}

#side-menu #header #menu-btn {
  cursor: pointer;
  padding: 10px;
  width: var(--width-collapsed);
  box-sizing: border-box;
}

#side-menu #header #menu-btn:hover {
  background-color: var(--hovercolor);
}

#side-menu #header #menu-btn .btn-hamburger {
  background-color: #fff;
  width: 100%;
  height: 2px;
  margin: 5px 0;
}

/* PERFIL */
#side-menu #profile {
  border-bottom: solid 1px var(--hovercolor);
  padding: var(--padding) 0;
  text-align: center;
}

#side-menu #profile #photo {
  box-sizing: border-box;
  padding: var(--padding);
  margin: 0 auto;
}

#side-menu #profile #photo img {
  border-radius: 50%;
  width: 40%;
}

#side-menu #profile #photo,
#side-menu #profile #name {
  font-size: 24px;
  padding: var(--padding) 0;
  overflow: hidden;
}

/* ITEM */
#side-menu #menu-items {
  overflow: hidden;
}

#side-menu #menu-items .item {
  width: var(--width);
}

#side-menu #menu-items .item .icon {
  display: inline-block;
}

#side-menu #menu-items .item .icon,
#side-menu #menu-items .item .title {
  font-size: 14px;
  vertical-align: middle;
  overflow: hidden;
  display: inline-block;
}

#side-menu #menu-items .item a {
  display: block;
}

#side-menu #menu-items .item a:hover {
  background-color: var(--hovercolor);
}

#side-menu #menu-items .item .icon {
  box-sizing: border-box;
  padding: var(--padding);
  width: var(--width-collapsed);
}

#side-menu #menu-items .item .icon img {
  width: 100%;
}

#side-menu #menu-items .item .title {
  padding: var(--padding);
}

#side-menu #menu-items .item .separator {
  height: 1px;
  border-bottom: solid 1px var(--hovercolor);
  margin: 15px 0;
}

.menu-expanded #header #title {
  display: inline-block;
  width: calc(100% - 50px);
  margin-right: -5px;
  padding: var(--padding);
}

.menu-expanded #header #title span {
  width: calc(var(--width) - var(--width-collapsed) - 5px);
  overflow: hidden;
  display: inline-block;
}

.menu-expanded #profile #photo {
  width: 200px;
}

.menu-expanded #profile #name {
  width: 100%;
}

.menu-collapsed {
  width: var(--width-collapsed);
}

.menu-collapsed #header #title {
  width: 0;
  height: 0;
  padding: 0;
  margin: 0;
}

.menu-collapsed #profile #name {
  display: none;
}

.menu-collapsed .item {
  width: 100px;
}

/* LOGIN */
.cajaLogin{
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background: rgba(0,0,0,.8);
  box-sizing:  border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.5);
  border-radius: 10px;
}

.headerLogin {
  background-color: rgba(207, 199, 199, 0.8);
  border-radius: 50px;
}

.bodyLogin{
  display: flex;
  justify-content: center;
  padding: 10px;
}


.btnLogin{
  margin:7.5px;
}



#titleLogin{
  text-align: center;
  color:rgb(3, 3, 3);
  font-family: "Latin Modern Roman";
  font-style: oblique;
}

 
</style>

