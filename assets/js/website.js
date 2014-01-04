/*jshint undef:true, devel:true */
/*global $:false */

$(document).ready(function() {
	"use strict";

	// Globals
	var ACTIVE_PAGE; // Section currently being viewed (e.g. Blog, About)
	var PREV_SECTION; // Previous section viewed, used for portfolio transition
	//var GALLERY_MAX_HEIGHT;
	//var GALLERY_MAX_WIDTH;

	// DOM References
	var $body = $("body");
	var $mainNav = $("#main-menu");
	var $loadingBar = $("#loading_bar");
	var $footer = $("footer");

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

	// Other Sections
	var $otherContent = $("#main-content"); // Content sections Contacts, About, etc.

	window.MENU_VISIBLE = true;

	/**
	* Get URL hashchange and feed loadContent function the string page to load
	*/
	window.onhashchange = function() {
		var page; // page hash
		var pageSplit; // page hash split before "/", "Pics/image" -> "Pics"

		page=window.location.hash.substring(1);

		// Show loading bar while loading
		$loadingBar.show();

		if (page.substring(0, 1) == "!") {
			page = page.substring(1);
		}

		if (page === "") {
			page = "Home";
		}

		document.title = "Tianyu Shi \u2022 " + page;

		if (ACTIVE_PAGE !== null) {
			$(ACTIVE_PAGE).removeClass("active");
		}

		// Enable menu should user navigate avay from the gallery.
		if (page.split("/")[1] !== "Design" &&
			page.split("/")[1] !== "Pics" &&
			page.split("/")[1] !== "Other") {
			console.log("set true");
			window.MENU_VISIBLE = true;
		}

		ACTIVE_PAGE = document.getElementById(pageSplit);

		$(ACTIVE_PAGE).addClass("active");
		console.log("Loading " + page);

		loadContent(page);
	};

	/**
	* Load the content of the page depending on the URL hash passed in.
	* 
	* @param {String} page Particular page to load the content of
	*/
	function loadContent(page) {
		var href; // Reference for loading content
		var blogPost; // Blog post title
		var pageSplit; // page hash split before "/", "Pics/image" -> "Pics"
		var pic_to_load; // If in gallery, the picture to load
		var portSection; // Current section in portfolio being viewed

		if(page.substring(0,9) != "Portfolio") {
			$mainNav.slideDown(200, function() {});
			$footer.slideDown(200, function() {});
		}

		if (page == "Home") {
			$otherContent.fadeOut(200, function() {});
			$blogSection.fadeOut(200, function() {});
			$portfolioSection.fadeOut(200, function() {});
			$mainPic.delay(200).fadeIn(300, function() {});
		} else if (page.substring(0, 4) == "Blog") {
			$otherContent.fadeOut(200, function() {});
			$mainPic.fadeOut(300, function() {});
			$portfolioSection.fadeOut(200, function() {});
			$blogSection.delay(200).fadeIn(200, function() {});
			blogPost = page.substring(5);
			if (blogPost === "") {
				$archiveSection.fadeOut(200, function() {});
				$postSection.fadeOut(200, function() {});
				$mainLoadSection.delay(200).fadeIn(200, function() {});
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
		} else if (page.substring(0,9) == "Portfolio") {
			$mainPic.fadeOut(300, function() {});
			$blogSection.fadeOut(200, function() {});
			$otherContent.fadeOut(200, function() {});
			$portfolioSection.delay(400).fadeIn(200, function() {});

			portSection = page.substring(10);

			if (portSection === "") {
				$mainNav.slideDown(200, function() {});
				$footer.slideDown(200, function() {});
				$("#portfolionav").slideDown(200, function() {});
				portSection = "p_home";
			} else {
				portSection = portSection.split("/");
				pic_to_load = portSection[1];

				if (pic_to_load === undefined) {
					if (portSection[0] == "Design") {
						pic_to_load = "blazethestage";
					} else if (portSection[0] == "Pics") {
						pic_to_load = "driving";
					} else if (portSection[0] == "Other") {
						pic_to_load = "citysketch";
					} else {
						$mainNav.slideDown(200, function() {});
						$footer.slideDown(200, function() {});
						$("#portfolionav").slideDown(200, function() {});
					}
				}
				portSection = portSection[0];
			}

			href = "../assets/pages/" + portSection.toLowerCase() + ".html" + " #ploadSection";

			if (PREV_SECTION != portSection) {
				$portfolioSection.find("#ploadSection").fadeOut(200, function() {
					$ploadSection.hide().load(href, function() {
						if(portSection != "Projects" && portSection != "p_home") {
							var src = "assets/images/images" + portSection + "/" + pic_to_load + ".jpg";
							$("#gallery_pic").attr("src", src);
							$.getScript("../assets/js/menu.js");
							if(!window.MENU_VISIBLE) {
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

			PREV_SECTION = portSection;
		} else {
			$mainPic.fadeOut(300, function() {});
			$blogSection.fadeOut(200, function() {});
			$portfolioSection.fadeOut(200, function() {});

			pageSplit = page.split("/")[0];
			href = "../assets/pages/" + pageSplit.toLowerCase() + ".html" + " #loadSection";

			$otherContent.find("#loadSection").fadeOut(200, function() {
				$otherContent.hide().load(href, function() {
					$otherContent.delay(200).fadeIn(200, function() {
						if(page == "Contact") {
							$.getScript("../assets/js/icons.js");
						}
					});
				});
			});
		}

		// Hide the loading bar after loading
		$loadingBar.hide();
	}

	// Main menu hover animation
	$("#nav a")
	.css({backgroundPosition: "0px 0px"})
	.mouseover(function() {
		$mainNav.css("opacity", "1");
		$(this).stop().animate({backgroundPosition: "(0px -60px)"}, {duration:100});
	})
	.mouseout(function() {
		$mainNav.css("opacity", "0.8");
		$(this).stop().animate({backgroundPosition: "(0px 0px)"}, {duration:100, complete:function() {
			$(this).css({backgroundPosition: "0px 0px"});
		}});
	});
});