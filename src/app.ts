import * as $ from "jquery";
import { remote, WebviewTag } from "electron";

const win = remote.getCurrentWindow();
const webview = <WebviewTag>document.getElementById("browser");

$("#exit").click(function () {
	win.close();
});

webview.addEventListener("dom-ready", function () {
	webview.insertCSS("::-webkit-scrollbar { display: none; }");
});
