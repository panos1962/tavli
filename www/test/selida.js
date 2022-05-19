"use strict";

Selida.init = function() {
	let x = new Thesi(0);

	Selida.ofelimoDOM.
	append(x.thesiDomGet());
return;
	
	let tavliDOM = $('<div>').
	attr('id', 'tavli').
	append($('<img>').
	attr('id', 'tavliBoard').
	prop('src', '../ikona/tavli.svg')).
	appendTo(Selida.ofelimoDOM);

	tavliDOM.
	append($('<div>').
	addClass('zari').
	addClass('zari0').
	append($('<img>').
	addClass('zariImage').
	attr('src', '../ikona/zari/5.png')));

	tavliDOM.
	append($('<div>').
	addClass('zari').
	addClass('zari1').
	append($('<img>').
	addClass('zariImage').
	attr('src', '../ikona/zari/6.png')));
};
