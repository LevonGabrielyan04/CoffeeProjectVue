<template>
    <div class="ribbon font-syne">
        <div class="ribbon-content">
            <div class = "ribbon-title">Cart</div>
                <div v-if="props.products" v-for="item in props.products" class = "ribbon-item">
                    <img class = "ribbon-item-image" :src="imagePath + item.image" alt="Product Image" />
                    <span class = "ribbon-item-name font-syne">{{ item.name }} | {{ item.pivot.quantity }} items</span>
                <hr class="the-hr">
                </div>
            <span v-if="props.totalPrice">Total price: {{props.totalPrice}}$</span>
        </div>
    </div>
</template>
<script setup>
    import {ref} from 'vue'

    const props = defineProps({
        products:{
            type: Array,
            required: true
        },
        totalPrice:{
            type: [String, Number],
            required: true
        }
    })

    // console.log(products)
    // console.log(totalPrice)
    console.log("eghav");
    
    const imagePath = import.meta.env.VITE_API_URL + '/storage/';


</script>
<style scoped>
    .the-hr{
        width: 100%; background-color:white;
    }
</style>