let _slideUp = (target, duration) => {
  target.style.transitionProperty = "height, margin, padding"; /* [1.1] */
  target.style.transitionDuration = duration + "ms"; /* [1.2] */

  target.style.height = target.offsetHeight + "px"; /* [3] */
  target.offsetHeight;
  target.style.overflow = "hidden"; /* [7] */
  target.style.height = 0; /* [4] */
  target.style.paddingTop = 0; /* [5.1] */
  target.style.paddingBottom = 0; /* [5.2] */
  target.style.marginTop = 0; /* [6.1] */
  target.style.marginBottom = 0; /* [7.2] */

  window.setTimeout(() => {
    target.style.display = "none"; /* [8] */
    target.style.removeProperty("height"); /* [9] */
    target.style.removeProperty("padding-top"); /* [10.1] */
    target.style.removeProperty("padding-bottom"); /* [10.2] */
    target.style.removeProperty("margin-top"); /* [11.1] */
    target.style.removeProperty("margin-bottom"); /* [11.2] */
    target.style.removeProperty("overflow"); /* [12] */
    target.style.removeProperty("transition-duration"); /* [13.1] */
    target.style.removeProperty("transition-property"); /* [13.2] */
  }, duration);
};

let _slideDown = (target, duration) => {
  target.style.removeProperty("display"); /* [1] */
  let display = window.getComputedStyle(target).display;
  if (display === "none") {
    /* [2] */
    display = "block";
  }
  target.style.display = display;
  let height = target.offsetHeight; /* [3] */
  target.style.overflow = "hidden"; /* [7] */
  target.style.height = 0; /* [4] */
  target.style.paddingTop = 0; /* [5.1] */
  target.style.paddingBottom = 0; /* [5.2] */
  target.style.marginTop = 0; /* [6.1] */
  target.style.marginBottom = 0; /* [6.2] */
  target.offsetHeight;

  target.style.transitionProperty = "height, margin, padding"; /* [9.1] */
  target.style.transitionDuration = duration + "ms"; /* [9.2] */
  target.style.height = height + "px"; /* [10] */
  target.style.removeProperty("padding-top"); /* [11.1] */
  target.style.removeProperty("padding-bottom"); /* [11.2] */
  target.style.removeProperty("margin-top"); /* [12.1] */
  target.style.removeProperty("margin-bottom"); /* [12.2] */
  window.setTimeout(() => {
    target.style.removeProperty("height"); /* [13] */
    target.style.removeProperty("overflow"); /* [14] */
    target.style.removeProperty("transition-duration"); /* [15.1] */
    target.style.removeProperty("transition-property"); /* [15.2] */
  }, duration);
};

let _slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === "none") {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_mobile");
  
 

} else {
  document.body.classList.add("_pc");
}

