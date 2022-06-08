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

	Kafenes.panelMainDOM = $('#panelMain');

	Kafenes.pektisAreaDOM = $('#pektisArea');
	Kafenes.panelPektisDOM = $('#panelPektis');

	Kafenes.kafenioAreaDOM = $('#kafenioArea');
	Kafenes.panelKafenioDOM = $('#panelKafenio');

	Kafenes.partidaAreaDOM = $('#partidaArea');
	Kafenes.panelPartidaDOM = $('#panelPartida');

	Kafenes.pasAreaDOM = $('#pasArea');
	Kafenes.panelProsklisiDOM = $('#panelProsklisi');
	Kafenes.prosklisiAreaDOM = $('#prosklisiArea');
	Kafenes.panelAnazitisiDOM = $('#panelAnazitisi');
	Kafenes.anazitisiAreaDOM = $('#anazitisiArea');
	Kafenes.panelSizitisiDOM = $('#panelSizitisi');
	Kafenes.sizitisiAreaDOM = $('#sizitisiArea');
	Kafenes.panelPasDOM = $('#panelPas');

	Kafenes.panelMainSetup();
	Kafenes.panelPektisSetup();
	Kafenes.panelKafenioSetup();
	Kafenes.panelPartidaSetup();
	Kafenes.panelPasSetup();
	Kafenes.panelProsklisiSetup();
	Kafenes.panelAnazitisiSetup();
	Kafenes.panelSizitisiSetup();

	Selida.bodyDOM.
	on('mousemove', function(e) {
		Kafenes.mousemove(e);
	}).
	on('mouseup', function(e) {
		e.preventDefault();
		e.stopPropagation();
		Kafenes.mousemove = Kafenes.mousemoveDefault;
	});
};

Selida.resize = function() {
	let h = Selida.ofelimoDOM.height();

	Kafenes.panelMainDOM.height(h);

	Kafenes.pektisAreaDOM.height(h);
	Kafenes.panelPektisDOM.height(h);

	Kafenes.kafenioAreaDOM.height(h);
	Kafenes.panelKafenioDOM.height(h);

	Kafenes.partidaAreaDOM.height(h);
	Kafenes.panelPartidaDOM.height(h);

	Kafenes.pasAreaDOM.height(h);
	Kafenes.panelPasDOM.height(h);
	Kafenes.pasResize();

	let w = Selida.ofelimoDOM.innerWidth();

	w -= Kafenes.panelMainDOM.outerWidth(true);
	w -= Kafenes.pektisAreaDOM.outerWidth(true);
	w -= Kafenes.panelPektisDOM.outerWidth(true);
	w -= Kafenes.kafenioAreaDOM.outerWidth(true);
	w -= Kafenes.panelKafenioDOM.outerWidth(true);
	w -= Kafenes.partidaAreaDOM.outerWidth(true);
	w -= Kafenes.panelPartidaDOM.outerWidth(true);
	w -= Kafenes.panelPasDOM.outerWidth(true);

	if (w < 0)
	w = 0;

	Kafenes.pasAreaDOM.width(w);
};

Kafenes.pasResize = function() {
	let h = Selida.ofelimoDOM.innerHeight();

	h -= Kafenes.panelProsklisiDOM.outerHeight(true);
	h -= Kafenes.prosklisiAreaDOM.outerHeight(true);

	h -= Kafenes.panelAnazitisiDOM.outerHeight(true);
	h -= Kafenes.anazitisiAreaDOM.outerHeight(true);

	h -= Kafenes.panelSizitisiDOM.outerHeight(true);

	Kafenes.sizitisiAreaDOM.css('height', h + 'px');

	return Kafenes;
};

Kafenes.pasSizeReset = function() {
	Kafenes.prosklisiAreaDOM.css('height', '');
	Kafenes.anazitisiAreaDOM.css('height', '');
	Kafenes.sizitisiAreaDOM.css('height', '');

	return Kafenes;
};

Kafenes.mousemove =
Kafenes.mousemoveDefault = function(e) {
	e.preventDefault();
	e.stopPropagation();
};

Kafenes.mouseup =
Kafenes.mouseupDefault = function(e) {
	e.preventDefault();
	e.stopPropagation();

	Kafenes.mousemove = Kafenes.mousemoveDeault;
};

///////////////////////////////////////////////////////////////////////////////@

