Pektis.prototype.pektisDOM = function() {
	if (this.hasOwnProperty('DOM'))
	return this.DOM;

	this.DOM = $('<div>').
	addClass('pektis');

	return this.DOM;
}
