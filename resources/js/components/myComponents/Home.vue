<script setup>
    import Header from "./Header.vue"
    import Filters from "./Filters.vue"
    import RecentlyViewed from "./RecentlyViewed.vue"
    import Footer from "./Footer.vue"
    import {ref, onMounted,watch,toRef } from 'vue'
    import axios from 'axios'
    import { useRoute } from 'vue-router'
    import {useArrayStore} from '../../../../public/stores/arrayStore'
    import LoadingScreen from './LoadingScreen.vue';

    const props = defineProps({
        page:{
            type:String,
            default: "1"
        }
    })

    const page = toRef(props, 'page')

    const productsStore = useArrayStore();
    var isLoading = ref(true);
    
    onMounted(async () => {
        await productsStore.fetchData();
        isLoading.value = false;
    })

    watch(page,async (newVal, oldVal)=>{
        await productsStore.fetchData(newVal);
    })
</script>
<template>
    <LoadingScreen :isLoading = "isLoading"> </LoadingScreen>
    <div id="main font-syne" class = "main">
        <Header />
        <div class="products font-syne">
            <Filters v-if="productsStore.pageCount != null && productsStore.categories != null && productsStore.products != null " :page="page" :pageCount = "productsStore.pageCount" :categories = "productsStore.categories" :products="productsStore.products"></Filters>
        </div>
        <RecentlyViewed :product_in_history="productsStore.product_in_history"></RecentlyViewed>
        <Footer />
    </div>
</template>