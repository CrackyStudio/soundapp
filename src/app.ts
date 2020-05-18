import * as $ from "jquery";
import { remote, WebviewTag } from "electron";

const win = remote.getCurrentWindow();
const webview = <WebviewTag>document.getElementById("browser");

$(".exit").click(() => {
	win.close();
});

$(".back").click(() => {
	webview.goBack();
});

$(".forward").click(() => {
	webview.goForward();
});

webview.addEventListener("dom-ready", () => {
	webview.insertCSS("::-webkit-scrollbar { display: none; }");
});

webview.addEventListener("media-started-playing", () => {
	webview.send("show-music", {
		id: "playbackSoundBadge__titleLink ",
	});
});
