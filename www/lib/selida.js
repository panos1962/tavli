"use strict";

var Selida = {};

Selida.resizeTimer = undefined;

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
	on('resize', function() {
		if (Selida.resizeTimer)
		clearTimeout(Selida.resizeTimer);

		Selida.resizeTimer = setTimeout(Selida.resizeInit, 300);
	});

	Selida.resizeInit();
	return Selida;
});

Selida.resizeInit = function() {
	let h;
	let o;

	Selida.resizeTimer = undefined;

	Selida.ofelimoDOM.css('height', '');

	h = Selida.windowDOM.innerHeight();
	o = Selida.ofelimoDOM.innerHeight();

	h -= Selida.toolbarDOM.outerHeight(true);
	h -= Selida.ribbonDOM.outerHeight(true);
	h -= Selida.fyiDOM.outerHeight(true);
	h -= Selida.ofelimoDOM.outerHeight(true);
	h += Selida.ofelimoDOM.innerHeight();

	if (Selida.bodyDOM.css('overflow') === 'hidden')
	Selida.ofelimoDOM.height(h);

	else if (o < h)
	Selida.ofelimoDOM.height(h);

	else
	Selida.ofelimoDOM.css('height', '');

	Selida.ribbonDOM.css('visibility', 'visible');

	if (Selida.hasOwnProperty('resize'))
	Selida.resize();

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.bodySetup = function() {
	Selida.bodyDOM.on('click', '.tab', function(e) {
		e.preventDefault();
		e.stopPropagation();

		let tab = $(this).data('tabData');

		if (!tab)
		return;

		if (tab.klisimo)
		return window.close();

		if (tab.action)
		return tab.action($(this));

		let link = tab.link;

		if (!link)
		return;

		let target = tab.target;

		if (!target)
		target = Selida.tabTargetDefault;

		window.open(Selida.url(link), target);
	});

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.toolbarSetup = function() {
	Selida.arxikiTab();

	return Selida;
};

Selida.arxikiTab = function() {
	if (Selida.isArxiki())
	return Selida;

	Selida.toolbarLeftDOM.
	prepend(Selida.tab(self.opener && (self.opener !== self.window) ? {
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

Selida.tab = function(props) {
	if (props === undefined)
	props = {};

	if (!props.hasOwnProperty('html'))
	props.html = '&nbsp;';

	let dom = $('<div>').
	data('tabData', props).
	addClass('tab').
	html(props.html);

	if (props.link)
	dom.addClass('linkTab');

	if (props.title)
	dom.prop('title', props.title)

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

	if (selida.substr(-1, 1) !== '/')
	selida += '/';

	selida = Selida.pathRoot + selida;

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

Selida.formaAkiro = function(e, url) {
	e.stopPropagation();
	e.preventDefault();

	if (self.opener && (self.opener !== self.window))
	return self.close();

	if (url === undefined)
	url = Selida.baseUrl;

	self.location = url;
};

Selida.formaSpotFocus = function() {
	Selida.bodyDOM.on('focus', '.pedioInput', function(e) {
		$(this).closest('.inputEnotita').
		addClass('inputEnotitaFocus');
	});

	Selida.bodyDOM.on('blur', '.pedioInput', function(e) {
		$(this).closest('.inputEnotita').
		removeClass('inputEnotitaFocus');
	});
};

///////////////////////////////////////////////////////////////////////////////@

Selida.isXristis = function() {
	return Selida.xristis;
};

Selida.oxiXristis = function() {
	return !Selida.isXristis();
};

///////////////////////////////////////////////////////////////////////////////@
