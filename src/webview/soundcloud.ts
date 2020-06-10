import { ipcRenderer } from "electron";

export default {
	showMusic: () => {
		ipcRenderer.on("show-music", (_event, data) => {
			(<HTMLElement>document.getElementsByClassName(data.id)[0]).click();
		});
	},
	setTooltip: () => {
		ipcRenderer.on("set-tooltip", (_event, data) => {
			const user = (<HTMLElement>document.getElementsByClassName("playbackSoundBadge__lightLink")[0]).innerText;
			const title = (<HTMLElement>document.getElementsByClassName("playbackSoundBadge__titleLink")[0]).title;

			data ? ipcRenderer.send("set-tooltip") : ipcRenderer.send("set-tooltip", `${user} - ${title}`);
		});
	},
	pauseMusic: () => {
		ipcRenderer.on("pause-music", () => {
			(<HTMLElement>document.getElementsByClassName("playControl")[0]).click();
		});
	},
	recolor: () => {
		ipcRenderer.on("recolor", () => {
			const sheet = (() => {
				const style = document.createElement("style");

				style.appendChild(document.createTextNode(""));
				document.head.appendChild(style);

				return style.sheet;
			})();

			(<CSSStyleSheet>sheet).insertRule(
				"html, body, .l-top, .playControls__bg, .l-container, .sc-button-group, .sc-button-small, .sc-button-medium, .sound__soundActions, .soundActions__purchaseLink, .commentForm__wrapper, .commentForm__input, .visualSound__wrapper, .commentItem, .l-sidebar-right, .volume__sliderWrapper, .soundBadge__additional , .soundBadge__additional:hover {background-color: #333 !important; background: none;}"
			);
			(<CSSStyleSheet>sheet).insertRule(
				".userNetworkTop__title {height: 100px; display: flex; align-items: center}"
			);
			(<CSSStyleSheet>sheet).insertRule(".g-tabs-link.active {color: #f50 !important;}");
			(<CSSStyleSheet>sheet).insertRule(".g-tabs-link, .g-link-collapse {color: #ccc !important;}");
			(<CSSStyleSheet>sheet).insertRule(".g-tabs-link:not(.active):hover {color: black !important;}");
			(<CSSStyleSheet>sheet).insertRule(".header__inner {border-bottom: 1px solid #f50;}");
			(<CSSStyleSheet>sheet).insertRule(".header__inner, .playControls__bg {border-top: 1px solid #f50;}");
			(<CSSStyleSheet>sheet).insertRule(".sc-button-group {height: 26.8px;}");
			(<CSSStyleSheet>sheet).insertRule(".sc-button-responsive {padding-top: 3px;}");
			(<CSSStyleSheet>sheet).insertRule(".commentForm__wrapper, .listenEngagement {border: none !important;}");
			(<CSSStyleSheet>sheet).insertRule(".commentForm__input {border: 1px solid #f50 !important;}");
			(<CSSStyleSheet>sheet).insertRule(
				".playControls__control, .volume__button, .sc-button-small:not(.sc-button-selected):before, .sc-button-medium:not(.sc-button-selected):before {filter: invert(100%) sepia(0%) saturate(7435%) hue-rotate(324deg) brightness(101%) contrast(101%);}"
			);
			(<CSSStyleSheet>sheet).insertRule(
				".playbackSoundBadge__showQueue > svg > path, .cast_caf_state_d {fill: #ffffff !important;}"
			);
			(<CSSStyleSheet>sheet).insertRule(
				".sc-button-small, .sc-button-medium, .soundActions__purchaseLink, .sc-type-small > div > p, .commentItem__body, .soundTitle__title, .userNetworkTop__title > a, .localeSelector > span, .sc-truncate {color: white !important;}"
			);
			(<CSSStyleSheet>sheet).insertRule(
				".sc-button-small:hover, .sc-button-medium:hover {color: white; border: 1px solid #f50;}"
			);
			(<CSSStyleSheet>sheet).insertRule(
				".soundActions__purchaseLink:hover, .truncatedAudioInfo__collapse:hover, .sc-ministats:not(.sc-ministats-plays):hover, .sidebarHeader:hover, .commentItem__usernameLink:hover, .commentItem__timestampLink:hover, .sc-link-dark:hover, .soundTitle__usernameText:hover, .localeSelector:hover, .reportCopyright:hover > span, .sc-truncate:hover {color: #f50 !important;}"
			);
			(<CSSStyleSheet>sheet).insertRule(
				".truncatedAudioInfo__wrapper:after, .soundBadge__additional , .soundBadge__additional:hover {background: none !important;}"
			);
			(<CSSStyleSheet>sheet).insertRule(".reportCopyright:hover {border: none !important;}");
		});
	},
};
