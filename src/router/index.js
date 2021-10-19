import Vue from 'vue'
import VueRouter from 'vue-router'
import Mesa from '../views/Mesa.vue'
import Articulo from '../views/Articulo.vue'
import HistoricoMesas from '../views/HistoricoMesas.vue'
import pedidoCliente from '../views/cliente/pedidoCliente.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    path: '/pedidos',
    name: 'Pedid',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: pedidoCliente
    
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
