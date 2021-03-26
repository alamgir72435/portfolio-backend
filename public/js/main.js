$(document).ready(()=> {
	$(window).on('load', ()=> {
		$(".loader .inner").fadeOut(500, ()=> {
			$(".loader").fadeOut(750)
		})
	})

	$('.owl-carousel').owlCarousel({
	    loop:true,
	    items:3,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:4
	        }
	    }
	})

	var skillsOffset = $('.skillSection').offset().top;

	$(window).scroll(()=> {
		if(window.pageYOffset > skillsOffset - $(window).height() + 200){
			$('.chart').easyPieChart({
		            //your options goes here
		            easing:'easeInOut',
		            barColor:"#fff",
		            trackColor:false,
		            scaleColor:false,
		            lineWidth:4,
		            size:152,
		            onStep:function(from, to, percent) {
		            	$(this.el).find('.percent').text(Math.round(percent))
		            }
		     });
		}
	})
})


var sidnavOpen = false;

function toggle() {
	
  if(!sidnavOpen){
  	$("#Sidenav").css({"width": "250px","margin-top":"50px"})
  }else{
  	$("#Sidenav").css("width", "0px")
  }

  sidnavOpen = !sidnavOpen
  
}
