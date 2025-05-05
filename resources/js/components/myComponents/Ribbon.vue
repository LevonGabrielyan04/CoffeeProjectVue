<template>
    <div class="ribbon font-syne">
        <div class="ribbon-content">
            <div class = "ribbon-title">Cart</div>
                <div v-for="item in props.products" class = "ribbon-item">
                    <img class = "ribbon-item-image" src="{{ asset('storage/' . $item->image) }}" alt="Product Image" />
                    <span class = "ribbon-item-name font-syne">{{ $item->name }} | {{ $item->pivot->quantity }} items</span>
                <hr style = "width: 100%; background-color:white;">
                </div>
            <span>Total price: {{$total_price}}$</span>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
        products:{
            type: Array,
            required: false
        },
        totalPrice:{
            type: [String, Number],
            required: false
        }
    })
</script>