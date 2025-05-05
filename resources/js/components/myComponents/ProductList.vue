<template>
    <div id = "products-main" class = "products-main">
    <ProductCard v-for="product in props.products" :product="product" :is_card="props.is_card"></ProductCard>
    
    <h2 v-if="is_card && _.isEmpty(props.products)">Card is empty</h2>
</div>
</template>
<script setup>
import _ from 'lodash';
import ProductCard from './ProductCard.vue'
import {ref} from 'vue'

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