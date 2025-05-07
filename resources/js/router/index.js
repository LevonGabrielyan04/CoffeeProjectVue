import { createRouter, createWebHistory } from 'vue-router'

// Import your Vue components
import Header from '../components/myComponents/Header.vue'
import Filters from '../components/myComponents/Filters.vue'
import Product from '../components/myComponents/Product.vue'
import Home from '../components/myComponents/Home.vue'
import Card from '../components/myComponents/Card.vue'
import CreateProduct from '../components/myComponents/AdminComponents/CreateProduct.vue'
import CreateCategory from '../components/myComponents/AdminComponents/CreateCategory.vue'
import SeeAllUsers from '../components/myComponents/AdminComponents/SeeAllUsers.vue'
import SeeOneUser from '../components/myComponents/AdminComponents/SeeOneUser.vue'
import SeeOneProduct from '../components/myComponents/AdminComponents/SeeOneProduct.vue'
import axios from 'axios'

const routes = [
    { path: '/:page?',name: 'user_index' ,component: Home ,props: true },
    { path: '/header', component: Header, name: 'header' },
    { path: '/filters', component: Filters, name: 'filters' },
    { path: '/product/:id', name: 'product',component: Product, props:true },
    { path: '/card/:user_id', name: 'card',component: Card, props:true },
    { path: '/admin/add-product', component: CreateProduct, name: 'add-product', meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/admin/add-category', component: CreateCategory, name: 'add-category', meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/admin/all-users', component: SeeAllUsers, name: 'all-users', meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/admin/one-user', component: SeeOneUser, name: 'one-user', meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/admin/one-product', component: SeeOneProduct, name: 'one-product', meta: { requiresAuth: true, requiresAdmin: true } },
    // Add more routes as needed
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    var user = null;
     await axios.get("/user")
    .then((result)=>{
        if(result.data != '')
            user = result.data;
    });
    const isLoggedIn = !!user;
    const isAdmin = user?.role === 'admin';
  
    if (to.meta.requiresAuth && !isLoggedIn) {
      return next({ name: 'login' });
    }
  
    if (to.meta.requiresAdmin && !isAdmin) {
      return next({ name: 'not-authorized' });
    }
  
    return next();
  });  

export default router