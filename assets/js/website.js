$(document).ready(function(){
	var click = $("#click")[0];
	var activePage;

	var $otherContent = $("#main-content");
	var $mainPic = $("#main-pic");

	// Blog Sections
	var $blogSection = $("#main-blog");
	var $mainLoadSection = $("#mainLoadSection");
	var $archiveSection = $("#archiveLoadSection");
	var $postSection = $("#postLoadSection");

	// Portfolio Sections
	var $portfolioSection = $("#portfolioSection");

	window.onhashchange = function() {
		page=window.location.hash.substring(1);
		setPage(page);
	}

	$("#comments")
	.click(function () {
		console.log("hi");
	})

	$("#nav a")
	.css({backgroundPosition: "0px 0px"})
	.mouseover(function(){
		click.play();
		$("#main-menu").css("opacity", "1");
		$(this).stop().animate({backgroundPosition:"(0px -60px)"}, {duration:100})
	})
	.mouseout(function(){
		$("#main-menu").css("opacity", "0.8");
		$(this).stop().animate({backgroundPosition:"(0px 0px)"}, {duration:100, complete:function(){
			$(this).css({backgroundPosition: "0px 0px"})
		}})
	});

	function loadContent(page) {
		console.log("LoadContent (js)");
		var href;
		var blogPost;
		var portSection;

		if(page == "Home") {
			console.log("Home");
			$otherContent.fadeOut(200, function () {});
			$blogSection.fadeOut(200, function () {});
			$portfolioSection.fadeOut(200, function () {});
			$mainPic.delay(200).fadeIn(300, function () {})
		} else if (page.substring(0, 4) == "Blog") {
			console.log("Blog");
			$otherContent.fadeOut(200, function () {});
			$mainPic.fadeOut(300, function () {});
			$portfolioSection.fadeOut(200, function () {});
			$blogSection.delay(200).fadeIn(200, function () {});
			blogPost = page.substring(5);
			if(blogPost == "") {
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
						$postSection.delay(200).fadeIn(200, function() {})
					})
				})
			}
		} else if(page.substring(0,9) == "Portfolio") {
			$mainPic.fadeOut(300, function () {});
			$blogSection.fadeOut(200, function () {});
			$otherContent.fadeOut(200, function () {});
			$portfolioSection.delay(200).fadeIn(200, function () {
				portSection = page.substring(10);
				console.log(portSection);
				if(portSection == "") {

				} else {
				}
			});
		} else {
			console.log("Other");
			$mainPic.fadeOut(300, function () {});
			$blogSection.fadeOut(200, function () {});
			$portfolioSection.fadeOut(200, function () {});

			pageSplit = page.split('/')[0];
			href = "../assets/pages/" + pageSplit.toLowerCase() + ".html" + " #loadSection";

			$otherContent.find("#loadSection").fadeOut(200, function() {
				$otherContent.hide().load(href, function() {
					$otherContent.delay(200).fadeIn(200, function () {
						if(page == "Contact") {
							$.getScript('../assets/js/icons.js');
						} 
					});
				});
			});
		}
	};

	function setPage(page) {
		if(page.substring(0,1) == "!") {
			page = page.substring(1);
		}

		if(page == "") {
			page = "Home";
		}

		document.title = "Tianyu Shi \u2022 " + page;

		if(activePage != null) {
			$(activePage).removeClass("active");
		}

		pageSplit = page.split('/')[0];
		activePage = document.getElementById(pageSplit);

		$(activePage).addClass("active");
		console.log("Loading " + page);

		loadContent(page);
	}

	$("#loading_bar").css("display", "none");
});