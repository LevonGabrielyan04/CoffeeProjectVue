<template>
    <div class = "main font-syne">
        <Header />
        <div class = "filters-container card-container">
            <h1 class=" text-6xl">Card</h1>
            <a class = "header-button buy-button" href = "{{ route('payment', ['user_id' => Auth::id()]) }}">Buy all</a>
            <ProductList v-if = "card.cardProducts" :is_card = "true" :products="card.cardProducts"></ProductList>

        </div>
        <Footer />
    </div>
</template>
<script setup>
    import Header from "./Header.vue"
    import Footer from "./Footer.vue"
    import ProductList from "./ProductList.vue"
    import {ref} from 'vue'
    import axios from "axios"
    import {useCardStore} from '../../../../public/stores/cardStore'

    const card = useCardStore();
    card.fetchData();
</script>