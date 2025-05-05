import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useArrayStore = defineStore('arrayStore', () => {
  const pageCount = ref(null)
  const categories = ref(null)
  const products = ref(null)
  const product_in_history = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchData() {
    isLoading.value = true
    error.value = null
    try {
      const result = await axios.get('user_index')
      pageCount.value = result.data.page_count
      categories.value = result.data.categories
      products.value = result.data.products.data
      product_in_history.value = result.data.product_in_history
    } catch (err) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }



  return { 
    pageCount, 
    categories, 
    products, 
    product_in_history,
    isLoading,
    error,
    fetchData,
  }
})