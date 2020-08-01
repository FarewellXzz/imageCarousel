# imageCarousel by FarewellXzz
jQuery plugin for playing images

## quik start

```html
    <link rel="stylesheet" type="text/css" href="imageCarousel.css" />
    <script type="text/javascript" src="jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="imageCarousel.js"></script>

    <div id="imageBox" style="height:300px;width:350px;"></div>
    <script type="text/javascript"> 
    var images = [{title:"Tulips",path:'images/Tulips.jpg'},{title:"Jellyfish",path:'images/Jellyfish.jpg'}];
     $("#imageBox").imageCarousel(images,{
	 autoSlide:true,
	 alwaysShowTitle:true,
	 clickImage:function(e,index){
        },
     });    
  </script> 
```

## Additional options
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

## Licence
MIT Licence 

