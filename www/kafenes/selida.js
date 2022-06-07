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
	let x = Selida.ofelimoDOM.innerWidth();

	x -= Kafenes.pektisAreaDOM.outerWidth(true);
	x -= Kafenes.kafenioAreaDOM.outerWidth(true);
	x -= Kafenes.partidaAreaDOM.outerWidth(true);
	x -= Kafenes.panelMainDOM.outerWidth(true);
	x -= Kafenes.panelPasDOM.outerWidth(true);

	Kafenes.pasAreaDOM.css('width', x + 'px');

	x = Selida.ofelimoDOM.innerHeight();

	x -= Kafenes.panelProsklisiDOM.outerHeight(true);
	x -= Kafenes.prosklisiAreaDOM.outerHeight(true);
	x -= Kafenes.panelAnazitisiDOM.outerHeight(true);
	x -= Kafenes.anazitisiAreaDOM.outerHeight(true);
	x -= Kafenes.panelSizitisiDOM.outerHeight(true);

	Kafenes.sizitisiAreaDOM.css('height', x + 'px');
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

	let dom = Kafenes.panelAnazitisi.domGet();
	Kafenes.panelAnazitisiDOM.replaceWith(dom);
	Kafenes.panelAnazitisiDOM = dom;

	return Kafenes;

};

Kafenes.panelSizitisiSetup = function() {
	Kafenes.panelSizitisi = new Panel.panel({
		'vh': 'H',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/misc/bara.png',
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

Kafenes.anazitisiResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelAnazitisiDOM.data('mousedownData');
	let dy = data.pageY - e.pageY;
	let ph = data.prosklisiH;
	let ah = data.anazitisiH;
	let sh = data.sizitisiH;
	let dyMin = -ph;
	let dyMax = sh;

	if (dy < dyMin)
	dy = dyMin;

	else if (dy > dyMax)
	dy = dyMax;

	ah += dy;
	ph -= dy;

	if (ah < 0) {
		ph += ah;
		ah = 0;
	}

	Kafenes.sizitisiAreaDOM.height(sh);
	Kafenes.anazitisiAreaDOM.height(ah);
	Kafenes.prosklisiAreaDOM.height(ph);
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
