<template>
    <div class = "filters-container">
    <div class = "filters">
        <div class = "filter-main-span">
            <span >Φίλτρα</span>
        </div>
        <div class = "real-filter-container">
            <div class = "filter1">
            <div class = "filter1-dropdown">
                <span class = "filter-1-secondary-span">Κατηγορία</span>
                <svg xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;" id="filter_dropdown_btn" onclick="filter_dropdown()" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
            </div>
            <div class = "filter1-lines-container" id = "filter1_container">
                <div v-for="item in props.categories" class="filter1-line" style="margin-top: 12px;">
                    <div class="filter1-line-left-part">
                        <input 
                            :id="item.name + '_input'" 
                            class="filter1-checkbox" 
                            type="checkbox" 
                            @change="checkbox(item.name)"
                        >
                        <span class="filter1-text">{{ item.name }}</span>
                    </div>
                    <span class="filter1-line-right-part filter1-text"></span>
                </div>
            </div>
            </div>
            <div class = "price-filter">
                <span class = "span-in-price-filter">Εύρος τιμής</span>
                <div class = "real-price-filter">
                    <div class = price-input-div>
                        <span class = "secondary_span_in_price">From</span>
                        <input id = "price_from" class = "price-input" @change="filter_by_price" value="10$">
                    </div>
                    <div class = price-input-div>
                        <span class = "secondary_span_in_price">To</span>
                        <input id = "price_to" class = "price-input" @change="filter_by_price"  value="50$">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class = "container">
        <div class = "filter-navbar">
            <div class = "filter-navbar-left">
                <div class = "filter-navbar-left">
                    <div class = "filter-div">Εφαρμοσμένο φίλτρο</div>
                    <div v-for="item in props.categories" :id = "item.name" style="display: none;" class = "filter-selection">
                        <div name="value" class = "font-syne">{{ item.name }}</div>
                        <svg style="cursor:pointer" @click="checkbox(item.name)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6.75824 17.2426L12.0009 12M12.0009 12L17.2435 6.75739M12.0009 12L6.75824 6.75739M12.0009 12L17.2435 17.2426" stroke="#727272" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                    </div>
                </div>
            </div>
            <div class = "filter-navbar-right font-syne">
                <div class = "filter-div" style="width: fit-content !important;">Ταξινόμηση κατά</div>
                <div style="position: relative;">
                    <button class = "sorting_button font-syne" type="button" onclick="show_sorting_dropdown()">Δημοτικότητα<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="#727272" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg></button>
                    <div id="sorting_dropdown" style="display: none;" class="sorting_dropdown">
                        <div id="sort_by_price_div" @click="do_some_magic('sorting_svg1','sort_by_price_div')" class="sorting_dropdown-element">sort by price &nbsp;<svg id="sorting_svg1" style="width: 25px;filter: invert(20%) sepia(52%) saturate(2387%) hue-rotate(329deg) brightness(102%) contrast(102%);" data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"/></svg></div>
                        <div id="sort_by_date_div" @click="do_some_magic('sorting_svg2','sort_by_date_div')" class="sorting_dropdown-element">sort by date&nbsp;<svg id="sorting_svg2"  style="width: 25px;filter: invert(20%) sepia(52%) saturate(2387%) hue-rotate(329deg) brightness(102%) contrast(102%);" data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"/></svg></div>
                    </div>
                </div>
            </div>
        </div>
        <ProductList :products="localProducts"></ProductList>
        <div class = "products-navigation">
            <router-link  id = "previous" :to="{ name: 'user_index', params: { page: '' } }">
                <button class = "products-navigation-button font-syne">Προηγούμενος</button>
            </router-link>
            <span class="pages_bar">
                <router-link 
                    :to="{ name: 'user_index', params: { page: 1 } }" 
                    class="pages_bar-link pages_bar-link_selected font-syne"
                >1</router-link>
                
                <template v-if="props.pageCount >= 2">
                    <router-link 
                        v-for="i in Math.min(2, props.pageCount - 1)" 
                        :key="i"
                        :to="{ name: 'user_index', params: { page: i + 1 } }" 
                        class="pages_bar-link font-syne"
                    >{{ i + 1 }}</router-link>
                </template>
                
                <span v-if="props.pageCount > 6" class="pages_bar-dots">...</span>
                
                <template v-if="props.pageCount > 4">
                    <router-link 
                        v-for="i in Math.min(2, props.pageCount - 4)" 
                        :key="i + Math.max(props.pageCount - 2, 4)"
                        :to="{ name: 'user_index', params: { page: i + Math.max(props.pageCount - 2, 4) } }" 
                        class="pages_bar-link font-syne"
                    >{{ i + Math.max(props.pageCount - 2, 4) }}</router-link>
                </template>
            </span>
            <router-link id = "next" :to="{ name: 'user_index', params: { page: 2 } }">
                <button class = "products-navigation-button font-syne">Επόμενος</button>
            </router-link>
        </div>
    </div>
