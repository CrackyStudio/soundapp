import { app, BrowserWindow, Tray, Menu, ipcMain } from "electron";
import * as path from "path";
import * as debug from "electron-debug";

// debug();

const iconPath = __dirname + "/assets/sc-icon.png";
const defaultTitle = "SoundCloud Desktop";
let mainWindow: Electron.BrowserWindow;
let appTray: Tray = null;

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
			label: "Pause",
			click: () => {
				mainWindow.webContents.executeJavaScript(`document.getElementById("browser").send("pause-music")`);
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
	appTray.setToolTip(defaultTitle);

	mainWindow.on("close", () => {
		mainWindow = null;
	});

	appTray.on("click", () => {
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

ipcMain.on("set-tooltip", (_event, title = defaultTitle) => {
	appTray.setToolTip(title);
});
