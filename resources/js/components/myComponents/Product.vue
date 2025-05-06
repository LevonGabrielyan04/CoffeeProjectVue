<template>
    <LoadingScreen :isLoading = "isLoading"></LoadingScreen>
    <div>
        <div id = "ribbon">
            <Ribbon v-if="ribbonContent" :products="ribbonContent.products" :totalPrice="ribbonContent.total_price"></Ribbon>
        </div>
        <div class = "main">
            <Header />
            <div class = "path_container">
                <span class = "product_path_first font-syne">Κύριος</span>
                <span class = "proudct_path_slash font-syne">/</span>
                <span class = "product_path_first font-syne">Καφές</span>
                <span class = "proudct_path_slash font-syne">/</span>
                <span class = "product_path_second font-syne">Espresso</span>
            </div>
            <div class = "product_card_big">
                <div class = "product_card-container">
                <img v-if="imagePath" class="product_page_image" :src="imagePath">
                <div class = "product_card_text font-syne">
                    <div class = "product_card-text-name_and_description font-syne">
                        <div v-if="product" class = "product_card-text-name">{{product.name}}</div>
                        <div v-if="product" class = "product_card-text-description">{{product.description  }}</div>
                    </div>
                    <div v-if="product" class = "product_card_big-price">${{product.price  }}</div>
                    <div class = "unknown_button_div">
                        <div class = "unknown_button_div-text">Συσκευασία</div>
                        <button v-if="product" class = "unknown_button_div-button">{{product.weight  }}γρ.</button>
                    </div>
                    <div>
                        <div class = "product_property">Υψόμετρο: </div>
                        <div v-if="product" class = "product_value">{{product.altitude  }}μ</div>
                    </div>
                    <div>
                        <div class = "product_property">Επεξεργασία: </div>
                        <div v-if="product" class = "product_value">{{product.processing  }}</div>
                    </div>
                    <div>
                        <div class = "product_property">Ποικιλία:</div>
                        <div v-if="product" class = "product_value">{{product.variety  }}</div>
                    </div>
                    <div>
                        <div class = "product_property">Ψήσιμο: </div>
                        <div v-if="product" class = "product_value">{{product.baking  }}</div>
                    </div>
                    <div>
                        <div class = "product_property">Τύπος άλεσης: </div>
                        <div v-if="product" class = "product_value">{{product.grinding  }}</div>
                    </div>

                    <div class = "selected_count">
                        <a v-if="user" @click = "addToCart( product.id, user.id)" id = "cart_button" class = "add_to_cart_button">Προσθήκη στην κάρτα</a>
                        <div class = "count_bar">
                            <button id = "button_minus" class = "coutn_bar-button" @click="decrease" type="button">-</button>
                            <span class = "selected_count_number" id = "selected_count">1</span>
                            <button id = "button_plus" class = "coutn_bar-button" @click = "increse" type="button">+</button>
                            <a v-if="product" :href = "route('payment', { id: product.id, quantity: 1})" class = "product_card-link">
                                <button class = "font-syne product_card-button">BUY NOW</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RecentlyViewed v-if="product_in_history" :product_in_history="product_in_history"></RecentlyViewed>
        
        <Footer />
        </div>
    </div>
</template>
<script setup>
    import {ref,onMounted} from 'vue'
    import axios from 'axios'
    import { useRoute } from 'vue-router'
    import Header from './Header.vue'
    import Footer from './Footer.vue'
    import RecentlyViewed from './RecentlyViewed.vue'
    import Ribbon from './Ribbon.vue'
    import LoadingScreen from './LoadingScreen.vue'

    var user = ref(null);
    axios.get("/user")
    .then((result)=>{
        if(result.data != '')
            user.value = result.data;
    })
    
    const urlRoute = useRoute();
    const productId = urlRoute.params.id;
    var product = ref(null);
    var product_in_history = ref(null);
    var imagePath = ref(null);
    const ribbonContent = ref(null)
    var isLoading = ref(true);
    axios.get('product',{
        params:{
            id: productId
        }
    }).then(res=>{
        product.value = res.data.product
        product_in_history.value = res.data.product_in_history
        console.log('the product: ',product.value);
        imagePath.value = import.meta.env.VITE_API_URL + "/storage/" + product.value.image;
        isLoading.value = false;
    })
    function increse(){
        const $span = $('#selected_count');
        $span.text(parseInt($span.text()) + 1);
        updateBuyNowLink();
    }

    function decrease() {
        const $span = $('#selected_count');
        if (parseInt($span.text()) > 1) {
            $span.text(parseInt($span.text()) - 1);
        updateBuyNowLink();
        }
    }


    function updateBuyNowLink() {
        const count = $('#selected_count').text();
        const originalHref = $('.product_card-link').attr('href').split('quantity=')[0];
        $('.product_card-link').attr('href', originalHref + 'quantity=' + count);
    }

    function addToCart(product_id, user_id){
            const $quantity = $('#selected_count').html();
            $.post('/add_to_cart',  {
                    id_product: product_id,
                    id_user: user_id,
                    count: $quantity,
                    _token: $('meta[name="csrf-token"]').attr('content')
                }, function(result) {
                    $("#cart_button").html(result.message);
                });
            $.get('/ribbon', function(data) {
                data = JSON.parse(data)
                console.log(data)   
                ribbonContent.value = {products: data.products, total_price: data.total_price}
                $('#ribbon').removeClass('d_none');
            });
            
            // setTimeout(function() {
            //     $('#ribbon').addClass('d_none');
            // }, 10000);
    }

    $(window).click(function() {
        $('#ribbon').addClass('d_none');
    });

    $('#ribbon').click(function(event){
        event.stopPropagation();
    });
    $('.selected_count').click(function(event){
        event.stopPropagation();
    });
</script>