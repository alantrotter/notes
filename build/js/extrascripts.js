$(document).ready(function() {
	console.log('hello, document ready number of titled sections = ' + $('section[data-title]').length);
	
	balanceText($('p.subtitle, h1'), {watch: true});
	
	fillmobilebyline();
	
	$("section[data-title]").each(function (i) {
		$('.runningshoulder').append('<p>' + $(this).attr("data-title") + '</p>');
	});
	
	$("a[href='#top']").on("click", function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0},'50');
	});
	
	gsap.registerPlugin(ScrollTrigger);
	
	ScrollTrigger.defaults({
	  markers: false
	});
	
	
	// Animating the progress bar at the bottom

	$("article").each(function (index) {
		let triggerElement = $(this);
		let targetElement = $(".progressbar");
		let tl = gsap.timeline({
			scrollTrigger: {
		  	trigger: triggerElement,
		  	start: "top top",
		  	end: "bottom bottom",
		  	scrub: 0
			}
		});
	  	tl.to(targetElement, {
			width: "100%",
			duration: 1
		});
	});
	
	
	
	$("section").first().each(function (index) {
	  let triggerElement = $(this);
	  let targetElement = $(".sidebar");
	  
	  let tl = gsap.timeline({
		scrollTrigger: {
		  trigger: triggerElement,
		  start: "-100px top",
		  toggleActions: "restart none none reverse"		}
	  });
	  tl.to(targetElement, {
		opacity: 1,
		duration: 0
	  });

	});
	
	$("section[data-title]").each(function (index) {
	  let triggerElement = $(this);
	  let currentindex = $(this).index('section[data-title]');
	  let targetElement = $(".runningshoulder p").eq(currentindex);
	  let tl = gsap.timeline({
		scrollTrigger: {
		  trigger: triggerElement,
		  // trigger element - viewport
		  start: "-50px top",
		  end: "bottom -100px",
		  onEnter: () => {  
			console.log("entering. current index = " + currentindex)
			$(".runningshoulder p").removeClass("on");
			targetElement.addClass("on");
		  },
		  onEnterBack: () => {
			  console.log("entering from below. current index = " + currentindex)
			$(".runningshoulder p").removeClass("on");
			targetElement.addClass("on");
		  }
		}
	  });
	});

})


// believe me, I’d rather not bother with this, but thanks to some tedious formatting issues in Firefox's vertical alignment of text ¯\_(ツ)_/¯ this is where we are, duplicating over the byline content into a mobile version
function fillmobilebyline() {

	var bylinenamecontent = $('address').html();
	var bylinedatecontent = $('time').html();
	
	$('.mobilebyline').html('<p><span class="mobilebylinename">' + bylinenamecontent + '</span> <span class="mobilebylinetime">' + bylinedatecontent + '</span></p>');
	
}