</div>
</template>
<script setup>
    import {ref, onMounted,toRef,watch,nextTick } from 'vue'
    import axios from 'axios'
    import ProductList from './ProductList.vue'
    import { useRoute } from 'vue-router'

    const props = defineProps({
        pageCount:{
            type: Number,
            required: true
        },
        categories:{
            type: Array,
            required: true
        },
        products:{
            type: Object,
            required: true
        },
        page:{
            type: [String, Number],
            default: 1
        }
    })

    var localProducts = ref(props.products)
    const route = useRoute()

    onMounted(() => {
        index_onload(props.pageCount,1);
    })

    watch(() => props.page, async (newVal, oldVal) => {
    await nextTick();
    index_onload(props.pageCount, Number(newVal));
  });

    watch(()=> props.products, (newVal, oldVal)=>{
        localProducts.value = newVal
    })


    function do_some_magic(svg_id,div_id){
        spin_the_svg(svg_id);
        add_plus_to_div(div_id);
        var uri_to_plus;
        var svg_id;
        if(div_id == 'sort_by_price_div'){
            uri_to_plus = "show_sorted"
            svg_id = "sorting_svg1";
        }
        else if(div_id == 'sort_by_date_div'){
            uri_to_plus = "show_sorted_by_date"
            svg_id = "sorting_svg2";
        }
            var url;
            if(document.getElementById(svg_id).style.transform == 'rotate(180deg)'){

                var url = new URL(window.location.href);
                url.pathname = uri_to_plus + url.pathname;
                url.searchParams.append('sort_type', 'DESC');
            }else{
                var url = new URL(window.location.href);
                url.pathname = uri_to_plus + url.pathname;
                url.searchParams.append('sort_type', 'ASC');
            }
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Pointer",data.products)
                    localProducts.value = data.products;
                })
                .catch(err => {
                    console.error('Error:', err);
                });
        
    }

    var options = [];
    function checkbox(selection){
        var items = document.getElementsByName('value');
        for(let item of items){
            if(item.innerHTML === selection){
                if(document.getElementById(selection).style.display === "none"){
                    document.getElementById(selection).style.display = "flex";
                    options.push(selection);
                }
                else{
                    document.getElementById(selection).style.display = "none";
                    document.getElementById(selection + "_input").checked = false;
                    options = options.filter(item => item !== selection);
                }
            }
        }
        var a = new URL(window.location.href);
        a.pathname = "/filter_data" + a.pathname;
        
        fetch(a.toString(), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(options)
        }).then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.products.data)
            localProducts.value = data.products.data; 
        })
        .catch(err => {
            console.error('Error:', err);
        });
    }

    function filter_by_price(){
        var input_from = document.getElementById("price_from");
        var input_to = document.getElementById("price_to");

        var options2 = {from: input_from.value, to: input_to.value};

        fetch(window.location.href + "filter_data_by_price", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(options2)
        }).then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.products)
            localProducts.value = data.products
        })
        .catch(err => {
            console.error('Error:', err);
        });
    }

    function index_onload(page_count,page){ 
        if(!page)       
            page = 1
        var next = document.getElementById('next');
        var previous = document.getElementById('previous');
        const selected = document.getElementsByClassName('pages_bar-link_selected')[0];
        var numbers = document.getElementsByClassName('pages_bar-link');
        const urlParams = new URLSearchParams(window.location.search);
        
        const currentPage = page;
    
        const url = new URL(next.href);
        url.searchParams.set('page', Math.min(currentPage + 1,page_count));
        next.href = url.toString();

        const url2 = new URL(previous.href);
        url2.searchParams.set('page', Math.max(currentPage - 1,1));
        previous.href = url2.toString();
        

        const selected_number = page;
        console.log('cccccccc', selected_number);
        
        for(var num of numbers){
            num.classList.remove("pages_bar-link_selected");
            if(parseInt(num.innerHTML) == selected_number){
                num.classList.add("pages_bar-link_selected");
            }
        } 
    }
</script>