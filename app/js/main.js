"use strict";



(function() {
	$(function() {



		/*AOS*/
		AOS.init({
			offset: 100,
			once: true,
			duration: 1100,
			delay: 150
		});
		setTimeout(function() { AOS.refresh(); }, 1);


		/* SELECT2 */
		if ( $(".js-select").length )
			$(".js-select").select2({
				placeholder: "Выберите...",
				// ajax: {
				//   url: 'https://api.github.com/search/repositories',
				//   dataType: 'json'
				//   // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
				// },
				allowClear: false
			});
		
		if ( $(".js-select").length )
		$(".js-select.search-hide").select2({
			minimumResultsForSearch: Infinity
		});


		/*FANCYBOX*/
		if ($("[data-fancybox]").length != 0)
			$("[data-fancybox]").fancybox({
				afterShow: function(instance, current) {},
				animationEffect : "zoom",
				animationDuration : 800,
				thumbs : {
					autoStart   : true
				},
				touch : false,
				transitionDuration : 366,
				transitionEffect: "zoom-in-out"
			});
		// SMOTHSCROLL-LINK
		smoothScroll.init({
			easing: 'easeInOutCubic',
			offset: 85
		});
		/*ELEVATEZOOM*/
		if ( !checkSm() && $("[data-zoom-image]:not([group])").length )
			var x = $("[data-zoom-image]:not([group])").elevateZoom({
				scrollZoom: true,
				zoomWindowFadeIn: 500,
				zoomWindowFadeOut: 500,
				lensFadeIn: 300,
				lensFadeOut: 300,
				//cursor: 'pointer', 
				tint: true,
				tintColour: '#000',
				tintOpacity: 0.5,
				//zoomType        : "lens",
				//lensShape : "round",
				//lensSize    : 200,
				imageCrossfade: true,
				easing: true
			});


		//MIN-MENU
		$("#min-menu").mmenu({
			extensions: [
				"wrapper-bg", // wrapper-bg black
				//"theme-dark",
				"theme-white",
				//"fullscreen",
				"listview-50",
				"fx-panels-slide-up",
				"fx-listitems-drop",
				"border-offset",
				"position-front",
				"position-right"
			],
			navbar: {
				title: "Меню"
			},
			navbars: [{
					height: 2,
					content: [
						'<div class="search-nav-content col-md-3 p-l-offset color-black">'+
						  '<form method="post" action="http://demo.mainstream.uz/search.php">'+
						    '<div class="col-md-12 search-input">'+
						      '<input type="text" name="" id="" placeholder="Поиск" style="height: 35px;">'+
						    	'<button type="submit"><i class="icm-magnifier"></i></button>'+
						    '</div>'+
						  '</form>'+
						'</div>'
					]
				},
				{
					content: ["prev", "title"]
				}
			]
		}, {});









		/*FLIKITY*/
		function flickityPrevNext(className, classPrevNext) {
			var carouselWrapper = $(className);
			for (var i = 0; i < carouselWrapper.length; i++) {
				var crs = $(carouselWrapper[i]);
				var carousel = crs.find(".carousel-items");
				var carouselPrevNext = $(classPrevNext).length ? $(classPrevNext) : crs.find(".carousel-prev-next");
				var btnNext = carouselPrevNext.find(".next");
				var btnPrev = carouselPrevNext.find(".prev");
				var flkty = carousel.data("flickity");
				var selected;
				var that = this;
				btnNext.on("click", carousel, function(e) {
					e.data.flickity("next", true);
				});

				btnPrev.on("click", carousel, function(e) {
					e.data.flickity("previous", true);
				});
				// carousel.on("select.flickity-"+i, function() {
				//   console.log(this);
				//   selected = $(flkty.selectedElement);
				//   selected
				//     .siblings()
				//     .addBack()
				//     .removeClass("is-next is-prev");
				//   selected.next().addClass("is-next");
				//   selected.prev().addClass("is-prev");
				// });
			}
			return carousel;
		}
		function flickityCounter( carouselСounterСontent, counterElements ){
			try{
				counterElements =         $(counterElements);
				carouselСounterСontent =  $(carouselСounterСontent);
				var currentIndex = counterElements.siblings(".is-selected").index()+1;
				var total = counterElements.length;
				carouselСounterСontent.find(".carousel-counter-total").text( total );
				carouselСounterСontent.find(".carousel-counter-current").text( currentIndex );
			}catch(e){
				console.error(e);
			}
		}
		
		$('.button-carousel-nav').on('click', 'li', function() {
			var that = $(this);
			var selector = that.attr('data-selector');
			that.addClass("is-selected");
			that.siblings().removeClass("is-selected");
		});




		var arrowStyle = "M 10,50 L 65,100 L 70,90 L 25,50  L 70,10 L 65,0 Z";

		/*bnr-carousel*/
		if( $(".bnr-carousel .carousel-items figure").length ){
			window.bnrCarousel = $(".bnr-carousel").children(".carousel-items").flickity({
				imagesLoaded: true,
				autoPlay: 6000,
				pauseAutoPlayOnHover: true,
				arrowShape: arrowStyle,
				initialIndex: 0,
				friction: 1,
				selectedAttraction: 1,
				prevNextButtons: true,
				draggable: false,
				wrapAround: true,
				pageDots: true,
				contain: false,
				percentPosition: true,
				cellSelector: 'figure',
				cellAlign: "center"
			});
			bnrCarousel.data("flickity");
			//arrows
			//flickityPrevNext(".bnr-carousel");
			//dots
			for( var i = 0; i < $(bnrCarousel).find("figure").length; i++){
				bnrCarousel.siblings().find(".button-carousel-nav ul").append('<li role="button" class="button"></li>');
			}
			bnrCarousel.on( 'select.flickity', function( event, index ) {
				var index = $(this).find("figure.is-selected").index();
			  $(this).siblings()
			  			.find(".button-carousel-nav ul .button")
			  			.eq(index)
			  			.addClass("is-selected")
			  			.siblings()
			  			.removeClass("is-selected");
			});
	    $('.bnr-carousel .button-carousel-nav').on( 'click', 'li', function() {
	      var index = $(this).index();
	      bnrCarousel.flickity( 'select', index );
	    });
		}
		$(".bnr-carousel .carousel-items").append("<div class='container container-arrows'></div>").find(".container-arrows").append($(".bnr-carousel .carousel-items .flickity-prev-next-button"))
		


	    //short-partners-carousel
	    if ($(".article-carousel .carousel-items figure").length > 1 || checkSm())
	      $('.article-carousel .carousel-items').flickity({
	        imagesLoaded: true,
	        autoPlay: 3000,
	        //groupCells: 3,
	        freeScroll: false,
	        pauseAutoPlayOnHover: true,
	        arrowShape: arrowStyle,
	        initialIndex: 1,
	        prevNextButtons: true,
	        draggable: false,
	        adaptiveHeight: true, 
	        wrapAround: false,
	        pageDots: false,
	        contain: !checkSm(),
	        percentPosition: true,
	        cellAlign: 'center'
	      });

	    //weekarticles-nav
      window.weekarticlesNav = $('.weekarticles-nav').flickity({
        imagesLoaded: true,
        autoPlay: false,
        //groupCells: 3,
        freeScroll: false,
        pauseAutoPlayOnHover: true,
        arrowShape: "M 20,50 L 55,80 L 70,90 L 70,50  L 70,10 L 55,20 Z",
        initialIndex: 0,
        prevNextButtons: true,
        draggable: false,
        adaptiveHeight: true, 
        wrapAround: false,
        pageDots: false,
        contain: !checkSm(),
        percentPosition: true,
        cellAlign: 'center'
      });
      weekarticlesNav.data("flickity");
      weekarticlesNav.on( 'select.flickity', function( event, index ) {
				var index = $(this).find(".is-selected").index();
				$(this).find(".is-selected [data-toggle]").tab('show');
				console.log(event);
			});
    	$(weekarticlesNav).find(".desc-content").on("click.after", function(e){
    		e.preventDefault();
    		var index = $(this).closest(".item").index();
    		console.log(index);
    		weekarticlesNav.flickity( 'select', index );
    	})





		window.carouselArticle = function() {
			if ($(".carousel-article").length >= 0) {
				var carouselMain = $(".carousel-article .carousel-main"),
					carouselNav = $(".carousel-article .carousel-nav");

				for (var i = 0; i < carouselMain.length; i++) {
					var crs = $(carouselMain)
						.eq(i)
						.flickity({
							imagesLoaded: true,
							prevNextButtons: false,
							cellAlign: "center",
							bgLazyLoad: 1,
							//friction: 1,
							//selectedAttraction: 1,
							initialIndex: 1,
							draggable: false,
							contain: true,
							pageDots: false
						});
					var flkty = crs.data("flickity");

					$(carouselNav).eq(i).flickity({
						imagesLoaded: true,
						initialIndex: 1,
						asNavFor: $(carouselMain)[i],
						prevNextButtons: true,
						draggable: true,
						percentPosition: true,
						//wrapAround: true,
						cellAlign: "center",
						adaptiveHeight: true,
						//contain: true,
						pageDots: false
					});
          $("[data-fancybox]").fancybox({
            afterShow: function(instance, current) {
              this.$content.find(".carousel-main").flickity("resize");
              this.$content.find(".carousel-nav").flickity("resize");
            }
          });
				}
			}
		};
		carouselArticle();
		

    // Прибавление-убавление значении
    (function(){
      var form = $("[data-counter]") || null;;
      if( !form )
        return;
      var cntfactor = form.attr("data-counter")*1;

      $(document).on("click", "[data-counter-btn]", function(){
        var cntVal;
        var cntInput = $(this).closest( form ).find("[data-counter-input]");
        
        cntVal = (cntInput.val()*1);

        if( $(this).hasClass("plus") )
          cntVal = cntVal + cntfactor;
        if( $(this).hasClass("minus") & cntVal > 0 )
          cntVal = cntVal - cntfactor;
        if( isNaN( cntVal ) || cntVal < 0) cntVal = 0;
        cntInput.val( cntVal ).attr("value", cntVal)
      })
      $(".cnt-input").on( "keypress", function(e){
        //console.log(this, e);
      } )
    })();

    //Доп. Инпуты при регистраций для блогеров
    $(".iwho-content input").on("change", function(){
    	console.log(this);
    	if($(this).hasClass("iblogger"))
    		$(".add-inputs-blogger").addClass("show");
    	else
    		$(".add-inputs-blogger").removeClass("show");
    })
    $(".add-inputs-blogger").addClass("hide");


    /*Скоро*/
    if($(".soon-bg-mousemove").length != 0){
		  $(".soon-bg-mousemove").on("mousemove", function(e){
				//$(".soon-bg").css("background-position-x", (0 + (-e.pageX/100))).css("background-position-y", (-0 + (-e.pageY/100)));

				$(".soon-bg")	.css("transform", "translate(" +(-e.pageX/125)+"px, " +(-e.pageY/125)+ "px)")
				$(".soon-logo")	.css("transform", "translate(" +(e.pageX/230)+"px, " +(e.pageY/230)+ "px)")
				$(".cosmonaut")	.css("transform", "translate(" +(e.pageX/100)+"px, " +(e.pageY/75)+ "px)")
														
			});


    }

		function onLoaded() {
			/*MASONRY*/
			if ($(".grid-img").length != 0) {
				var $grid = $(".grid-img").masonry({
					itemSelector: ".grid-img-item",
					columnWidth: ".grid-img-sizer",
					percentPosition: true
				});
			}
			$(window).trigger("resize");
			$(window).trigger("scroll");
		}





		//SCROLL
		var minMenu = $(".header-scroll") || null;
		var headerRange = false;
		var staffProgressStatus = false;
		$(window).on("scroll", function(e) {

			//Адаптация хедера при скролинге
			if ($(window).scrollTop() > 300 && headerRange == false) {

				headerRange = true;
				if (minMenu) minMenu.addClass("scrolled").addClass("down");

			} else if ($(window).scrollTop() < 300 && headerRange == true) {
				headerRange = !true;
				if (minMenu) minMenu.removeClass("scrolled");
			}
		});


		/*nightmode*/
		$("#nightmode-check").on("change", function( e, bool ){
			if( typeof bool == "boolean")
				this.checked = bool;	
			if( this.checked ){
				$('[for="nightmode-check"]').addClass("checked")
				$("body").addClass("nightmode");
				nightmodeChange(true);
				
				setTimeout(function(){$("#min-menu").addClass("mm-theme-dark").removeClass("mm-theme-white");}, 1)
				console.log($("#min-menu"))
			}else{
				$('[for="nightmode-check"]').removeClass("checked")
				$("body").removeClass("nightmode");
				nightmodeChange(false);
				
				setTimeout(function(){$("#min-menu").addClass("mm-theme-white").removeClass("mm-theme-dark");}, 1)
			}
		});
		function nightmodeChange(status){
			var obj = {
				nightmode: status
			}
			var jsonText = JSON.stringify(obj);
			localStorage.setItem('nightmode', jsonText);
		}
		window.jsonOptions = JSON.parse( localStorage["nightmode"] || false );
		if(jsonOptions){			
			$("#nightmode-check").trigger("change", jsonOptions.nightmode)
		}

		/*Смайлить*/
		$(".tolike.fixed .btn-this").on("click", function(){
			//$(this).closest(".tolike").before("<span class='tolike-notify'>Вам понравился этот пост</span>");
			var that = $(this);
			var inputCheck = $(this).closest(".tolike").find(".btn-like-input")[0];	
			var notifyBox = that.closest(".tolike").find(".tolike-notify");
			if( !(inputCheck.checked) ){
				notifyBox.addClass("notifyed");
				notifyBox.fadeIn();
				setTimeout(function(){
					notifyBox.fadeOut();
				}, 2250)
			}
		});


		//Preloader
		window.preLoader = {

			preImg: function(img) {
				var images = img || document.images,
					imagesTotalCount = images.length,
					imagesLoadedCount = 0,
					preloadPercent = $(".percent").text("0 %");

				if (imagesTotalCount == 0) {
					preOnload();
					$(preloadPercent).text("100 %");
				}

				for (var i = 0; i < imagesTotalCount; i++) {
					var image_clone = new Image();
					image_clone.onload = image_loaded;
					image_clone.onerror = image_loaded;
					image_clone.src = images[i].src;
				}

				function preOnload() {
					onLoaded();
				}

				function image_loaded() {
					imagesLoadedCount++;
					var per = (100 / imagesTotalCount * imagesLoadedCount) << 0;

					setTimeout(function() {
						//console.log(per);
						$(preloadPercent).text(per + "%");
					}, 1);

					if (imagesLoadedCount >= imagesTotalCount) preOnload();
				}
			}
		};
		preLoader.preImg();









	/*Обложки картин*/
	if( $("#bloggercover").length != 0 )
	$("#bloggercover").on("change", function(e){
		//console.log(this);
		var file = this.files[0];
		var out = "";
		var reader = new FileReader();
		reader.onload = function(e){
			var result = e.target.result;
			if( $(".bloggercover-img").length != 0 )
				$(".bloggercover-img")[0].src = result;
		};
		reader.readAsDataURL(file);
	})
if( $("#useravatar").length != 0 )
	$("#useravatar").on("change", function(e){
		var file = this.files[0];
		var out = "";
		var reader = new FileReader();
		reader.onload = function(e){
			var result = e.target.result;
			if( $(".useravatar-img").length != 0 )
				$(".useravatar-img")[0].style.backgroundImage = "url('"+result+"')";
		};
		reader.readAsDataURL(file);
	})







	});
})(jQuery);

