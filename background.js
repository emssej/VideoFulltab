function VideoFulltab (id) {
    var elements = new Array ();

    var websites = [
	{
	    regex: /(http:|https:)\/\/(www\.)(youtube.com|youtu\.be)\/watch\?v=.+/ius,
	    handler: function () {
		elements.push (document.getElementById ("ytd-player"));
		elements.push (document.getElementsByClassName ("html5-main-video")[0]);
	    }
	},
	{
	    regex: /(http:|https:)\/\/vod\.tvp\.pl\/video\/.+/ius,
	    handler: function () {
		elements.push (document.getElementById ("JS-TVPlayer2-Wrapper"));
	    }
	}
    ];
    
    if (document.activeElement.nodeName == "VIDEO") {
	elements.push (document.activeElement);
    } else {
	let match = false;
	
	for (let website of websites) {
	    if (location.href.match (website.regex)) {
		match = true;
		website.handler ();
		break;
	    }
	}

	// Generic handler.
	if (!match) {
	    for (let video of document.getElementsByTagName ("video")) {
		if (document.activeElement.contains (video)) {
		    elements.push (document.activeElement);
		    elements.push (video);
		}
	    }
	}
    }

    for (let element of elements) {
	if (element.classList.contains ("video-fulltab")) {
	    document.body.classList.remove ("body-fulltab");
	    element.classList.remove ("video-fulltab");
	} else {
	    document.body.classList.add ("body-fulltab");
	    element.classList.add ("video-fulltab");
	}
    }

}

chrome.action.onClicked.addListener ((tab) => {
    chrome.scripting.executeScript ({
	target: { tabId: tab.id },
	function: VideoFulltab,
	args: [tab.id]
    });
});
