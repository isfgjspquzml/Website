// This code needs to be refactored lol

/*jslint white: true, browser: true, devel: true, windows: true, forin: true, vars: true, nomen: true, plusplus: true, bitwise: true, regexp: true, sloppy: true, indent: 4, maxerr: 50 */
/*global $:false */

$(document).ready(function(){
	// "use strict";

	// Page Variables
	var activePage; // Section currently being viewed (e.g. Blog, About)
	var page; // page hash
	var pageSplit; // page hash split before "/", "Pics/image" -> "Pics"

	// Home Section
	var $mainPic = $("#main-pic"); // Welcome picture

	// Blog Sections
	var $blogSection = $("#main-blog");
	var $mainLoadSection = $("#mainLoadSection"); // Default Section for Blog
	var $archiveSection = $("#archiveLoadSection"); // Archive Section for Blog
	var $postSection = $("#postLoadSection"); // Post Section for Blog

	// Portfolio Sections
	var $portfolioSection = $("#portfolioSection");
	var $ploadSection = $("#ploadSection"); // Portfolio Section to load
	var pic_to_load; // If in gallery, the picture to load
	var portSection; // Current section in portfolio being viewed
	var prevSection; // Previous section in portfolio being viewed so that reloads are not necessary
	window.hideMenu = true; // Is the main nav menu and footer hidden?

	// Other Sections
	var $otherContent = $("#main-content"); // Content sections Contacts, About, etc.

	// On hash change, load content
	window.onhashchange = function() {
		page=window.location.hash.substring(1);
		setPage(page);
	};

	// Main menu hover animation
	$("#nav a")
	.css({backgroundPosition: "0px 0px"})
	.mouseover(function(){
		$("#main-menu").css("opacity", "1");
		$(this).stop().animate({backgroundPosition:"(0px -60px)"}, {duration:100});
	})
	.mouseout(function(){
		$("#main-menu").css("opacity", "0.8");
		$(this).stop().animate({backgroundPosition:"(0px 0px)"}, {duration:100, complete:function(){
			$(this).css({backgroundPosition: "0px 0px"});
		}});
	});

	// Load a page according to a particular page hash
	function loadContent(page) {
		console.log("LoadContent (js)");
		var href; // Reference for loading content
		var blogPost; // Blog post title

		if(page == "Home") {
			console.log("Home");
			$("#main-menu").slideDown(200, function() {});
			$("footer").slideDown(200, function() {});
			$otherContent.fadeOut(200, function () {});
			$blogSection.fadeOut(200, function () {});
			$portfolioSection.fadeOut(200, function () {});
			$mainPic.delay(200).fadeIn(300, function () {});
		} else if (page.substring(0, 4) == "Blog") {
			console.log("Blog");
			$("#main-menu").slideDown(200, function() {});
			$("footer").slideDown(200, function() {});
			$otherContent.fadeOut(200, function () {});
			$mainPic.fadeOut(300, function () {});
			$portfolioSection.fadeOut(200, function () {});
			$blogSection.delay(200).fadeIn(200, function () {});
			blogPost = page.substring(5);
			if(blogPost === "") {
				$archiveSection.fadeOut(200, function () {});
				$postSection.fadeOut(200, function () {});
				$mainLoadSection.delay(200).fadeIn(200, function () {});
			} else if (blogPost == "Archive") {
				$mainLoadSection.fadeOut(200, function () {});
				$postSection.fadeOut(200, function () {});
				$archiveSection.delay(200).fadeIn(200, function () {});
			} else {
				$mainLoadSection.fadeOut(200, function () {});
				$archiveSection.fadeOut(200, function () {});
				$postSection.fadeOut(200, function() {
					$postSection.hide().load(blogPost, function() {
						$postSection.delay(200).fadeIn(200, function() {});
					});
				});
			}
		} else if(page.substring(0,9) == "Portfolio") {
			$mainPic.fadeOut(300, function () {});
			$blogSection.fadeOut(200, function () {});
			$otherContent.fadeOut(200, function () {});
			$portfolioSection.delay(400).fadeIn(200, function () {});

			portSection = page.substring(10);

			if(portSection === "") {
				$("#main-menu").slideDown(200, function() {});
				$("footer").slideDown(200, function() {});
				$("#portfolionav").slideDown(200, function() {});
				portSection = "p_home";
			} else {
				portSection = portSection.split("/");
				pic_to_load = portSection[1];

				if(pic_to_load === undefined) {
					if(portSection[0] == "Design") {
						pic_to_load = "blazethestage";
					} else if (portSection[0] == "Pics") {
						pic_to_load = "driving";
					} else if (portSection[0] == "Other") {
						pic_to_load = "citysketch";
					} else {
						$("#main-menu").slideDown(200, function() {});
						$("footer").slideDown(200, function() {});
						$("#portfolionav").slideDown(200, function() {});
					}
				}
				portSection = portSection[0];
				console.log(pic_to_load);
			}

			href = "../assets/pages/" + portSection.toLowerCase() + ".html" + " #ploadSection";

			if(prevSection != portSection) {
				$portfolioSection.find("#ploadSection").fadeOut(200, function() {
					$ploadSection.hide().load(href, function() {
						if(portSection != "Projects" && portSection != "p_home") {
							var src = "assets/images/images" + portSection + "/" + pic_to_load + ".jpg";
							$("#gallery_pic").attr("src", src);
							$.getScript("../assets/js/menu.js");
							if(!window.hideMenu) {
								$("#gallery").animate({top: "20px"}, 200);
							}
						}

						$ploadSection.delay(200).fadeIn(200, function() {});
					});
				});
			} else {
				$ploadSection.find("#gallery_pic").hide();
				var src = "assets/images/images" + portSection + "/" + pic_to_load + ".jpg";
				$("#gallery_pic").attr("src", src);
				$ploadSection.find("#gallery_pic").fadeIn(200, function() {});
			}

			prevSection = portSection;
		} else {
			console.log("Other");
			$("#main-menu").slideDown(200, function() {});
			$("footer").slideDown(200, function() {});
			$mainPic.fadeOut(300, function () {});
			$blogSection.fadeOut(200, function () {});
			$portfolioSection.fadeOut(200, function () {});

			pageSplit = page.split("/")[0];
			href = "../assets/pages/" + pageSplit.toLowerCase() + ".html" + " #loadSection";

			$otherContent.find("#loadSection").fadeOut(200, function() {
				$otherContent.hide().load(href, function() {
					$otherContent.delay(200).fadeIn(200, function () {
						if(page == "Contact") {
							$.getScript("../assets/js/icons.js");
						}
					});
				});
			});
		}
	}

	// After a page changes, make the necessary adjustments
	function setPage(page) {
		if(page.substring(0,1) == "!") {
			page = page.substring(1);
		}

		if(page === "") {
			page = "Home";
		}

		document.title = "Tianyu Shi \u2022 " + page;

		if(activePage !== null) {
			$(activePage).removeClass("active");
		}

		pageSplit = page.split("/")[0];
		activePage = document.getElementById(pageSplit);

		$(activePage).addClass("active");
		console.log("Loading " + page);

		loadContent(page);
	}

	$("#loading_bar").css("display", "none");
});