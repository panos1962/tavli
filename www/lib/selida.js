"use strict";

var selida = {};

selida.readyCount = 2;

selida.ready = function() {
	selida.readyCount--;

	if (selida.readyCount)
	return;

	selida.toolbarDOM = $('#toolbar');
	selida.ribbonDOM = $('#ribbon');
	selida.fyiDOM = $('#fyi');
	selida.ofelimoDOM = $('#ofelimo');

	selida.windowDOM.on('resize', selida.onResize);

	if (selida.init)
	selida.init();

	selida.windowDOM.trigger('resize');
	return selida;
};

selida.windowDOM = $(window).ready(selida.ready);
selida.bodyDOM = $(document.body).ready(selida.ready);

selida.onResize = function() {
	let h = selida.windowDOM.innerHeight();

	h -= selida.toolbarDOM.outerHeight(true);
	h -= selida.ribbonDOM.outerHeight(true);
	h -= selida.fyiDOM.outerHeight(true);

	selida.ofelimoDOM.height(0);
	h -= selida.ofelimoDOM.outerHeight(true);

	selida.ofelimoDOM.height(h);

	return selida;
};
