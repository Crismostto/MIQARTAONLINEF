import Vue from 'vue'
import VueRouter from 'vue-router'
import Mesa from '../views/Mesa.vue'
import Articulo from '../views/Articulo.vue'
import HistoricoMesas from '../views/HistoricoMesas.vue'
import Usuario from '../views/Usuario/Usuario.vue'
import UsuarioPedido from '../views/Usuario/UsuarioPedido.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/mesas',
    name: 'Mesa',
    component: Mesa
  },
  {
    path: '/articulos',
    name: 'Articulo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Articulo
    
  },
  {
    path: '/articulos/categorias',
    name: 'ArticuloCategoria',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticuloCategoria.vue')
  },
  {
    path: '/historico/mesas',
    name: 'Historico',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HistoricoMesas
    
  },

  {
    path: '/usuario',
    name: 'Usuarios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Usuario

    
  },
  {
    path: '/usuario/pedido',
    name: 'Usuarios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: UsuarioPedido

    
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
