function VideoFulltab (id) {
    // Search the DOM for all videos.
    let videos = document.getElementsByTagName ("video");
    
    for (let video of videos) {
	if (video.hasAttribute ("fulltabbed")) {
	    video.style.cssText = video.getAttribute ("fulltabbed");
	    video.removeAttribute ("fulltabbed");
	    break;
	}
	
	if (video == document.activeElement) {
	    video.setAttribute ("fulltabbed", video.style.cssText);
	    video.style.position = "fixed";
	    video.style.top = "0";
	    video.style.left = "0";
	    video.style.width = "100vw";
	    video.style.height = "100vh";
	    video.style.zIndex = "999";
	    video.style.backgroundColor = "black";
	    break;
	}
    }
}

chrome.action.onClicked.addListener ((tab) => {
    chrome.scripting.executeScript ({
	target: { tabId: tab.id },
	function: VideoFulltab,
	args: [ tab.id ]
    });
});
