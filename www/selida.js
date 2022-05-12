"use strict";

Selida.init = function() {
	Selida.tab({
		'html': 'Εγγραφή',
		'link': 'egrafi',
		'target': '_self',
	}).appendTo(Selida.toolbarRightDOM);

	Selida.fyiPrint(
		'Εγγραφείτε, ή εισέλθετε στον «Ταβλαδόρο» για να παίξετε τάβλι!',
		{
			"idos": "Message",
			"stixisi": "Right",
			"duration": 10000
		}
	);
};
