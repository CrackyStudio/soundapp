import { ipcRenderer } from "electron";

ipcRenderer.on("show-music", function (event, data) {
	(<HTMLElement>document.getElementsByClassName(data.id)[0]).click();
});