function ibg() {
  let ibg = document.querySelectorAll("._ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();

//Анимация при скоре (добавление класа при достижении 1/4 блока)
const anim_items = document.querySelectorAll("._anim-items");
if (anim_items.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < anim_items.length; index++) {
      const animElement = anim_items[index];
      const animElementHeigt = animElement.offsetHeight;
      const animItemOffset = offset(animElement).top;
      const animStart = 4;

      let animStartPoint =
        document.documentElement.clientHeight - animElementHeigt / animStart;
      if (animElementHeigt > document.documentElement.clientHeight) {
        animStartPoint =
          document.documentElement.clientHeight -
          document.documentElement.clientHeight / animStart;
      }
      if (
        pageYOffset > animItemOffset - animStartPoint &&
        pageYOffset < animItemOffset + animElementHeigt
      ) {
        animElement.classList.add("_active");
      } else {
        if (!animElement.classList.contains("_noAnimAgain"))
          animElement.classList.remove("_active");
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

(function($,window){$.fn.textWidth=function(){var html_calc=$("<span>"+$(this).html()+"</span>");html_calc.css("font-size",$(this).css("font-size")).hide();html_calc.prependTo("body");var width=html_calc.width();html_calc.remove();if(width==0){var total=0;$(this).eq(0).children().each(function(){total+=$(this).textWidth()});return total}return width};$.fn.textHeight=function(){var html_calc=$("<span>"+$(this).html()+"</span>");html_calc.css("font-size",$(this).css("font-size")).hide();html_calc.prependTo("body");var height=html_calc.height();html_calc.remove();return height};Array.isArray=function(obj){return Object.prototype.toString.call(obj)==="[object Array]"};String.prototype.getCodePointLength=function(){return this.length-this.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g).length+1};String.fromCodePoint=function(){var chars=Array.prototype.slice.call(arguments);for(var i=chars.length;i-->0;){var n=chars[i]-65536;if(n>=0)chars.splice(i,1,55296+(n>>10),56320+(n&1023))}return String.fromCharCode.apply(null,chars)};$.fn.rate=function(options){if(options===undefined||typeof options==="object"){return this.each(function(){if(!$.data(this,"rate")){$.data(this,"rate",new Rate(this,options))}})}else if(typeof options==="string"){var args=arguments;var returns;this.each(function(){var instance=$.data(this,"rate");if(instance instanceof Rate&&typeof instance[options]==="function"){returns=instance[options].apply(instance,Array.prototype.slice.call(args,1))}if(options==="destroy"){$(instance.element).off();$.data(this,"rate",null)}});return returns!==undefined?returns:this}};function Rate(element,options){this.element=element;this.settings=$.extend({},$.fn.rate.settings,options);this.set_faces={};this.build()}Rate.prototype.build=function(){this.layers={};this.value=0;this.raise_select_layer=false;if(this.settings.initial_value){this.value=this.settings.initial_value}if($(this.element).attr("data-rate-value")){this.value=$(this.element).attr("data-rate-value")}var selected_width=this.value/this.settings.max_value*100;if(typeof this.settings.symbols[this.settings.selected_symbol_type]==="string"){var symbol=this.settings.symbols[this.settings.selected_symbol_type];this.settings.symbols[this.settings.selected_symbol_type]={};this.settings.symbols[this.settings.selected_symbol_type]["base"]=symbol;this.settings.symbols[this.settings.selected_symbol_type]["selected"]=symbol;this.settings.symbols[this.settings.selected_symbol_type]["hover"]=symbol}var base_layer=this.addLayer("base-layer",100,this.settings.symbols[this.settings.selected_symbol_type]["base"],true);var select_layer=this.addLayer("select-layer",selected_width,this.settings.symbols[this.settings.selected_symbol_type]["selected"],true);var hover_layer=this.addLayer("hover-layer",0,this.settings.symbols[this.settings.selected_symbol_type]["hover"],false);this.layers["base_layer"]=base_layer;this.layers["select_layer"]=select_layer;this.layers["hover_layer"]=hover_layer;$(this.element).on("mousemove",$.proxy(this.hover,this));$(this.element).on("click",$.proxy(this.select,this));$(this.element).on("mouseleave",$.proxy(this.mouseout,this));$(this.element).css({"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"});if(this.settings.hasOwnProperty("update_input_field_name")){this.settings.update_input_field_name.val(this.value)}};Rate.prototype.addLayer=function(layer_name,visible_width,symbol,visible){var layer_body="<div>";for(var i=0;i<this.settings.max_value;i++){if(Array.isArray(symbol)){if(this.settings.convert_to_utf8){symbol[i]=String.fromCodePoint(symbol[i])}layer_body+="<span>"+symbol[i]+"</span>"}else{if(this.settings.convert_to_utf8){symbol=String.fromCodePoint(symbol)}layer_body+="<span>"+symbol+"</span>"}}layer_body+="</div>";var layer=$(layer_body).addClass("rate-"+layer_name).appendTo(this.element);$(layer).css({width:visible_width+"%",height:$(layer).children().eq(0).textHeight(),overflow:"hidden",position:"absolute",top:0,display:visible?"block":"none","white-space":"nowrap"});$(this.element).css({width:$(layer).textWidth()+"px",height:$(layer).height(),position:"relative",cursor:this.settings.cursor});return layer};Rate.prototype.updateServer=function(){if(this.settings.url!=undefined){$.ajax({url:this.settings.url,type:this.settings.ajax_method,data:$.extend({},{value:this.getValue()},this.settings.additional_data),success:$.proxy(function(data){$(this.element).trigger("updateSuccess",[data])},this),error:$.proxy(function(jxhr,msg,err){$(this.element).trigger("updateError",[jxhr,msg,err])},this)})}};Rate.prototype.getValue=function(){return this.value};Rate.prototype.hover=function(ev){var pad=parseInt($(this.element).css("padding-left").replace("px",""));var x=ev.pageX-$(this.element).offset().left-pad;var val=this.toValue(x,true);if(val!=this.value){this.raise_select_layer=false}if(!this.raise_select_layer&&!this.settings.readonly){var visible_width=this.toWidth(val);this.layers.select_layer.css({display:"none"});if(!this.settings.only_select_one_symbol){this.layers.hover_layer.css({width:visible_width+"%",display:"block"})}else{var index_value=Math.floor(val);this.layers.hover_layer.css({width:"100%",display:"block"});this.layers.hover_layer.children("span").css({visibility:"hidden"});this.layers.hover_layer.children("span").eq(index_value!=0?index_value-1:0).css({visibility:"visible"})}}};Rate.prototype.select=function(ev){if(!this.settings.readonly){var old_value=this.getValue();var pad=parseInt($(this.element).css("padding-left").replace("px",""));var x=ev.pageX-$(this.element).offset().left-pad;var selected_width=this.toWidth(this.toValue(x,true));this.setValue(this.toValue(selected_width));this.raise_select_layer=true}};Rate.prototype.mouseout=function(){this.layers.hover_layer.css({display:"none"});this.layers.select_layer.css({display:"block"})};Rate.prototype.toWidth=function(val){return val/this.settings.max_value*100};Rate.prototype.toValue=function(width,in_pixels){var val;if(in_pixels){val=width/this.layers.base_layer.textWidth()*this.settings.max_value}else{val=width/100*this.settings.max_value}var temp=val/this.settings.step_size;if(temp-Math.floor(temp)<5e-5){val=Math.round(val/this.settings.step_size)*this.settings.step_size}val=Math.ceil(val/this.settings.step_size)*this.settings.step_size;val=val>this.settings.max_value?this.settings.max_value:val;return val};Rate.prototype.getElement=function(layer_name,index){return $(this.element).find(".rate-"+layer_name+" span").eq(index-1)};Rate.prototype.getLayers=function(){return this.layers};Rate.prototype.setFace=function(value,face){this.set_faces[value]=face};Rate.prototype.setAdditionalData=function(data){this.settings.additional_data=data};Rate.prototype.getAdditionalData=function(){return this.settings.additional_data};Rate.prototype.removeFace=function(value){delete this.set_faces[value]};Rate.prototype.setValue=function(value){if(!this.settings.readonly){if(value<0){value=0}else if(value>this.settings.max_value){value=this.settings.max_value}var old_value=this.getValue();this.value=value;var change_event=$(this.element).trigger("change",{from:old_value,to:this.value});$(this.element).find(".rate-face").remove();$(this.element).find("span").css({visibility:"visible"});var index_value=Math.ceil(this.value);if(this.set_faces.hasOwnProperty(index_value)){var face="<div>"+this.set_faces[index_value]+"</div>";var base_layer_element=this.getElement("base-layer",index_value);var select_layer_element=this.getElement("select-layer",index_value);var hover_layer_element=this.getElement("hover-layer",index_value);var left_pos=base_layer_element.textWidth()*(index_value-1)+(base_layer_element.textWidth()-$(face).textWidth())/2;$(face).appendTo(this.element).css({display:"inline-block",position:"absolute",left:left_pos}).addClass("rate-face");base_layer_element.css({visibility:"hidden"});select_layer_element.css({visibility:"hidden"});hover_layer_element.css({visibility:"hidden"})}if(!this.settings.only_select_one_symbol){var width=this.toWidth(this.value);this.layers.select_layer.css({display:"block",width:width+"%",height:this.layers.base_layer.css("height")});this.layers.hover_layer.css({display:"none",height:this.layers.base_layer.css("height")})}else{var width=this.toWidth(this.settings.max_value);this.layers.select_layer.css({display:"block",width:width+"%",height:this.layers.base_layer.css("height")});this.layers.hover_layer.css({display:"none",height:this.layers.base_layer.css("height")});this.layers.select_layer.children("span").css({visibility:"hidden"});this.layers.select_layer.children("span").eq(index_value!=0?index_value-1:0).css({visibility:"visible"})}$(this.element).attr("data-rate-value",this.value);if(this.settings.change_once){this.settings.readonly=true}this.updateServer();var change_event=$(this.element).trigger("afterChange",{from:old_value,to:this.value});if(this.settings.hasOwnProperty("update_input_field_name")){this.settings.update_input_field_name.val(this.value)}}};Rate.prototype.increment=function(){this.setValue(this.getValue()+this.settings.step_size)};Rate.prototype.decrement=function(){this.setValue(this.getValue()-this.settings.step_size)};$.fn.rate.settings={max_value:5,step_size:.5,initial_value:0,symbols:{utf8_star:{base:"☆",hover:"★",selected:"★"},utf8_hexagon:{base:"⬡",hover:"⬢",selected:"⬢"},hearts:"&hearts;",fontawesome_beer:'<i class="fas fa-beer"></i>',fontawesome_star:{base:'<i class="far fa-star"></i>',hover:'<i class="fas fa-star"></i>',selected:'<i class="fas fa-star"></i>'},utf8_emoticons:{base:[128549,128531,128530,128516],hover:[128549,128531,128530,128516],selected:[128549,128531,128530,128516]}},selected_symbol_type:"utf8_star",convert_to_utf8:false,cursor:"default",readonly:false,change_once:false,only_select_one_symbol:false,ajax_method:"POST",additional_data:{}}})(jQuery,window);

window.onload = () => {
  const headerBurgerIcon = document.querySelector(".header__burger");
  const headerBurgerMenu = document.querySelector(".header__menu");
  const headerArrows = document.querySelectorAll(".header__menu-arrow");
  const allVideos = document.querySelectorAll(".sub-video__video video");
  const mainVideo = document.querySelector(".videos__main-video video");
  const customSelects = document.querySelectorAll(".custom-select__top");
  const selectPicks = document.querySelectorAll(".custom-select__item");

  //Шапка
  if (headerBurgerIcon) {
    headerBurgerIcon.addEventListener("click", function () {
      headerBurgerIcon.classList.toggle("_active");
      headerBurgerMenu.classList.toggle("_active");
    });

    for (const arrow of headerArrows) {
      arrow.addEventListener("click", function () {
        arrow.nextElementSibling.classList.toggle("_shown");
        arrow.classList.toggle("_active");
      });
    }
  }
  

  //Видео js
  if (mainVideo) {
    if (allVideos.length > 0) {
      mainVideo.setAttribute("src", allVideos[0].getAttribute("src"));
    }
    for (const video of allVideos) {
      video.addEventListener("click", function () {
        const src = video.getAttribute("src");
        mainVideo.setAttribute("src", src);
      });
    }
  }

  if (customSelects.length > 0) {
    for (const select of customSelects) {
      select.addEventListener("click", () => {
        _slideToggle(select.nextElementSibling, 800);
      });
    }

    for (const pick of selectPicks) {
      pick.addEventListener("click", () => {
        if (pick.closest("ul")) {
          pick
            .closest("ul")
            .querySelector(".custom-select__item.picked")
            ?.classList.remove("picked");
        }
        pick.classList.add("picked");
      });
    }
  }

  new Swiper(".travels__swiper", {
    //Отстутпы между слайдами
    spaceBetween: 30,
    //Слайды на пролисьывание (сколько будет листаться)
    slidesPerGroup: 1,
    //Сколько слайдов будет видно
    slidesPerView: 2.5,

    // centeredSlides:true
    speed: 600,
    //Возможные варианты:flip slide cube coverflow fade
    effect: "slide",
    loop: true,
    navigation: {
      nextEl: ".travels__slider-arrow.r",
      prevEl: ".travels__slider-arrow.l",
    },
    //Точки буллиты
    // pagination:{
    //     el:'.class',
    //     clickable:true,
    //
    // },
    grabCursor: false,
    keyboard: {
      // Включаем управление клавиатурой
      enabled: true,
      //Только при поле зрения
      onlyInViewport: true,
      pageUpDown: true,
    },
    initialSlide: 2,
    centeredSlides: true,
    autoHeight: false,
    breakpoints: {
      0: {
        slidesPerView: 1.3,
      },
      450: {
        slidesPerView: 1.8,
      },
      700: {
        slidesPerView: 2.5,
      },
    },

    observer: true,
  });

  new Swiper(".travel-categories__swiper", {
    //Отстутпы между слайдами
    spaceBetween: 30,
    //Слайды на пролисьывание (сколько будет листаться)
    slidesPerGroup: 1,
    //Сколько слайдов будет видно
    slidesPerView: 3.9,
    //Кол-во колонок

    centeredSlides: true,
    speed: 600,
    //Возможные варианты:flip slide cube coverflow fade
    effect: "slide",
    loop: true,
    navigation: {
      nextEl: ".travel-categories__arrow.r",
      prevEl: ".travel-categories__arrow.l",
    },
    //Точки буллиты
    // pagination:{
    //     el:'.class',
    //     clickable:true,
    //
    // },
    grabCursor: true,
    keyboard: {
      // Включаем управление клавиатурой
      enabled: true,
      //Только при поле зрения
      onlyInViewport: true,
      pageUpDown: true,
    },
    //  autoHeight: true,
    breakpoints: {
      0: {
        slidesPerView: 1.3,
      },
      767.98: {
        slidesPerView: 3,
      },
      991.98: {
        slidesPerView: 3.8,
      },
    },

    observer: true,
  });

  new Swiper(".clients__swiper", {
    //Отстутпы между слайдами
    spaceBetween: 0,
    //Слайды на пролисьывание (сколько будет листаться)
    slidesPerGroup: 1,
    //Сколько слайдов будет видно
    slidesPerView: 1,
    //Кол-во колонок

    // centeredSlides:true
    speed: 600,
    //Возможные варианты:flip slide cube coverflow fade
    effect: "slide",
    loop: true,
    navigation: {
      nextEl: ".clients__arrow.r",
      prevEl: ".clients__arrow.l ",
    },

    pagination: {
      el: ".clients__pagination",
      clickable: true,
    },
    //  grabCursor: true,
    keyboard: {
      // Включаем управление клавиатурой
      enabled: true,
      //Только при поле зрения
      onlyInViewport: true,
      pageUpDown: true,
    },
    autoHeight: true,
    breakpoints: {
      320: {},
      990: {},
    },

    observer: true,
  });

  if (document.querySelector(".tourist-slide__rating")) {
    // Options
    var options = {
      max_value: 5,
      step_size: 0.5,
      initial_value: 0,
      selected_symbol_type: "utf8_star", // Must be a key from symbols
      cursor: "default",
      readonly: true,
      change_once: false, // Determines if the rating can only be set once
    };

    $(".tourist-slide__rating").rate(options);
  }

  if (document.querySelector("#datepicker")) {
    const myDatePicker = MCDatepicker.create({
      el: "#datepicker",
      dateFormat: "MMM-DD-YYYY",
    });
  }
};
 

