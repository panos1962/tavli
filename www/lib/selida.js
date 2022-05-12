"use strict";

///////////////////////////////////////////////////////////////////////////////@

$(function() {
	Selida.windowDOM = $(window);
	Selida.bodyDOM = $(document.body);
	Selida.toolbarDOM = $('#toolbar');
	Selida.toolbarLeftDOM = $('#toolbarLeft');
	Selida.toolbarRightDOM = $('#toolbarRight');
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

		let target = $(this).data('target');

		if (!target)
		target = Selida.tabTargetDefault;

		window.open(link, target);
	});

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.toolbarSetup = function() {
	return Selida;
};

Selida.arxikiTab = function() {
	Selida.toolbarLeftDOM.
	prepend(Selida.tab(self.opener ? {
		'html': 'Κλείσιμο',
		'klisimo': true,
	} : {
		'html': 'Αρχική',
		'link': Selida.baseUrl,
	}));

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.ribbonSetup = function() {
	Selida.ribbonCenterDOM.
	prepend(Selida.tab({
		'html': 'Όροι χρήσης',
		'link': 'xrisi',
		'target': Selida.isSelida('xrisi') ? '_self' : '_blank',
	}));

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.tabTargetDefault = '_self';

Selida.tab = function(opts) {
	if (!opts.hasOwnProperty('html'))
	throw new Error('undefined tab html');

	let dom = $('<div>').addClass('tab').html(opts.html);

	if (opts.title)
	dom.prop('title', opts.title)

	if (opts.klisimo)
	return dom.data('klisimo', true).addClass('linkTab');

	if (!opts.link)
	return dom;

	if (!opts.target)
	opts.target = Selida.tabTargetDefault;

	dom.
	data('link', Selida.url(opts.link)).
	data('target', opts.target).
	addClass('linkTab');

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

Selida.isSelida = function(selida) {
	if (selida === undefined)
	return false;

	if (!self.hasOwnProperty('location'))
	return false;

	if (!self.location.hasOwnProperty('pathname'))
	return false;

	if (selida.substr(0, 1) !== '/')
	selida = '/' + selida;

	selida = Selida.pathRoot + selida + '/';

	return (self.location.pathname === selida);
};

Selida.isArxiki = function() {
	return Selida.isSelida('/');
};

///////////////////////////////////////////////////////////////////////////////@

Selida.promptAlign = function(flist) {
	let w = 0;

	flist.each(function() {
		let d = $(this).width();

		if (d > w)
		w = d;
	});

	flist.each(function() {
		$(this).width(w);
	});

	return Selida;
};
