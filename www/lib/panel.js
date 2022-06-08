"use strict";

var Panel = {};

///////////////////////////////////////////////////////////////////////////////@

Panel.panel = function(props) {
	for (let i in props)
	this[i] = props[i];
};

Panel.panel.prototype.domGet = function() {
	if (!this.hasOwnProperty('DOM'))
	this.domCreate();

	return this.DOM;
};

Panel.panel.prototype.domCreate = function() {
	let dom = $('<div>').
	data('panel', this).
	addClass('panel').
	addClass('panel' + this.vh);

	this.ilist.forEach(function(x) {
		x.domGet().
		appendTo(dom);
	});

	this.DOM = dom;
	return this;
};

///////////////////////////////////////////////////////////////////////////////@

Panel.panelItem = function(props) {
	for (let i in props)
	this[i] = props[i];
};

Panel.panelItem.prototype.domGet = function() {
	if (!this.hasOwnProperty('DOM'))
	this.domCreate();

	return this.DOM;
};

Panel.panelItem.prototype.domCreate = function() {
	let dom = $('<div>').
	data('panelItem', this).
	addClass('panelItem');

	if (!this.siromeno)
	dom.
	on('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	if (this.title)
	dom.attr('title', this.title);

	$('<img>').
	attr('src', this.icon).
	appendTo(dom);

	this.DOM = dom;
	return this;
};

///////////////////////////////////////////////////////////////////////////////@

$(function() {
	$(document.body).
	on('click', '.panelItem', function(e) {
		e.preventDefault();
		e.stopPropagation();

		let item = $(this).data('panelItem');

		if (!item)
		return;

		if (item.action)
		item.action($(this));
	});
});
