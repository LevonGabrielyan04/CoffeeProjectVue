<template>
    <div class = "main admin_panel_main">
    <AdminHeader></AdminHeader>
    <div class = "center center-admin_panel">
        <div class = "form_at_center form_in_create">
            <form @submit.prevent="submitForm" method="POST" enctype="multipart/form-data" class="real_form">
            <div class = "form_line_group">
                <div class = "form_line">
                    <label class="product_form_label" >Name:</label>
                    <input v-model="form.name" name = "name" class = "admin_form_input" placeholder="Lavazza">
                    <span v-if="errors.name" class="text-red-600">{{ errors.name[0] }}</span>
                </div>
                <div class = "form_line">
                    <label class="product_form_label" >Category:</label>
                    <select v-model="form.category" name="category" class = "admin_form_input admin_select_input">
                        <option v-for="item in categories" :value="item.name">{{ item.name }}</option>
                    </select>
                    <span v-if="errors.category" class="text-red-600">{{ errors.category[0] }}</span>
                </div>
            </div>
                <div class = "form_line flex flex-col">
                    <label  class="product_form_label">Description:</label>
                    <textarea v-model="form.description" name = "description" class = "admin_form_input description_text_area" placeholder="Description"></textarea>
                    <span v-if="errors.description" class="text-red-600">{{ errors.description[0] }}</span>
                </div>
                <div class = "form_line flex flex-col">
                    <label  class="product_form_label">Price:</label>
                    <input v-model="form.price" name = "price" class = "admin_form_input w-[400px]" style="width: 400px;" placeholder="100$">
                    <span v-if="errors.price" class="text-red-600">{{ errors.price[0] }}</span>
                </div>
                <div class = "form_line_group">
                <div class = "form_line">
                    <label  class="product_form_label">Weight:</label>
                    <input v-model="form.weight" name = "weight" class = "admin_form_input" placeholder="300 gr.">
                    <span v-if="errors.weight" class="text-red-600">{{ errors.weight[0] }}</span>
                </div>
                <div class = "form_line">
                    <label  class="product_form_label">Altitude:</label>
                    <input v-model="form.altitude" name = "altitude" class = "admin_form_input" placeholder="2500m">
                    <span v-if="errors.altitude" class="text-red-600">{{ errors.altitude[0] }}</span>
                </div>
                </div>
                <div class = "form_line_group">
                <div class = "form_line">
                    <label  class="product_form_label">Processing:</label>
                    <input v-model="form.processing" name = "processing" class = "admin_form_input" placeholder="Wet processing">
                    <span v-if="errors.processing" class="text-red-600">{{ errors.processing[0] }}</span>
                </div>
                <div class = "form_line">
                    <label  class="product_form_label">Variety:</label>
                    <input v-model="form.variety" name = "variety" class = "admin_form_input" placeholder="Arabica">
                    <span v-if="errors.variety" class="text-red-600">{{ errors.variety[0] }}</span>
                </div>
                </div>
                <div class = "form_line_group">
                    <div class = "form_line">
                        <label  class="product_form_label">Baking:</label>
                        <input v-model="form.baking" name = "baking" class = "admin_form_input" placeholder="Strong">
                        <span v-if="errors.baking" class="text-red-600">{{ errors.baking[0] }}</span>
                    </div>
                    <div class = "form_line">
                        <label class="product_form_label" >Grinding Type:</label>
                        <input v-model="form.grinding" name = "grinding" class = "admin_form_input" placeholder="Big grains">
                        <span v-if="errors.grinding" class="text-red-600">{{ errors.grinding[0] }}</span>
                    </div>
                </div>
                    <div class = "product_form_buttons">
                        <img id="blah" src="#" alt="your image" class= "image_preview d_none"/>
                        <label for="image" class = "image-upload-label w-[20px]" ><svg style="width: 20px; -webkit-filter: invert(100%); filter: invert(100%);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.2 216H224v80c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-80H94.8c-14.3 0-21.4-17.3-11.3-27.4l96.4-95.7c6.7-6.6 17.4-6.6 24 0l96.4 95.7c10.2 10.1 3 27.4-11.3 27.4zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"/></svg>
                            Upload image</label>
                        <input @change="changeFile" name="image" accept="image/*" class = "image_input"  type='file' id="image" />
                        <span v-if="errors.image" class="text-red-600">{{ errors.image[0] }}</span>
                        <button class = "header-button" type="submit">Create</button>
                    </div>
            </form>
            
        </div>
    </div>
</div>
</template>
<script setup>
    import axios from 'axios';
    import {ref} from 'vue'
    import AdminHeader from './AdminHeader.vue';

    const errors = ref({})
    const errorMessages = ref(null)
    const formData = new FormData();
    const form = {
        name: "",
        category: "",
        description: "",
        price: null,
        weight: null,
        altitude: null,
        processing: "",
        variety: "",
        baking:"",
        grinding:"",
        image:null
    }
    const categories = ref(null)
    axios.get('/adminPanel').then((res) => {
        categories.value = res.data.categories;
    });

    function submitForm(){
        for(var key in form){
            formData.append(key, form[key]);
        }

        axios.post(route('store'), formData).catch((res)=> {
            errors.value = res.response.data.errors
        })
    }

    function changeFile(e) {
        form.image = e.target.files[0]

        if (form.image) {
            blah.classList.remove("d_none")
            blah.src = URL.createObjectURL(form.image)
        }
    }
</script>