var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMac = /Mac/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent),
		isEdge = /Edge/i.test(navigator.userAgent);

if( isEdge ){
	if(window.navigator.platform.indexOf('Mac') < 0){
		console.log("isEdge");
		(function(){var D={frameRate:50,animationTime:200,stepSize:60,pulseAlgorithm:true,pulseScale:6,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:true,arrowScroll:50,touchpadSupport:true,fixedBackground:true,excluded:""};var u=D;var s=false;var p=false;var h={x:0,y:0};var b=false;var w=document.documentElement;var d;var y;var G=[120,120,120];var o={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};var u=D;function J(){var K=false;if(K){a("keydown",t)}if(u.keyboardSupport&&!K){f("keydown",t)}}function E(){if(!document.body){return}var K=document.body;var L=document.documentElement;var O=window.innerHeight;var M=K.scrollHeight;w=(document.compatMode.indexOf("CSS")>=0)?L:K;d=K;J();b=true;if(top!=self){p=true}else{if(M>O&&(K.offsetHeight<=O||L.offsetHeight<=O)){L.style.height="auto";if(w.offsetHeight<=O){var N=document.createElement("div");N.style.clear="both";K.appendChild(N)}}}if(!u.fixedBackground&&!s){K.style.backgroundAttachment="scroll";L.style.backgroundAttachment="scroll"}}var z=[];var g=false;var m=+new Date;function F(N,M,R,O){O||(O=1000);x(M,R);if(u.accelerationMax!=1){var K=+new Date;var S=K-m;if(S<u.accelerationDelta){var P=(1+(30/S))/2;if(P>1){P=Math.min(P,u.accelerationMax);M*=P;R*=P}}m=+new Date}z.push({x:M,y:R,lastX:(M<0)?0.99:-0.99,lastY:(R<0)?0.99:-0.99,start:+new Date});if(g){return}var Q=(N===document.body);var L=function(U){var T=+new Date;var ab=0;var aa=0;for(var W=0;W<z.length;W++){var ad=z[W];var ac=T-ad.start;var V=(ac>=u.animationTime);var X=(V)?1:ac/u.animationTime;if(u.pulseAlgorithm){X=j(X)}var Z=(ad.x*X-ad.lastX)>>0;var Y=(ad.y*X-ad.lastY)>>0;ab+=Z;aa+=Y;ad.lastX+=Z;ad.lastY+=Y;if(V){z.splice(W,1);W--}}if(Q){window.scrollBy(ab,aa)}else{if(ab){N.scrollLeft+=ab}if(aa){N.scrollTop+=aa}}if(!M&&!R){z=[]}if(z.length){A(L,N,(O/u.frameRate+1))}else{g=false}};A(L,N,0);g=true}function l(N){if(jQuery("body").hasClass("woocommerce-checkout")){return}if(jQuery(N.target).closest(".navbar-collapse").length===1){return}if(jQuery(N.target).closest(".chosen-results").length===1){return}if(jQuery(N.target).closest(".select2-results").length===1){return}if(jQuery(N.target).closest(".modal-open").length===1){return}if(jQuery(N.target).closest(".search-header-wrapper").length===1){return}if(!b){E()}var O=N.target;var M=B(O);if(!M||N.defaultPrevented||k(d,"embed")||(k(O,"embed")&&/\.pdf/i.test(O.src))){return true}var L=N.wheelDeltaX||0;var K=N.wheelDeltaY||0;if(!L&&!K){K=N.wheelDelta||0}if(!u.touchpadSupport&&I(K)){return true}if(Math.abs(L)>1.2){L*=u.stepSize/120}if(Math.abs(K)>1.2){K*=u.stepSize/120}F(M,-L,-K);N.preventDefault()}function t(L){var Q=L.target;var O=L.ctrlKey||L.altKey||L.metaKey||(L.shiftKey&&L.keyCode!==o.spacebar);if(/input|textarea|select|embed/i.test(Q.nodeName)||Q.isContentEditable||L.defaultPrevented||O){return true}if(k(Q,"button")&&L.keyCode===o.spacebar){return true}var M,S=0,R=0;var N=B(d);var P=N.clientHeight;if(N==document.body){P=window.innerHeight}switch(L.keyCode){case o.up:R=-u.arrowScroll;break;case o.down:R=u.arrowScroll;break;case o.spacebar:M=L.shiftKey?1:-1;R=-M*P*0.9;break;case o.pageup:R=-P*0.9;break;case o.pagedown:R=P*0.9;break;case o.home:R=-N.scrollTop;break;case o.end:var K=N.scrollHeight-N.scrollTop-P;R=(K>0)?K+10:0;break;case o.left:S=-u.arrowScroll;break;case o.right:S=u.arrowScroll;break;default:return true}F(N,S,R);L.preventDefault()}function n(K){d=K.target}var i={};setInterval(function(){i={}},10*1000);var v=(function(){var K=0;return function(L){return L.uniqueID||(L.uniqueID=K++)}})();function c(L,K){for(var M=L.length;M--;){i[v(L[M])]=K}return K}function B(N){var L=[];var K=w.scrollHeight;do{var M=i[v(N)];if(M){return c(L,M)}L.push(N);if(K===N.scrollHeight){if(!p||w.clientHeight+10<K){return c(L,document.body)}}else{if(N.clientHeight+10<N.scrollHeight){overflow=getComputedStyle(N,"").getPropertyValue("overflow-y");if(overflow==="scroll"||overflow==="auto"){return c(L,N)}}}}while(N=N.parentNode)}function f(M,L,K){window.addEventListener(M,L,(K||false))}function a(M,L,K){window.removeEventListener(M,L,(K||false))}function k(L,K){return(L.nodeName||"").toLowerCase()===K.toLowerCase()}function x(K,L){K=(K>0)?1:-1;L=(L>0)?1:-1;if(h.x!==K||h.y!==L){h.x=K;h.y=L;z=[];m=0}}var e;function I(K){if(!K){return}K=Math.abs(K);G.push(K);G.shift();clearTimeout(e);var M=(G[0]==G[1]&&G[1]==G[2]);var L=(q(G[0],120)&&q(G[1],120)&&q(G[2],120));return !(M||L)}function q(L,K){return(Math.floor(L/K)==L/K)}var A=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(M,L,K){window.setTimeout(M,K||(1000/60))}})();function C(K){var M,N,L;K=K*u.pulseScale;if(K<1){M=K-(1-Math.exp(-K))}else{N=Math.exp(-1);K-=1;L=1-Math.exp(-K);M=N+(L*(1-N))}return M*u.pulseNormalize}function j(K){if(K>=1){return 1}if(K<=0){return 0}if(u.pulseNormalize==1){u.pulseNormalize/=C(1)}return C(K)}var H=/chrome/i.test(window.navigator.userAgent);var r="onmousewheel" in document;if(r&&H){f("mousedown",n);f("mousewheel",l);f("load",E)}})();
	}
}

