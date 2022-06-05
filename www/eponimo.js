"use strict";

var Kafenes = {};

Selida.init = function() {
	$('#arxikiXrisi').
	addClass('linkTab').
	data({
		'link': 'xrisi',
		'target': '_blank',
	});

	Selida.tab({
		'html': Selida.xristis,
		'link': 'account',
		'target': '_blank',
	}).appendTo(Selida.toolbarRightDOM);
	Selida.tab({
		'html': 'Έξοδος',
		'link': '/lib/exodos.php',
		'target': '_self',
	}).appendTo(Selida.toolbarRightDOM);

	Kafenes.pektisAreaDOM = $('#pektisArea');
	Kafenes.kafenioAreaDOM = $('#kafenioArea');
	Kafenes.partidaAreaDOM = $('#partidaArea');
	Kafenes.toolkitMainDOM = $('#toolkitMain');
	Kafenes.pasAreaDOM = $('#pasArea');
	Kafenes.toolkitPasDOM = $('#toolkitPas');
};

Selida.resize = function() {
	let w = Selida.ofelimoDOM.innerWidth();

	w -= Kafenes.pektisAreaDOM.outerWidth(true);
	w -= Kafenes.kafenioAreaDOM.outerWidth(true);
	w -= Kafenes.partidaAreaDOM.outerWidth(true);
	w -= Kafenes.toolkitMainDOM.outerWidth(true);
	w -= Kafenes.toolkitPasDOM.outerWidth(true);

	Kafenes.pasAreaDOM.css('width', w + 'px');
};
