console.log("loaded posts");

$("#main-blog a")
.click(function(event) {
	event.preventDefault();
	window.history.pushState(null, null, $(this).attr("href"));
});

$("#main-blog a")
.on("click", function() {
	var blogPost = {{ post.url }};
	var postLocation = $(this).attr("datalink");
	console.log(postLocation);

	$("#mainLoadSection").fadeOut(200, function () {});
	$("#archiveLoadSection").fadeOut(200, function () {});

	$("#mainLoadSection").fadeOut(200, function () {});
	$("#archiveLoadSection").fadeOut(200, function () {});
	$("#postLoadSection").fadeOut(200, function() {
		$("#postLoadSection").hide().load(blogPost, function() {
			$("#postLoadSection").fadeIn(200, function() {
				console.log("loaded article!");
				$.getScript('../assets/js/disqus.js');
			})
		})
	})
})