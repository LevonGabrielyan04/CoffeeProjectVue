import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useCardStore = defineStore('cardStore', () => {
    const cardProducts = ref(null)

    async function fetchData() {
        const result = await axios.get('/card');
        cardProducts.value = result.data.products
    }

    async function deleteElement(productId) {
        try {
          await axios.get("/delete_from_card", {
            params: { product_id: productId }
          })
          cardProducts.value = cardProducts.value.filter(item => item.id != productId)
        } catch (err) {
          error.value = err.response?.data?.message || err.message
        }
      }

    return {fetchData, cardProducts, deleteElement}
})