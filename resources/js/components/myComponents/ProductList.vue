<template>
    <div id = "products-main" class = "products-main">
    <ProductCard v-for="product in products" :product="product"></ProductCard>
    
    <h2 v-if="is_card && _.isEmpty(products)">Card is empty</h2>
</div>
</template>
<script setup>
import _ from 'lodash';
import ProductCard from './ProductCard.vue'

    const props = defineProps({
        is_card:{
            type:Boolean,
            default: false
        },
        products:{
            type:Object,
            required: true
        }
    });
</script>