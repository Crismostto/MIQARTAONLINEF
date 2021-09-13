import Vue from 'vue'
import VueRouter from 'vue-router'
import Mesa from '../views/Mesa.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/Articulo.vue')
  },
  {
    path: '/articulos/categorias',
    name: 'ArticuloCategoria',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ArticuloCategoria.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
