<template>
    <div class = "center center_in_see_one">
        <AdminHeader></AdminHeader>
        <div class = "form_at_center form_in_one_user">
            <h1>See one user</h1>
            <form @submit.prevent="submitForm" method="POST" class="real_form">
                <label>Name or email:</label>
                <input name = "input" v-model="input" class = "admin_form_input admin_form_big_input" placeholder="example@gmail.com">
                <button class = "header-button" type = "submit">Search</button>
            </form> 
            
            <div v-for="item in users" class = "user_card">
                <div>Name:&nbsp;{{item.name  }}</div>
                <div>Email:&nbsp;{{item.email  }}</div>
                <div>Email verified at:&nbsp;{{item.email_verified_at  }}</div>
                <div>Created at:&nbsp;{{item.created_at  }}</div>
                <div>Updated at:&nbsp;{{item.updated_at  }}</div>
                <div>Role:&nbsp;{{item.role  }}</div>
                <hr>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {ref} from 'vue'
    import axios from 'axios';
    import AdminHeader from './AdminHeader.vue';

    const formData = new FormData()
    const input = ref(null)
    const users = ref(null)
    function submitForm(){
        formData.delete('input')
        formData.append('input', input.value)
        axios.post('/show', formData).then((response) =>{
            //console.log(response.data.user)
            users.value = response.data.user
        })
    }
</script>