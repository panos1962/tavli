Pektis.prototype.pektisDOM = function() {
	if (this.hasOwnProperty('DOM'))
	return this.DOM;

	this.DOM = $('<div>').
	addClass('pektis');

	return this.DOM;
}

///////////////////////////////////////////////////////////////////////////////@

Tavli.prototype.tavliDomGet = function(klasi) {
	let dom = $('<div>').addClass('tavli').addClass(klasi);
	let boardAreaDom = $('<div>').addClass('boardArea');

	let pektis0AreaDom = $('<div>').addClass('pektisArea');
	let pektis1AreaDom = $('<div>').addClass('pektisArea');

	let thiki0AreaDom = $('<div>').addClass('thikiArea').addClass('thiki0Area');
	let thiki0Dom = $('<div>').addClass('thiki');
	let thiki1AreaDom = $('<div>').addClass('thikiArea').addClass('thiki1Area');
	let thiki1Dom = $('<div>').addClass('thiki');

	let perioxi0AreaDom = $('<div>').addClass('perioxiArea').addClass('perioxi0Area');
	let perioxi0Dom = $('<div>').addClass('perioxi');
	let perioxi1AreaDom = $('<div>').addClass('perioxiArea').addClass('perioxi1Area');
	let perioxi1Dom = $('<div>').addClass('perioxi');
	let perioxi2AreaDom = $('<div>').addClass('perioxiArea').addClass('perioxi2Area');
	let perioxi2Dom = $('<div>').addClass('perioxi');
	let perioxi3AreaDom = $('<div>').addClass('perioxiArea').addClass('perioxi3Area');
	let perioxi3Dom = $('<div>').addClass('perioxi');

	thiki0AreaDom.append(thiki0Dom).appendTo(boardAreaDom);
	thiki1AreaDom.append(thiki1Dom).appendTo(boardAreaDom);

	perioxi0AreaDom.append(perioxi0Dom).appendTo(boardAreaDom);
	perioxi1AreaDom.append(perioxi1Dom).appendTo(boardAreaDom);
	perioxi2AreaDom.append(perioxi2Dom).appendTo(boardAreaDom);
	perioxi3AreaDom.append(perioxi3Dom).appendTo(boardAreaDom);
thiki0Dom.text('A');
thiki1Dom.text('A');
perioxi0Dom.text('123');
perioxi3Dom.text('123');

	return dom.
	append(pektis0AreaDom).
	append(boardAreaDom).
	append(pektis1AreaDom);
};

///////////////////////////////////////////////////////////////////////////////@

Thesi.xroma = [
	'#D2B48C',
	'#CD853E'
];

Thesi.prototype.thesiDomGet = function() {
	let thesiDOM = $('<div>').addClass('thesi');
	let canvasDOM = $('<canvas>');
	let canvas = canvasDOM[0];
	let ctx = canvas.getContext("2d");

	thesiDOM.appendTo(Selida.ofelimoDOM);
	let w = thesiDOM.width();
	let h = thesiDOM.height();

	canvasDOM.
	attr('width', w).
	attr('height', h);

	ctx.beginPath();
	ctx.moveTo(2, h);
	ctx.lineTo(w / 2, 0);
	ctx.lineTo(w - 2, h);
	ctx.closePath();

	ctx.fillStyle = Thesi.xroma[this.thesiIdGet() % 2];
	ctx.fill();

	return thesiDOM.append(canvasDOM);
};
