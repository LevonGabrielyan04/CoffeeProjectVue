<template>
    <div class = "recently_viewed" v-if="product_in_history != {}">
        <div class = "recently_viewed-span font-syne">Δοκιμάστε επίσης</div>
            <div class = "recently_viewed-products">
                <div class="swiper">
                    <div class="swiper-wrapper">
                        <div v-for="item in product_in_history" class="swiper-slide">
                            <div class = "product_card">
                            <div class="product_card-image_div">
                                <img class = "product_card-image" :src="imagePath(item.image)">
                                <img class = "product_card-image" src="">
                            </div>
                            <div class = "product_card-info">
                                <div class = "product_card-main_text font-syne">{{ item.name }}</div>
                                <div class = "product_card-secondary_text font-syne">{{item.description.substring(0, 100) + (item.description.length > 100 ? "..." : "")}}</div>
                                <div class = "product_card-price font-syne">{{ item.price}}</div>
                            </div>
                            <router-link  class = "product_card-link" :to="{ name: 'product', params: { id: item.id } }"  >
                                <button class = "font-syne product_card-button">Προσθήκη στην κάρτα</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script setup>
    const props = defineProps({
        product_in_history:{
            type: Object,
            default: {}
        }
    })
    function imagePath(image_part_path) {
        return "http://127.0.0.1:8000/" + "storage/" + image_part_path;
    }

    var swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        breakpoints: {
    0: {
      navigation: {
        enabled: false,
      },
    },

    1400: {
      slidesPerView: '4'
    },

    800: {
      slidesPerView: '3'
    },
  },


      });
  
      function getDirection() {
        var windowWidth = window.innerWidth;
        var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';
  
        return direction;
      }
    
</script>