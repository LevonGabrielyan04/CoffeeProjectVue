<script setup>
    import Header from "./Header.vue"
    import Filters from "./Filters.vue"
    import RecentlyViewed from "./RecentlyViewed.vue"
    import Footer from "./Footer.vue"
    import {ref, onMounted} from 'vue'
    import axios from 'axios'
    import { useRoute } from 'vue-router'
    import {useArrayStore} from '../../../../public/stores/arrayStore'

    const productsStore = useArrayStore();
    
    onMounted(async () => {
        await productsStore.fetchData()
        console.log("TTTTTTTT",productsStore.products)
    })

    
</script>
<template>
    <div id="main font-syne" class = "main">
        <Header />
        <div class="products font-syne">
            <Filters v-if="productsStore.pageCount != null && productsStore.categories != null && productsStore.products != null " :pageCount = "productsStore.pageCount" :categories = "productsStore.categories" :products="productsStore.products"></Filters>
        </div>
        <RecentlyViewed :product_in_history="productsStore.product_in_history"></RecentlyViewed>
        <Footer />
    </div>
</template>