/*jshint undef:true, devel:true */
/*global $:false */

"use strict";

// On hover over the fullscreen icon, replace it with another
$("#fullscreen img")
.mouseover(function() {
	var src = "assets/images/fullscreen_reverse.png";
	$(this).attr("src", src);
})
.mouseout(function() {
	var src = $(this).attr("src").replace("_reverse.png", ".png");
	$(this).attr("src", src);
});

// Toggle the nav visibility on click
$("#fullscreen img")
.click(function() {
	$("#main-menu").slideToggle(200);
	$("footer").slideToggle(200);
	$("#portfolionav").slideToggle(100);

	if (window.MENU_VISIBLE) {
		$("#gallery").animate({top: "20px"}, 200);
		window.MENU_VISIBLE = false;
	} else {
		$("#gallery").animate({top: "70px"}, 200);
		window.MENU_VISIBLE = true;
	}
});