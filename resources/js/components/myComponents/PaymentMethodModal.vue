<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <h2>Are you sure?</h2>
        <p>This action cannot be undone.</p>
        <div class="buttons">
          <button @click="Stripe">Stripe</button>
          <button @click="PayPal">PayPal</button>
          <button @click="onCancel">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    product:{
        type:Object,
        required:true
    }
  })

  const isVisible = ref(true)
  
  const Stripe = () => {
    window.location.href = route('payment', { id: props.product.id, quantity: 1 });
    isVisible.value = false
  }

  const PayPal = () => {
    window.location.href = route('paymentPayPal', { id: props.product.id, quantity: 1 });
    isVisible.value = false
  }
  
  const onCancel = () => {
    isVisible.value = false
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 300px;
    text-align: center;
  }
  
  .buttons {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:last-child {
    background-color: #6c757d;
  }
  </style>
  