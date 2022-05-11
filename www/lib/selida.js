"use strict";

///////////////////////////////////////////////////////////////////////////////@

$(function() {
	Selida.windowDOM = $(window);
	Selida.bodyDOM = $(document.body);

	Selida.toolbarDOM = $('#toolbar');
	Selida.toolbarLeftDOM = $('#toolbarLeft');
	Selida.ribbonDOM = $('#ribbon');
	Selida.ribbonCenterDOM = $('#ribbonCenter');
	Selida.ribbonRightDOM = $('#ribbonRight');
	Selida.fyiDOM = $('#fyi');
	Selida.ofelimoDOM = $('#ofelimo');

	if (Selida.init)
	Selida.init();

	Selida.bodySetup();
	Selida.toolbarSetup();
	Selida.ribbonSetup();

	Selida.windowDOM.
	on('resize', Selida.fixHeight);
	Selida.windowDOM.trigger('resize');
	setTimeout(Selida.fixHeight, 100);

	return Selida;
});

Selida.fixHeight = function() {
	let h;
	let o;

	Selida.ofelimoDOM.css('height', '');

	h = Selida.windowDOM.innerHeight();
	o = Selida.ofelimoDOM.innerHeight();


	h -= Selida.toolbarDOM.outerHeight(true);
	h -= Selida.ribbonDOM.outerHeight(true);
	h -= Selida.fyiDOM.outerHeight(true);

	Selida.ofelimoDOM.height(0);
	h -= Selida.ofelimoDOM.outerHeight(true);

	if (Selida.bodyDOM.css('overflow') === 'hidden')
	Selida.ofelimoDOM.height(h);

	else if (o < h)
	Selida.ofelimoDOM.height(h);

	else
	Selida.ofelimoDOM.css('height', '');

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.bodySetup = function() {
	Selida.bodyDOM.on('click', '.linkTab', function(e) {
		e.preventDefault();
		e.stopPropagation();

		if ($(this).data('klisimo'))
		return window.close();

		let link = $(this).data('link');

		if (!link)
		return;

		window.open(link);
	});

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.toolbarSetup = function() {
	if (window.location.pathname !== '/tavli/')
	Selida.toolbarLeftDOM.
	prepend(Selida.tab({
		'html': 'Κλείσιμο',
		'klisimo': true,
	}));

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.ribbonSetup = function() {
	Selida.ribbonCenterDOM.
	prepend(Selida.tab({
		'html': 'Όροι χρήσης',
		'link': 'xrisi',
	}));

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.tab = function(opts) {
	if (!opts.hasOwnProperty('html'))
	throw new Error('undefined tab html');

	let dom = $('<div>').addClass('tab').html(opts.html);

	if (opts.title)
	dom.prop('title', opts.title)

	if (opts.klisimo)
	dom.data('klisimo', true).addClass('linkTab');

	else if (opts.link)
	dom.data('link', Selida.url(opts.link)).addClass('linkTab');

	return dom;
}

///////////////////////////////////////////////////////////////////////////////@

Selida.fyiTimer = undefined;
Selida.fyiDuration = 5000;

Selida.fyiPrint = function(msg, opts) {
	let cls = '';

	if (Selida.fyiTimer)
	clearTimeout(Selida.fyiTimer);

	if (msg === undefined)
	msg = 'Unknown error';

	if (opts === undefined)
	opts = {};

	if (opts.idos)
	cls = cls + ' fyi' + opts.idos;

	if (opts.stixisi)
	cls = cls + ' fyi' + opts.stixisi;

	Selida.fyiDOM.removeClass();

	if (cls)
	Selida.fyiDOM.addClass(cls);

	Selida.fyiDOM.text(msg);
	Selida.fyiTimer = setTimeout(Selida.fyiClear,
		opts.duration ? opts.duration : Selida.fyiDuration);

	return Selida;
}

Selida.fyiMessageLeft = function(msg) {
	Selida.fyiPrint(msg, {
		"idos": "Message",
		"stixisi": "Left",
	});

	return Selida;
};

Selida.fyiMessageRight = function(msg) {
	Selida.fyiPrint(msg, {
		"idos": "Message",
		"stixisi": "Right",
	});

	return Selida;
};

Selida.fyiMessage = Selida.fyiMessageLeft;

Selida.fyiErrorLeft = function(msg) {
	Selida.fyiPrint(msg, {
		"idos": "Error",
		"stixisi": "Left",
	});

	return Selida;
};

Selida.fyiErrorRight = function(msg) {
	Selida.fyiPrint(msg, {
		"idos": "Error",
		"stixisi": "Right",
	});

	return Selida;
};

Selida.fyiError = Selida.fyiErrorLeft;

Selida.fyiClear = function() {
	Selida.fyiTimer = undefined;
	Selida.fyiDOM.removeClass().html('&#8203;');

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.url = function(s) {
	if (s.match(/https?:\/\//))
	return s;

	if (s.substr(0, 1) !== '/')
	s = '/' + s;

	return Selida.baseUrl + s;
}

///////////////////////////////////////////////////////////////////////////////@
