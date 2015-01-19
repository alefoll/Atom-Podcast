var ipc = require('ipc');

global.settings = require('remote').getGlobal('settings');

window.addEventListener('polymer-ready', function(evt) {
	var core = document.getElementsByTagName('podcast-items')[0].shadowRoot.getElementsByTagName('core-selector')[0];

	ipc.on('key', function(message) {
		if (message === 'MediaPlayPause')
			core.selected = "0";
		else if (message === 'MediaNextTrack')
			core.selected = parseInt(core.selected) + 1;
		else if (message === 'MediaPreviousTrack')
			core.selected = parseInt(core.selected) - 1;
	});
});

// window.onbeforeunload = function(e) {
// 	return false;
// };