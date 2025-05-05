<template>
    <div id = "products-main" class = "products-main">
    <ProductCard v-for="product in productsLocal" :product="product" :is_card="props.is_card" @delete-product="reciveEmit"></ProductCard>
    
    <h2 v-if="is_card && _.isEmpty(productsLocal)">Card is empty</h2>
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

    const productsLocal = ref(props.products);

    function reciveEmit(productId){
        console.log("record with this id is deleted: ", productId)

        productsLocal.value = productsLocal.value.filter((item) => {
            item.id != productId
        })
    }
</script>