<template>
    <div class = "product_card">
        <div class="product_card-image_div">
        <img class = "product_card-image" :src="imagePath">
    
    </div>
    <div class = "product_card-info">
        <div class = "product_card-main_text font-syne">{{props.product.name}}</div>
        <div class = "product_card-secondary_text font-syne">{{ props.product.description }}</div>
        <div class = "product_card-price font-syne">${{ props.product.price }}</div>
    </div>
    <router-link  class = "font-syne product_card-button" :to="{ name: 'product', params: { id: product.id } }"  >
        Προσθήκη στην κάρτα
    </router-link> 
    <div v-if="is_card" class = "links_in_card">
        <button class = "font-syne product_card-button h-[52px]" @click="card.deleteElement(product.id)">Delete</button>
        <a :href = "route('payment', { id: product.id, quantity: props.product.pivot.quantity})" class = "font-syne product_card-button h-[52px] w-full">Buy ({{props.product.pivot.quantity}})</a>
    </div>
</div>
</template>
<script setup>
    import {onMounted} from 'vue'
    import axios from 'axios';
    import {useCardStore} from '../../../../public/stores/cardStore'
    const props = defineProps({
        product:{
            type: Object,
            required: true
        },
        is_card:{
            type: Boolean,
            default: false
        }
    })
    const card = useCardStore();
    const imagePath = "http://127.0.0.1:8000/" + "storage/" + props.product.image;

    onMounted(() => {
        console.log("products are",props.product);
        
    })
</script>