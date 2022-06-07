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
	Kafenes.panelMainDOM = $('#panelMain');
	Kafenes.pasAreaDOM = $('#pasArea');
	Kafenes.panelProsklisiDOM = $('#panelProsklisi');
	Kafenes.prosklisiAreaDOM = $('#prosklisiArea');
	Kafenes.panelAnazitisiDOM = $('#panelAnazitisi');
	Kafenes.anazitisiAreaDOM = $('#anazitisiArea');
	Kafenes.panelSizitisiDOM = $('#panelSizitisi');
	Kafenes.sizitisiAreaDOM = $('#sizitisiArea');
	Kafenes.panelPasDOM = $('#panelPas');

	Kafenes.panelMainSetup();
	Kafenes.panelPasSetup();
	Kafenes.panelProsklisiSetup();
	Kafenes.panelAnazitisiSetup();
	Kafenes.panelSizitisiSetup();

	Selida.bodyDOM.
	on('mousemove', function(e) {
		Kafenes.mousemove(e);
	}).
	on('mouseup', function(e) {
		Kafenes.mouseup(e);
	});
};

Selida.resize = function() {
	let w = Selida.ofelimoDOM.innerWidth();

	w -= Kafenes.pektisAreaDOM.outerWidth(true);
	w -= Kafenes.kafenioAreaDOM.outerWidth(true);
	w -= Kafenes.partidaAreaDOM.outerWidth(true);
	w -= Kafenes.panelMainDOM.outerWidth(true);
	w -= Kafenes.panelPasDOM.outerWidth(true);

	Kafenes.pasSizeReset();
	Kafenes.pasAreaDOM.width(w);
	Kafenes.pasResize();
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
};

///////////////////////////////////////////////////////////////////////////////@

Kafenes.panelMainSetup = function() {
	Kafenes.panelMain = new Panel.panel({
		'vh': 'V',
		'ilist': [
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
				'icon': 'ikona/misc/bara.png',
				'title': 'Αυξομείωση περιοχής',
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
			'prosklisiH': Kafenes.prosklisiAreaDOM.height(),
			'anazitisiH': Kafenes.anazitisiAreaDOM.height(),
			'sizitisiH': Kafenes.sizitisiAreaDOM.height(),
		});

		Kafenes.mousemove = Kafenes.anazitisiResize;
		Kafenes.mouseup = function(e) {
			e.preventDefault();
			e.stopPropagation();

			Kafenes.mousemove = Kafenes.mousemoveDefault;
		};
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
				'icon': 'ikona/misc/bara.png',
				'title': 'Αυξομείωση περιοχής',
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
		Kafenes.mouseup = function(e) {
			e.preventDefault();
			e.stopPropagation();

			Kafenes.mousemove = Kafenes.mousemoveDefault;
		};
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
