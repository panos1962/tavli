"use strict";

var Egrafi = {};

Selida.init = function() {
	Selida.formaSpotFocus();
	Egrafi.formaDOM = $('#egrafiForma');
	Egrafi.loginDOM = $('#egrafiLogin');
	Egrafi.onomaDOM = $('#egrafiOnoma');
	Egrafi.emailDOM = $('#egrafiEmail');
	Egrafi.kodikos1DOM = $('#egrafiKodikos1');
	Egrafi.kodikos2DOM = $('#egrafiKodikos2');
	Egrafi.ilikiaDOM = $('#egrafiIlikia');
	Egrafi.xrisiDiavasaDOM = $('#egrafiXrisiDiavasa');
	Egrafi.xrisiKatanoisaDOM = $('#egrafiXrisiKatanoisa');

	Egrafi.submitDOM = $('#egrafiSubmit');
	Egrafi.resetDOM = $('#egrafiReset');
	Egrafi.cancelDOM = $('#egrafiCancel');

	Selida.promptAlign(Egrafi.formaDOM.find('.promptAlign'));
	Egrafi.loginDOM.focus();

	Egrafi.submitDOM.on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();

		Egrafi.submit();
	});

	Egrafi.resetDOM.on('click', function(e) {
		e.stopPropagation();
		Egrafi.loginDOM.focus();
	});

	Egrafi.cancelDOM.on('click', function(e) {
		Selida.formaAkiro(e);
	});

	Egrafi.formaDOM.on('submit', function(e) {
		return false;
	});
Egrafi.loginDOM.val('panos');
Egrafi.onomaDOM.val('Panos Papadopoulos');
Egrafi.emailDOM.val('xxx@xxx.xxx');
Egrafi.kodikos1DOM.val('xxx');
Egrafi.kodikos2DOM.val('xxx');
Egrafi.ilikiaDOM.prop('checked', true);
Egrafi.xrisiDiavasaDOM.prop('checked', true);
Egrafi.xrisiKatanoisaDOM.prop('checked', true);

	return Egrafi;
};

Egrafi.submit = function() {
	if (Selida.isXristis())
	Egrafi.enimerosi();

	else
	Egrafi.egrafi();

	return Egrafi;
};

Egrafi.enimerosi = function() {
	console.error('Δεν υπάρχει πρόγραμμα ενημέρωσης');

	return Egrafi;
};

Egrafi.egrafi = function() {
	if (Egrafi.invalidData())
	return;

	$.post({
		'url': 'egrafi.php',
		'data': {
			'login': Egrafi.loginDOM.val(),
			'onoma': Egrafi.onomaDOM.val(),
			'email': Egrafi.emailDOM.val(),
			'kodikos1': Egrafi.kodikos1DOM.val(),
			'kodikos2': Egrafi.kodikos2DOM.val(),
		},
		'datatype': 'json',
		'success': function(rsp) {
			if (!rsp.hasOwnProperty('error'))
			return (self.location = Selida.baseUrl);

			if (rsp.hasOwnProperty('pedio'))
			Egrafi[rsp.pedio + 'DOM'].select();

			if (!rsp.hasOwnProperty('minima'))
			rsp.minima = 'Προέκυψε σφάλμα κατά την εγγραφή του χρήστη';

			Selida.fyiErrorRight(rsp.minima);
		},
		'error': function(err) {
			Selida.fyiErrorRight('Απέτυχε η εγγραφή νέου παίκτη');
		},
	});
};

Egrafi.invalidData = function() {
	if (Globals.invalidLogin(Egrafi.loginDOM.val())) {
		Selida.fyiErrorRight('Μη αποδεκτό login name');
		Egrafi.loginDOM.select();
		return true;
	}

	if (Globals.invalidOnoma(Egrafi.onomaDOM.val())) {
		Selida.fyiErrorRight('Μη αποδεκτό ονοματεπώνυμο');
		Egrafi.onomaDOM.select();
		return true;
	}

	if (Globals.invalidEmail(Egrafi.emailDOM.val())) {
		Selida.fyiErrorRight('Μη αποδεκτό email');
		Egrafi.emailDOM.select();
		return true;
	}

	if (Egrafi.kodikos1DOM.val() === '') {
		Selida.fyiErrorRight('Μη αποδεκτός κωδικός');
		Egrafi.kodikos1DOM.select();
		return true;
	}

	if (Egrafi.kodikos1DOM.val() !== Egrafi.kodikos2DOM.val()) {
		Selida.fyiErrorRight('Οι δύο κωδικοί διαφέρουν');
		Egrafi.kodikos1DOM.select();
		return true;
	}

	if (!Egrafi.ilikiaDOM.prop('checked')) {
		Selida.fyiErrorRight('Πρέπει να είστε άνω των ' +
			Globals.ilikiaMinimum + ' ετών');
		Egrafi.ilikiaDOM.focus();
		return true;
	}

	if (!Egrafi.xrisiDiavasaDOM.prop('checked')) {
		Selida.fyiErrorRight('Πρέπει να έχετε διαβάσει τους όρους χρήσης');
		Egrafi.xrisiDiavasaDOM.focus();
		return true;
	}

	if (!Egrafi.xrisiKatanoisaDOM.prop('checked')) {
		Selida.fyiErrorRight('Πρέπει να έχετε κατανοήσει τους όρους χρήσης');
		Egrafi.xrisiKatanoisaDOM.focus();
		return true;
	}

	return false;
};
