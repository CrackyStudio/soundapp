import { ipcRenderer } from "electron";

ipcRenderer.on("show-music", (event, data) => {
	(<HTMLElement>document.getElementsByClassName(data.id)[0]).click();
});
