import { createRouter, createWebHistory } from 'vue-router'

// Import your Vue components
import Header from '../components/myComponents/Header.vue'
import Filters from '../components/myComponents/Filters.vue'
import Product from '../components/myComponents/Product.vue'
import Home from '../components/myComponents/Home.vue'
import Card from '../components/myComponents/Card.vue'

const routes = [
    { path: '/:page?',name: 'user_index' ,component: Home ,props: true },
    { path: '/header', component: Header, name: 'header' },
    { path: '/filters', component: Filters, name: 'filters' },
    { path: '/product/:id', name: 'product',component: Product, props:true },
    { path: '/card/:user_id', name: 'card',component: Card, props:true },
    // Add more routes as needed
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router