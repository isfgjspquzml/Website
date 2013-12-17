$("#comments")
.click(function(){
	loadDisqus($(this), $("#post_title").attr("identifier"), window.location.href);
});

var disqus_shortname = 'tianyushi';
var disqus_identifier; //made of post id and guid
var disqus_url; //post permalink

function loadDisqus(source, identifier, url) {
	console.log(identifier);
	console.log(url);

	if (window.DISQUS) {
		console.log("Reset DISQUS");

   //if Disqus exists, call it's reset method with new parameters
   DISQUS.reset({
   	reload: true,
   	config: function () {
   		this.page.identifier = identifier + "1";
   		this.page.url = url;
   	}
   });

   jQuery('#disqus_thread').insertAfter(source); //append the HTML after the link
} else {
	console.log("Init DISQUS");

   //insert a wrapper in HTML after the relevant "show comments" link
   jQuery('<div id="disqus_thread"></div>').insertAfter(source);
   disqus_identifier = identifier; //set the identifier argument
   disqus_url = url; //set the permalink argument
   //append the Disqus embed script to HTML
   var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
   dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
   jQuery('head').append(dsq);

}
};