// COMMON FUNCTION

setTimeout(function() {
	//jQuery FUNCITON
	$.fn.onResized = function() {
		onResized(function() {
			this;
		});
		return this;
	};
}, 10);




function checkSm() {
	return $(document).width() <= 991;
}

function checkMd() {
	return $(document).width() < 1199 && !checkSm();
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function onResized(f) {
	if (typeof f === "function") f();
	$(window).on("resize", function(e) {
		if (typeof f === "function") f();
	});
	return this;
}

function scrolledDiv(el) {
	try {
		var docViewTop = $(window).scrollTop(),
			docViewBottom = docViewTop + $(window).height(),
			elTop = $(el).offset().top,
			elBottom = elTop + $(el).height() / 1.8;
	} catch (err) {
		console.error();
	}

	return elBottom <= docViewBottom && elTop >= docViewTop;
}

function roundFix( num, cnt ){
	num = num+""
	cnt = cnt + (/./.test(num) || null ? 1 : 0);
	return num.substring( 0,  cnt)*1
}

function intSpace( int, replaceType ){
		var cnt = 0;
		var newInt = "";
		int = int*1;
		replaceType = replaceType || " ";
		if( typeof int === NaN )
			return;
		var arrInt = (int+"").match(/([0-9])/gim).reverse();
		for (var i = 0; i < arrInt.length; i++) {
			cnt++;
			newInt = arrInt[i]+newInt
			if(cnt === 3){
				newInt = replaceType+newInt;
				cnt = 0;
			}
		}
		return newInt;
}
