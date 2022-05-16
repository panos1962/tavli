"use strict";

var Arxiki = {};

Selida.init = function() {
	$('#arxikiXrisi').
	addClass('linkTab').
	data({
		'link': 'xrisi',
		'target': '_blank',
	});

	if (Selida.isXristis()) {
		Selida.tab({
			'html': Selida.xristis,
			'link': 'account',
			'target': '_self',
		}).appendTo(Selida.toolbarRightDOM);
		Selida.tab({
			'html': 'Έξοδος',
			'link': '/lib/exodos.php',
			'target': '_self',
		}).appendTo(Selida.toolbarRightDOM);
	}

	else {
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
	}
};
