<template>
<div>
<div class = "header admin-header">
    <div class = "header-bar-small-text-bar header-bar-small-text-bar-admin">
        <router-link :to="{name:'add-product'}" class = "link">
            <h1 class = "header-bar-small-text header-bar-small-text-admin">Create new product</h1>
        </router-link>
        <router-link :to="{name:'add-category'}" class = "link">
            <h1 class = "header-bar-small-text header-bar-small-text-admin">Create new category</h1>
        </router-link>
        <router-link :to="{name:'all-users'}" class = "link">
            <h1 class = "header-bar-small-text header-bar-small-text-admin">See all users</h1>
        </router-link>
        <router-link :to="{name:'one-user'}" class = "link">
            <h1 class = "header-bar-small-text header-bar-small-text-admin">See certain user</h1>
        </router-link>
    </div>
    <svg onclick="showdropdown()" id = "header_svg_open" aria-hidden="true" role="presentation" class="header_svg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z"></path></svg>
    <svg onclick="showdropdown()"  id = "header_svg_close" class="header_svg" style="display: none;" aria-hidden="true" role="presentation"  viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z"></path></svg>

</div>
        <div id="menu_dropdown" style="display: none;" class = "menu_dropdown">
            <div class = "">Αρχική</div>
            <div class = "">Εταιρεία</div>
            <div class = "">Roasting</div>
            <div class = "">Προϊόντα</div>
            <div class = "">Blog</div>
            <div class = "">Franchise</div>
            <div class = "">Επικοινωνία</div>
        </div>
</div>
</template>