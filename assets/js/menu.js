console.log("loaded menu.js");

$("#fullscreen img")
.mouseover(function(){
	// var src = $(this).attr("src").match(/[^\.]+/) + "_reverse.png";
	var src = "assets/images/fullscreen_reverse.png";
	$(this).attr("src", src);
})
.mouseout(function(){
	var src = $(this).attr("src").replace("_reverse.png", ".png");
	$(this).attr("src", src);
});

$("#fullscreen img")
.click(function() {
	console.log("Asdf");
	$("#main-menu").slideToggle(200);
	$("footer").slideToggle(200);
	$("#portfolionav").slideToggle(100);

	if(window.hideMenu) {
		$("#gallery").animate({top: "20px"}, 200);
		window.hideMenu = false;
	} else {
		$("#gallery").animate({top: "70px"}, 200);
		window.hideMenu = true;
	}
})