var elements = new Array ();

if (document.activeElement.nodeName == "VIDEO") {
    elements.push (document.activeElement);
} else {
    if (location.href.indexOf ("https://vod.tvp.pl/video/") != -1) {
	elements.push (document.getElementById ("JS-TVPlayer2-Wrapper"));
    } else if (location.href.indexOf ("https://www.youtube.com/watch") != -1) {
	console.log ("YouTube");
	elements.push (document.getElementById ("ytd-player"));
	elements.push (document.getElementsByClassName ("html5-main-video")[0]);
    } else {
	for (let video of document.getElementsByTagName ("video")) {
	    if (document.activeElement.contains (video)) {
		elements.push (document.activeElement);
		elements.push (video);
	    }
	}
    }
}

// Add the video-fulltab class that maximizes it.
for (let element of elements) {
    if (element.classList.contains ("video-fulltab")) {
	document.body.classList.remove ("body-fulltab");
	element.classList.remove ("video-fulltab");
    } else {
	document.body.classList.add ("body-fulltab");
	element.classList.add ("video-fulltab");
    }
}
