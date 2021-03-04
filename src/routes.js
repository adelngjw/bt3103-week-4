import Home from './components/Home.vue'
import Orders from './components/Orders.vue'
//import Login from './components/Login.vue'
import Modify from './components/Modify.vue'

export default [
  { path: '/', component: Home },
  { path: '/orders', component: Orders },
  {path: '/modify', name: "modify", component: Modify, props:true}
]