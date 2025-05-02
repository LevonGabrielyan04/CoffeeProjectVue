<script setup>
    import Header from "./Header.vue"
    import Filters from "./Filters.vue"
    import RecentlyViewed from "./RecentlyViewed.vue"
    import Footer from "./Footer.vue"
    import {ref, onMounted} from 'vue'
    import axios from 'axios'

    const pageCount = ref(null)
    const categories = ref(null)
    const products = ref(null)
    const product_in_history = ref(null)

    onMounted(()=>{
        console.log(import.meta.env.VITE_API_URL);
        
        axios.get('user_index')
        .then((result) => {
            console.log("api request result:",result.data);
            pageCount.value = result.data.page_count;
            categories.value = result.data.categories;
            products.value = result.data.products.data;
            product_in_history.value = result.data.product_in_history;
        });
    })
</script>
<template>
    <div id="main font-syne" class = "main">
        <Header />
        <div class="products font-syne">
            <Filters v-if="pageCount != null && categories != null && products != null " :pageCount = "pageCount" :categories = "categories" :products="products"></Filters>
        </div>
        <RecentlyViewed :product_in_history="product_in_history"></RecentlyViewed>
        <Footer />
    </div>
</template>