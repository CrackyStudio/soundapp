import { app, BrowserWindow, Tray, Menu } from "electron";
import * as path from "path";
import * as debug from "electron-debug";

// debug();

const iconPath = __dirname + "/assets/sc-icon.png";
let mainWindow: Electron.BrowserWindow;
let appTray = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		frame: false,
		height: 605,
		icon: iconPath,
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			webviewTag: true,
		},
		width: 1080,
	});

	mainWindow.loadFile(path.join(__dirname, "./index.html"));

	// mainWindow.webContents.openDevTools();

	appTray = new Tray(iconPath);

	const contextMenu = Menu.buildFromTemplate([
		{
			label: "Show",
			click: () => {
				mainWindow.show();
			},
		},
		{
			type: "separator",
		},
		{
			label: "Quit",
			click: () => {
				app.quit();
			},
		},
	]);

	appTray.setContextMenu(contextMenu);
	appTray.setToolTip("SoundCloud Desktop");

	mainWindow.on("close", (e) => {
		mainWindow = null;
	});

	appTray.on("click", (e) => {
		mainWindow.show();
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
