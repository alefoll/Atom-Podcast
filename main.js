var app  = require('app'),
	Menu = require('menu'),
	Tray = require('tray'),
	fs   = require('fs');

var BrowserWindow  = require('browser-window'),
	GlobalShortcut = require('global-shortcut');

// Report crashes to our server.
require('crash-reporter').start();

var window = null;
var appIcon = null;

app.on('window-all-closed', function() {
	console.log('all-closed');
});

app.on('ready', function() {
	global.settings = JSON.parse(fs.readFileSync('settings.json', 'utf8')) || {};

	var size = require('screen').getPrimaryDisplay().workAreaSize;

	window = new BrowserWindow({ width: size.width, height: size.height, frame: false });

	window.toggleDevTools();
	window.loadUrl('file://' + __dirname + '/index.html');

	window.on('close', function() {
		window.hide();
	});


	appIcon = new Tray('./web.png');
	appIcon.setToolTip('Podcast');

	var contextMenu = Menu.buildFromTemplate([
		{ label: 'Dev Tools', click: function() { window.toggleDevTools(); } },
		{ label: 'Exit', click: function() { window.destroy(); GlobalShortcut.unregisterAll(); app.quit(); } }
	]);

	appIcon.setContextMenu(contextMenu);

	appIcon.on('clicked', function() {
		// window.show();
		app.quit();
	});


	GlobalShortcut.register('F5', function() {
		window.webContents.reload();
	});

	GlobalShortcut.register('Ctrl+R', function() {
		window.webContents.reload();
	});

	GlobalShortcut.register('MediaPlayPause', function() {
		window.webContents.send('key', 'MediaPlayPause');
	});

	GlobalShortcut.register('MediaNextTrack', function() {
		window.webContents.send('key', 'MediaNextTrack');
	});

	GlobalShortcut.register('MediaPreviousTrack', function() {
		window.webContents.send('key', 'MediaPreviousTrack');
	});
});