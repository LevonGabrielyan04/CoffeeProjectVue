function filter_dropdown(){
    var div = document.getElementById("filter1_container");
    var svg = document.getElementById("filter_dropdown_btn");
    if(div.style.display !== "none"){
        div.style.display = "none";
        svg.style.transform = 'rotate(180deg)';
    }
    else{
        div.style.display = "initial";
        svg.style.transform = 'initial';
    }
}



function spin_the_svg(id){
    var svg = document.getElementById(id);
    if(svg.style.transform == 'rotate(180deg)'){
        svg.style.transform = 'initial';
    }
    else{
        svg.style.transform = 'rotate(180deg)';
    }
}

function add_plus_to_div(id){
    var the_div = document.getElementById(id);
    var all_divs = document.getElementsByClassName('sorting_dropdown-element');
    for(let div of all_divs){
        if(div.innerHTML[0] == '+'){
            div.innerHTML = div.innerHTML.slice(1);
        }
    }
    the_div.innerHTML = '+' + the_div.innerHTML;
}

function show_sorting_dropdown(){
    var div = document.getElementById("sorting_dropdown");

    if(div.style.display == "none"){
        div.style.display = "block";
    }
    else{
        div.style.display = "none";
    }
}

function showdropdown(){
    var div = document.getElementById("menu_dropdown");
    var svg_open = document.getElementById("header_svg_open");
    var svg_close = document.getElementById("header_svg_close");
    let width = screen.width;

if(div.style.display == "none"){
div.style.display = "flex";
svg_close.style.display = "initial";
svg_open.style.display = "none";
}
else{
div.style.display = "none";
svg_close.style.display = "none";
svg_open.style.display = "initial";
}
}