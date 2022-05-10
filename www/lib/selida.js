"use strict";

var selida = {};

///////////////////////////////////////////////////////////////////////////////@

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
	selida.fyiClear();

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

///////////////////////////////////////////////////////////////////////////////@

selida.fyiTimer = undefined;
selida.fyiDuration = 5000;

selida.fyiPrint = function(msg, opts) {
	let cls = '';

	if (selida.fyiTimer)
	clearTimeout(selida.fyiTimer);

	if (msg === undefined)
	msg = 'Unknown error';

	if (opts === undefined)
	opts = {};

	if (opts.idos)
	cls = cls + ' fyi' + opts.idos;

	if (opts.stixisi)
	cls = cls + ' fyi' + opts.stixisi;

	selida.fyiDOM.removeClass();

	if (cls)
	selida.fyiDOM.addClass(cls);

	selida.fyiDOM.text(msg);
	selida.fyiTimer = setTimeout(selida.fyiClear, selida.fyiDuration);

	return selida;
}

selida.fyiMessageLeft = function(msg) {
	selida.fyiPrint(msg, {
		"idos": "Message",
		"stixisi": "Left",
	});

	return selida;
};

selida.fyiMessageRight = function(msg) {
	selida.fyiPrint(msg, {
		"idos": "Message",
		"stixisi": "Right",
	});

	return selida;
};

selida.fyiMessage = selida.fyiMessageLeft;

selida.fyiErrorLeft = function(msg) {
	selida.fyiPrint(msg, {
		"idos": "Error",
		"stixisi": "Left",
	});

	return selida;
};

selida.fyiErrorRight = function(msg) {
	selida.fyiPrint(msg, {
		"idos": "Error",
		"stixisi": "Right",
	});

	return selida;
};

selida.fyiError = selida.fyiErrorLeft;

selida.fyiClear = function() {
	selida.fyiTimer = undefined;
	selida.fyiDOM.removeClass().html('&#8203;');

	return selida;
};

///////////////////////////////////////////////////////////////////////////////@
