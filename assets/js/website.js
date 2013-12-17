$(document).ready(function(){
	var activePage;
	var click = $("#click")[0];
	var $otherContent = $("#main-content");
	var $mainPic = $("#main-pic");

	var $blogSection = $("#main-blog");
	var $mainLoadSection = $("#mainLoadSection");
	var $archiveSection = $("#archiveLoadSection");
	var $postSection = $("#postLoadSection");

	var disqus_shortname = 'tianyushi';
	var disqus_identifier; //made of post id and guid
	var disqus_url; //post permalink

	function hi() {
		console.log("hi");
	}

	function loadDisqus(source, identifier, url) {
		// console.log("loadDisqus");

		if (window.DISQUS) {
			jQuery('#disqus_thread').insertAfter(source); //append the HTML after the link

		   //if Disqus exists, call it's reset method with new parameters
		   DISQUS.reset({
		   	reload: true,
		   	config: function () {
		   		this.page.identifier = identifier;
		   		this.page.url = url;
		   	}
		   });

		} else {

		   //insert a wrapper in HTML after the relevant "show comments" link
		   jQuery('<div id="disqus_thread"></div>').insertAfter(source);
		   disqus_identifier = identifier; //set the identifier argument
		   disqus_url = url; //set the permalink argument

		   //append the Disqus embed script to HTML
		   var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		   dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
		   jQuery('head').append(dsq);

		}
	}

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

		if(page == "Home") {
			console.log("Home");
			$otherContent.fadeOut(200, function () {});
			$blogSection.fadeOut(200, function () {});
			$mainPic.delay(200).fadeIn(300, function () {})
		} else if (page.substring(0, 4) == "Blog") {
			console.log("Blog");
			$otherContent.fadeOut(200, function () {});
			$mainPic.fadeOut(300, function () {});
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
						$postSection.delay(200).fadeIn(200, function() {
							$.getScript('../assets/js/blog.js');
						})
					})
				})
			}
		} else {
			console.log("Other");
			$mainPic.fadeOut(300, function () {});
			$blogSection.fadeOut(200, function () {});

			href = "../assets/pages/" + page.toLowerCase() + ".html" + " #loadSection";

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
		if(page == "") {
			page = "Home";
		}

		document.title = "Tianyu Shi \u2022 " + page;

		if(activePage != null) {
			$(activePage).removeClass("active");
		}
		activePage = document.getElementById(page);
		$(activePage).addClass("active");
		console.log("Loading " + page);

		loadContent(page);
	}
});