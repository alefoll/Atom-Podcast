var app  = require('app'),
	Menu = require('menu'),
	Tray = require('tray');

var BrowserWindow = require('browser-window');

// Report crashes to our server.
require('crash-reporter').start();

var mainWindow = null;
var appIcon = null;

app.on('window-all-closed', function() {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', function() {
	var size = require('screen').getPrimaryDisplay().workAreaSize;

	// mainWindow = new BrowserWindow({ width: size.width, height: size.height, frame: false });
	mainWindow = new BrowserWindow({ width: 800, height: 600, frame: false });

	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	appIcon = new Tray('./web.png');

	var contextMenu = Menu.buildFromTemplate([
		{ label: 'Dev Tools', click: function() { mainWindow.toggleDevTools(); } },
		{ label: 'Exit', click: function() { mainWindow.close(); } }
	]);

	appIcon.on('clicked', function() {
		mainWindow.focus();
	});

	appIcon.setToolTip('Podcast');
	appIcon.setContextMenu(contextMenu);
});