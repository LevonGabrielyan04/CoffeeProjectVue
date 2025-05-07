<template>
        <div class = "main admin_panel_main">
        <AdminHeader />
        <div class = "center center_in_see_one">
            <div class = "form_at_center form_in_one_user">
                <h1>Create category</h1>
                <form @submit.prevent="submitForm" method="POST" class="real_form">
                <label class = " items-start">Category name:</label>
                 <input v-model="categoryName" name = "name" class = "admin_form_input admin_form_big_input" placeholder="Coffee">
                    <button class = "header-button" type = "submit">Create</button>
                 </form>              
</div>
        </div>
    </div>
</template>
<script setup>
    import axios from 'axios';
    import AdminHeader from './AdminHeader.vue';
    import {ref} from 'vue'

    const formData = new FormData();
    const categoryName = ref(null)
    function submitForm(){
        formData.append('name', categoryName.value)
        axios.post(route('category.post'), formData)
    }
</script>