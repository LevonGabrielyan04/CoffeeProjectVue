<template>
    <div class = "main admin_panel_main">
        <AdminHeader />
        <div class = "center">
            <div class = "form_at_center all_users">
                <h1>All Users</h1>
                <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                <tr v-for="user in users">
                        <td>{{user.name  }}</td>
                        <td>{{user.email  }}</td>
                        <td>{{user.role  }}</td>
                </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
    import axios from 'axios';
    import AdminHeader from './AdminHeader.vue';
    import {ref} from 'vue'

    const users = ref(null)

    axios.get('/index').then((res) => {
        console.log(res.data.users);
        users.value = res.data.users
    });
</script>