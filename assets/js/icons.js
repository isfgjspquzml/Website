/*jshint undef:true, devel:true */
/*global $:false */
"use strict";

var $information = $("#information"); // Information displayed based on hover item
$information.hide(); // Invisible by default

// On hover over an icon, replace it with another
$("#icon-menu img")
.mouseover(function() {
	var hovertext;
	var src = $(this).attr("src").match(/[^\.]+/) + "_reverse.png";

	$(this).attr("src", src);

	if ($(this).attr("id") == "mail_icon") {
		hovertext = "tianyushi1992@gmail.com";
	} else if ($(this).attr("id") == "phone_icon") {
		hovertext = "267.421.2577";
	} else if ($(this).attr("id") == "linkedin_icon") {
		hovertext = "www.linkedin.com";
	} else if ($(this).attr("id") == "facebook_icon") {
		hovertext = "www.facebook.com/tianyus";
	} else if ($(this).attr("id") == "github_icon") {
		hovertext = "www.github.com/isfgspquzml";
	}

	$information.html(hovertext);
	$information.fadeIn(200, function () {});
})
.mouseout(function() {
	var src = $(this).attr("src").replace("_reverse.png", ".png");
	$(this).attr("src", src);
	$information.hide();
});