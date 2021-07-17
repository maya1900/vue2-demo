import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

// 导航守卫
router.beforeEach(async (to, from, next) => {
  // document.title = getTitle(to.meta.title)
  if (to.path === '/login') {
    next()
  } else {
    if (store.getters.token) {
      const hasRoles = store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/_getInfo')
          const addRoutes = await store.dispatch(
            'permission/getAsyncRoutes',
            roles
          )
          router.addRoutes(addRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const createRouter = () => {
  return new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
  })
}
const router = createRouter()

export function resetRouter() {
  const reset = createRouter()
  router.matcher = reset.matcher
}
export default router
