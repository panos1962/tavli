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
	Kafenes.panelPasDOM = $('#panelPas');

	Kafenes.panelMainSetup();
	Kafenes.panelPasSetup();
};

Selida.resize = function() {
	let w = Selida.ofelimoDOM.innerWidth();

	w -= Kafenes.pektisAreaDOM.outerWidth(true);
	w -= Kafenes.kafenioAreaDOM.outerWidth(true);
	w -= Kafenes.partidaAreaDOM.outerWidth(true);
	w -= Kafenes.panelMainDOM.outerWidth(true);
	w -= Kafenes.panelPasDOM.outerWidth(true);

	Kafenes.pasAreaDOM.css('width', w + 'px');
};

///////////////////////////////////////////////////////////////////////////////@

Kafenes.panelItem = function(props) {
	for (let i in props)
	this[i] = props[i];
};

Kafenes.panelItem.prototype.domGet = function() {
	if (!this.hasOwnProperty('DOM'))
	this.domCreate();

	return this.DOM;
};

Kafenes.panelItem.prototype.domCreate = function() {
	let dom = $('<div>').addClass('panelItem');

	$('<img>').
	attr('src', this.icon).
	appendTo(dom);

	this.DOM = dom;
	return this;
};

Kafenes.panel = function(props) {
	for (let i in props)
	this[i] = props[i];
};

Kafenes.panel.prototype.domGet = function() {
	if (!this.hasOwnProperty('DOM'))
	this.domCreate();

	return this.DOM;
};

Kafenes.panel.prototype.domCreate = function() {
	let dom = $('<div>').addClass('panel');

	if (this.prosanatolismos === 'vertical')
	dom.addClass('panelVertical');

	else
	dom.addClass('panelHorizontal');

	this.tlist.forEach(function(x) {
		x.domGet().
		appendTo(dom);
	});

	this.DOM = dom;
	return this;
};

///////////////////////////////////////////////////////////////////////////////@

Kafenes.panelMainSetup = function() {
	Kafenes.panelMain = new Kafenes.panel({
		'prosanatolismos': 'vertical',
		'tlist': [
			new Kafenes.panelItem({
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
	Kafenes.panelPas = new Kafenes.panel({
		'prosanatolismos': 'vertical',
		'tlist': [
			new Kafenes.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelPas.domGet();
	Kafenes.panelPasDOM.replaceWith(dom);
	Kafenes.panelPasDOM = dom;

	return Kafenes;
};