Kafenes.panelMainSetup = function() {
	Kafenes.panelMain = new Panel.panel({
		'vh': 'V',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/panel/resize.gif',
				'title': 'Επαναφορά περιοχών',
				'action': function() {
					Kafenes.pektisAreaDOM.css('width', '');
					Kafenes.kafenioAreaDOM.css('width', '');
					Kafenes.partidaAreaDOM.css('width', '');
					Kafenes.pasAreaDOM.css('width', '');
					Selida.resize();
				},
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelMain.domGet();
	Kafenes.panelMainDOM.replaceWith(dom);
	Kafenes.panelMainDOM = dom;

	return Kafenes;
};

Kafenes.panelPektisSetup = function() {
	Kafenes.panelPektis = new Panel.panel({
		'vh': 'V',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/misc/baraH.png',
				'title': 'Αυξομείωση περιοχής',
				'siromeno': true,
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelPektis.domGet();
	Kafenes.panelPektisDOM.replaceWith(dom);
	Kafenes.panelPektisDOM = dom;

	dom.on('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();

		dom.
		data('mousedownData', {
			'pageX': e.pageX,
			'pektisW': Kafenes.pektisAreaDOM.width(),
			'kafenioW': Kafenes.kafenioAreaDOM.width(),
			'partidaW': Kafenes.partidaAreaDOM.width(),
			'pasW': Kafenes.pasAreaDOM.width(),
		});

		Kafenes.mousemove = Kafenes.pektisResize;
	});

	return Kafenes;
};

Kafenes.trapeziAreaWidthMax = 720;

Kafenes.pektisResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelPektisDOM.data('mousedownData');
	let dx = data.pageX - e.pageX;
	let pw = data.pektisW
	let kw = data.kafenioW;
	let rw = data.partidaW;
	let sw = data.pasW;

	let dxMin = -(kw + rw + sw);
	let dxMax = pw;

	if (dx < dxMin)
	dx = dxMin;

	else if (dx > dxMax)
	dx = dxMax;

	kw += dx;
	pw -= dx;

	if (kw < 0) {
		rw += kw;
		kw = 0;
	}

/*
	else if (kw > Kafenes.trapeziAreaWidthMax) {
		rw += kw - Kafenes.trapeziAreaWidthMax;
		kw = Kafenes.trapeziAreaWidthMax;
	}
*/

	if (rw < 0) {
		sw += rw;
		rw = 0;
	}

	if (pw < 0)
	pw = 0;

	Kafenes.pektisAreaDOM.width(pw);
	Kafenes.kafenioAreaDOM.width(kw);
	Kafenes.partidaAreaDOM.width(rw);
	Kafenes.pasAreaDOM.width(sw);
};

Kafenes.panelKafenioSetup = function() {
	Kafenes.panelKafenio = new Panel.panel({
		'vh': 'V',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/misc/baraH.png',
				'title': 'Αυξομείωση περιοχής',
				'siromeno': true,
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelKafenio.domGet();
	Kafenes.panelKafenioDOM.replaceWith(dom);
	Kafenes.panelKafenioDOM = dom;

	dom.on('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();

		dom.
		data('mousedownData', {
			'pageX': e.pageX,
			'pektisW': Kafenes.pektisAreaDOM.width(),
			'kafenioW': Kafenes.kafenioAreaDOM.width(),
			'partidaW': Kafenes.partidaAreaDOM.width(),
			'pasW': Kafenes.pasAreaDOM.width(),
		});

		Kafenes.mousemove = Kafenes.kafenioResize;
	});

	return Kafenes;
};

Kafenes.kafenioResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelKafenioDOM.data('mousedownData');
	let dx = data.pageX - e.pageX;
	let pw = data.pektisW
	let kw = data.kafenioW;
	let rw = data.partidaW;
	let sw = data.pasW;

	let dxMin = -(rw + sw);
	let dxMax = kw + pw;

	if (dx < dxMin)
	dx = dxMin;

	else if (dx > dxMax)
	dx = dxMax;

	rw += dx;
	kw -= dx;

	if (rw < 0) {
		sw += rw;
		rw = 0;
	}

	if (kw < 0) {
		pw += kw;
		kw = 0;
	}

/*
	else if (kw > Kafenes.trapeziAreaWidthMax) {
		pw += kw - Kafenes.trapeziAreaWidthMax;
		kw = Kafenes.trapeziAreaWidthMax;
	}
*/

	if (pw < 0)
	pw = 0;

	Kafenes.pektisAreaDOM.width(pw);
	Kafenes.kafenioAreaDOM.width(kw);
	Kafenes.partidaAreaDOM.width(rw);
	Kafenes.pasAreaDOM.width(sw);
};

Kafenes.panelPartidaSetup = function() {
	Kafenes.panelPartida = new Panel.panel({
		'vh': 'V',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/misc/baraH.png',
				'title': 'Αυξομείωση περιοχής',
				'siromeno': true,
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelPartida.domGet();
	Kafenes.panelPartidaDOM.replaceWith(dom);
	Kafenes.panelPartidaDOM = dom;

	dom.on('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();

		dom.
		data('mousedownData', {
			'pageX': e.pageX,
			'pektisW': Kafenes.pektisAreaDOM.width(),
			'kafenioW': Kafenes.kafenioAreaDOM.width(),
			'partidaW': Kafenes.partidaAreaDOM.width(),
			'pasW': Kafenes.pasAreaDOM.width(),
		});

		Kafenes.mousemove = Kafenes.partidaResize;
	});

	return Kafenes;
};

Kafenes.partidaResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelPartidaDOM.data('mousedownData');
	let dx = data.pageX - e.pageX;
	let pw = data.pektisW
	let kw = data.kafenioW;
	let rw = data.partidaW;
	let sw = data.pasW;

	let dxMin = -sw;
	let dxMax = pw + kw + rw;

	if (dx < dxMin)
	dx = dxMin;

	else if (dx > dxMax)
	dx = dxMax;

	sw += dx;
	rw -= dx;

	if (rw < 0) {
		kw += rw;
		rw = 0;
	}

	if (kw < 0) {
		pw += kw;
		kw = 0;
	}

	if (pw < 0)
	pw = 0;

	Kafenes.pektisAreaDOM.width(pw);
	Kafenes.kafenioAreaDOM.width(kw);
	Kafenes.partidaAreaDOM.width(rw);
	Kafenes.pasAreaDOM.width(sw);
};

Kafenes.panelPasSetup = function() {
	Kafenes.panelPas = new Panel.panel({
		'vh': 'V',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelPas.domGet();
	Kafenes.panelPasDOM.replaceWith(dom);
	Kafenes.panelPasDOM = dom;

	return Kafenes;
};

Kafenes.panelProsklisiSetup = function() {
	Kafenes.panelProsklisi = new Panel.panel({
		'vh': 'H',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/panel/resize.gif',
				'title': 'Επαναφορά περιοχών',
				'action': function() {
					Kafenes.pasSizeReset();
					Kafenes.pasResize();
				},
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelProsklisi.domGet();
	Kafenes.panelProsklisiDOM.replaceWith(dom);
	Kafenes.panelProsklisiDOM = dom;

	return Kafenes;
};

Kafenes.panelAnazitisiSetup = function() {
	Kafenes.panelAnazitisi = new Panel.panel({
		'vh': 'H',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/misc/baraV.png',
				'title': 'Αυξομείωση περιοχής',
				'siromeno': true,
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelAnazitisi.domGet();
	Kafenes.panelAnazitisiDOM.replaceWith(dom);
	Kafenes.panelAnazitisiDOM = dom;

	dom.on('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();

		dom.
		data('mousedownData', {
			'pageY': e.pageY,
			'pektisW': Kafenes.pektisAreaDOM.width(),
			'kafenioW': Kafenes.kafenioAreaDOM.width(),
			'partidaW': Kafenes.partidaAreaDOM.width(),
			'pasW': Kafenes.pasAreaDOM.width(),
			'prosklisiH': Kafenes.prosklisiAreaDOM.height(),
			'anazitisiH': Kafenes.anazitisiAreaDOM.height(),
			'sizitisiH': Kafenes.sizitisiAreaDOM.height(),
		});

		Kafenes.mousemove = Kafenes.anazitisiResize;
	});

	return Kafenes;

};

Kafenes.anazitisiResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelAnazitisiDOM.data('mousedownData');
	let dy = data.pageY - e.pageY;
	let ph = data.prosklisiH;
	let ah = data.anazitisiH;
	let sh = data.sizitisiH;

	let dyMin = -(ah + sh);
	let dyMax = ph;

	if (dy < dyMin)
	dy = dyMin;

	else if (dy > dyMax)
	dy = dyMax;

	ah += dy;
	ph -= dy;

	if (ah < 0) {
		sh += ah;
		ah = 0;
	}

	Kafenes.sizitisiAreaDOM.height(sh);
	Kafenes.anazitisiAreaDOM.height(ah);
	Kafenes.prosklisiAreaDOM.height(ph);
};

Kafenes.panelSizitisiSetup = function() {
	Kafenes.panelSizitisi = new Panel.panel({
		'vh': 'H',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/misc/baraV.png',
				'title': 'Αυξομείωση περιοχής',
				'siromeno': true,
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({

				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelSizitisi.domGet();
	Kafenes.panelSizitisiDOM.replaceWith(dom);
	Kafenes.panelSizitisiDOM = dom;

	dom.on('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();

		dom.
		data('mousedownData', {
			'pageY': e.pageY,
			'prosklisiH': Kafenes.prosklisiAreaDOM.height(),
			'anazitisiH': Kafenes.anazitisiAreaDOM.height(),
			'sizitisiH': Kafenes.sizitisiAreaDOM.height(),
		});

		Kafenes.mousemove = Kafenes.sizitisiResize;
	});

	return Kafenes;
};

Kafenes.sizitisiResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelSizitisiDOM.data('mousedownData');
	let dy = data.pageY - e.pageY;
	let ph = data.prosklisiH;
	let ah = data.anazitisiH;
	let sh = data.sizitisiH;

	let dyMin = -sh;
	let dyMax = ah + ph;

	if (dy < dyMin)
	dy = dyMin;

	else if (dy > dyMax)
	dy = dyMax;

	sh += dy;
	ah -= dy;

	if (ah < 0) {
		ph += ah;
		ah = 0;
	}

	Kafenes.sizitisiAreaDOM.height(sh);
	Kafenes.anazitisiAreaDOM.height(ah);
	Kafenes.prosklisiAreaDOM.height(ph);
};

///////////////////////////////////////////////////////////////////////////////@
