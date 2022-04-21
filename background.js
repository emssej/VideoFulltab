/*

  This program is free software: you can redistribute it and/or modify it under
  the terms of the GNU Affero General Public License as published by the Free Software
  Foundation, either version 3 of the License, or (at your option) any later
  version.

  This program is distributed in the hope that it will be useful, but WITHOUT
  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
  details.

  You should have received a copy of the GNU Aferro General Public License along
  with this program. If not, see <https://www.gnu.org/licenses/>.

*/

function VideoFulltab (id) {
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

    var elements = new Array ();
    
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

	// If all else fails, try to find an iframe.
	if (!match) {
	    for (let iframe of document.getElementsByTagName ("iframe")) {
		if (document.activeElement.contains (iframe)) {
		    elements.push (document.activeElement);
		    elements.push (iframe);
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
    });
});
