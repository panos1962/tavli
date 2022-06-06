"use strict";

var Welcome = {};

Selida.init = function() {
	$('#arxikiXrisi').
	addClass('linkTab').
	data({
		'link': 'xrisi',
		'target': '_blank',
	});

	Selida.tab({
		'html': 'Εγγραφή',
		'link': 'account',
		'target': '_self',
	}).appendTo(Selida.toolbarRightDOM);
	Selida.tab({
		'html': 'Είσοδος',
		'link': 'isodos',
		'target': '_self',
	}).appendTo(Selida.toolbarRightDOM);
	Selida.fyiPrint(
		'Εγγραφείτε, ή εισέλθετε στον «Ταβλαδόρο» για να παίξετε τάβλι!',
		{
			'idos': 'Message',
			'stixisi': 'Right',
			'duration': 10000
		}
	);
};
