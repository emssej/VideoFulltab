var elements = new Array ();

// TODO:
//
// * Add a handler for the websites where you have to set stuff manually.
//
// * Use regex for the URLs.
//
// * In YouTube make it so that the controls also scale with the video.

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
	element.classList.remove ("video-fulltab");
    } else {
	element.classList.add ("video-fulltab");
    }
}
