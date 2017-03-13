/*
 *  jQuery imageCarousel - v1.0.0
 *  jQuery plugin to play images
 *  
 *  parameters
 *  images:[{title:"imageTitle1",path:imagePath1},{title:"imageTitle2",path:"imagePath2"}...],
 *  options:{} see default settings
 *  
 *  the browser must support HTML5
 *
 *  Made by FarewellXzz
 *  Under MIT License
 */

(function ( $, window, document) {
	var pluginName = "imageCarousel",
	
	//默认配置参数  default settings
	defaults = {
		//滑动速度 slide speed
		speed:300, 
		
		//是否主动滑动 slide automatically
		autoSlide:true,    
		
		//主动滑动时图片停留时间 the time to hold image between two slidings
		holdTime:4000,      
		
		//是否一直显示图片标题 
		alwaysShowTitle:true,
		
		//字体颜色 font color
		color:"#000",	
		
		//点击图片时回调函数,参数：element：图片元素，index：图片在图片数组中的序号
		//the callback while click image
		clickImage:function(element,index){}, 
		
	};
	
	// The actual plugin constructor
	function Plugin ( element, images,options ) {
			this.element = element;
			this.images = images;
			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			//
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
	};
	
	Plugin.prototype = {
			init: function () {
				var e = this;
				e.width = $(e.element).width();
				e.height = $(e.element).height();
				$(e.element).addClass("imageCarouselBox");
				$(e.element).css("color",e.settings.color);
				e.picTimer;
				e.setImages(e.images);
				
				
			},
			
			setImages:function(images){
				var e = this;
				e.dataLength = e.images.length;
				$(e.element).html("");
				e.index = 0;
				
				var ulText = "<ul>"
				var btnText = "<div class='btnBg'><div class='btn'>";
	    		for(var i=0; i < e.dataLength; i++) {
	    			btnText += "<span></span>";
	    			ulText += "<li ><img src='"+images[i].path+"' alt='' ><div class='text-box'>"+images[i].title+"</div></li>";
	    		}
	    		btnText += "</div></div><div class='preNext pre'></div><div class='preNext next'></div>";
	    		ulText += "</ul>";
				
	    		$(e.element).append(ulText);
	    		$(e.element).append(btnText);
	    		
	    		$(e.element).find("ul").css("width",e.width * e.dataLength);
	    		$(e.element).find("ul li").css("width",e.width).click(function(){
	    			e.settings.clickImage(this,e.index);
	    		});
	    		
	    		if(e.settings.alwaysShowTitle){
	    			$(e.element).find("ul li .text-box").fadeIn();
	    		} else{
	    			$(e.element).find("ul li").mouseenter(function(){
		    			$(this).find(".text-box").fadeIn();
		    		}).mouseleave(function(){
		    			$(this).find(".text-box").fadeOut();
		    		});
	    		}
	    		
	    		$(e.element).find(".btn span").css("opacity",0.4).mouseenter(function() {
	    			e.index = $(e.element).find(".btn span").index(this);
	    			e.showImage(e.index);
	    		}).eq(0).trigger("mouseenter");
	    		
	    		
	    		$(e.element).find(" .preNext").css("opacity",0.2).hover(function() {
	    			$(this).stop(true,false).animate({"opacity":"0.5"},e.settings.speed);
	    		},function() {
	    			$(this).stop(true,false).animate({"opacity":"0.2"},e.settings.speed);
	    		});
	    		
	    		$(e.element).find(" .pre").click(function() {
	    			e.index -= 1;
	    			if(e.index == -1) {e.index = e.dataLength - 1;}
	    			e.showImage(e.index);
	    		});
	    		$(e.element).find(" .next").click(function() {
	    			e.index += 1;
	    			if(e.index == e.dataLength) {e.index = 0;}
	    			e.showImage(e.index);
	    		});
	    		
	    		if(e.settings.autoSlide){
	    			$(e.element).hover(function() {
	        			clearInterval(e.picTimer);
	        		},function() {
	        			e.picTimer = setInterval(function() {
	        				e.showImage(e.index);
	        				e.index++;
	        				if(e.index == e.dataLength) {e.index = 0;}
	        			},e.settings.holdTime); 
	        		}).trigger("mouseleave");
	    		}
			},
			
			showImage: function(index){
				var e = this;
				var nowLeft = -index*e.width;
				$(e.element).find("ul").stop(true,false).animate({"left":nowLeft},e.settings.speed);
				$(e.element).find(" .btn span").stop(true,false).animate({"opacity":"0.4"},e.settings.speed).eq(index).stop(true,false).animate({"opacity":"0.8"},e.settings.speed);
			}
		};
	
	$.fn[ pluginName ] = function ( images,options) {
		var e = this;
		e.each(function() {
			if ( !$.data( e, "plugin_" + pluginName ) ) {
					$.data( e, "plugin_" + pluginName, new Plugin( this,images, options ) );
			}
		});

		// chain jQuery functions
		return e;
	};
	
})(jQuery, window, document)