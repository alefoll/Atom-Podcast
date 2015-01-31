var ipc = require('ipc');

window.addEventListener('polymer-ready', function(evt) {
	var core = document.querySelector('paper-side-menu > nav core-selector');

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