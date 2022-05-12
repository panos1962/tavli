"use strict";

var Egrafi = {};

Selida.init = function() {
	Egrafi.formaDOM = $('#egrafiForma');
	Egrafi.loginDOM = $('#egrafiLogin');
	Egrafi.onomaDOM = $('#egrafiOnoma');
	Egrafi.emailDOM = $('#egrafiEmail');
	Egrafi.kodikos1DOM = $('#egrafiKodikos1');
	Egrafi.kodikos2DOM = $('#egrafiKodikos2');

	Egrafi.submitDOM = $('#egrafiSubmit');
	Egrafi.resetDOM = $('#egrafiReset');
	Egrafi.cancelDOM = $('#egrafiCancel');

	Selida.promptAlign(Egrafi.formaDOM.find('.promptAlign'));
	Egrafi.loginDOM.focus();

	Egrafi.submitDOM.on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
	});

	Egrafi.resetDOM.on('click', function(e) {
		e.stopPropagation();
		Egrafi.loginDOM.focus();
	});

	Egrafi.cancelDOM.on('click', function(e) {
		e.stopPropagation();

		if (self.opener)
		return self.close();

		else
		self.location = Selida.baseUrl;
	});

	Selida.arxikiTab();
	return Egrafi;
};
