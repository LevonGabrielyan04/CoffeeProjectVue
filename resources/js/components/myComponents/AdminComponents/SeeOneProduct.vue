<!-- <template>
    <div class = "main admin_panel_main">
        <div class = "center center_in_see_one">
            <div class = "form_at_center product_card2 user_card-no-border">
                <h1>See one product</h1>
                <form @submit.prevent="submitForm" action="{{ route('show_product.post') }}" method="POST" class="real_form product_form">
                <label>Product name:</label>
                 <input v-model="input" name = "input" class = "admin_form_input admin_form_big_input" placeholder="Lavazza">
                    <button class = "header-button" type = "submit">Search</button>
                 </form>  
            <div class = "box_at_center user_card-no-border ">
            <div class = "products-main">
                @foreach($product as $item)
                <div class = "product_card">
                    <div class="product_card-image_div">
                        <img class = "product_card-image" src="{{ asset("storage/".$item->image) }}">
                    </div>
                    <div class = "product_card-info">
                        <div class = "product_card-main_text font-syne">{{$item->name}}</div>
                        <div class = "product_card-secondary_text font-syne">{{ $item->description }}</div>
                        <div class = "product_card-price font-syne">${{ $item->price }}</div>
                    </div>
                    <a href = "{{ route('product', ['id' => $item->id]) }}" class = "product_card-link">
                        <button class = "font-syne product_card-button">Προσθήκη στην κάρτα</button>
                    </a>
                </div>
                @endforeach
            </div>
            <div class = "product_card">
                <div class="product_card-image_div">
                    <img class = "product_card-image" src="{{ asset("storage/".$product->image) }}">
                </div>
                <div class = "product_card-info">
                    <div class = "product_card-main_text font-syne">{{$product->name}}</div>
                    <div class = "product_card-secondary_text font-syne">{{ $product->description }}</div>
                    <div class = "product_card-price font-syne">${{ $product->price }}</div>
                </div>
                <a href = "{{ route('product', ['id' => $item->id]) }}" class = "product_card-link">
                    <button class = "font-syne product_card-button">Προσθήκη στην κάρτα</button>
                </a>
            </div>
    </div>
</div>
        </div>
    </div>
</template> -->
<script setup>
import axios from 'axios';

    const formData = new FormData()
    const input = new ref('')
    const imagePath = ref(import.meta.env.VITE_API_URL + "/storage/" + product.value.image);

    function submitForm(){
        formData.delete('input')
        formData.append('input',input.value)
        axios.get(route('show_product.post'), formData)
    }
</script>