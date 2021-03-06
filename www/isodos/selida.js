"use strict";

var Isodos = {};

Selida.init = function() {
	Selida.formaSpotFocus();
	Isodos.formaDOM = $('#isodosForma');
	Isodos.loginDOM = $('#isodosLogin');
	Isodos.kodikosDOM = $('#isodosKodikos');

	Isodos.submitDOM = $('#isodosSubmit');
	Isodos.resetDOM = $('#isodosReset');
	Isodos.cancelDOM = $('#isodosCancel');

	Selida.promptAlign(Isodos.formaDOM.find('.promptAlign'));
	Isodos.loginDOM.focus();

	Isodos.submitDOM.on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();

		Isodos.submit();
	});

	Isodos.resetDOM.on('click', function(e) {
		e.stopPropagation();
		Isodos.loginDOM.focus();
	});

	Isodos.cancelDOM.on('click', function(e) {
		Selida.formaAkiro(e);
	});

	Isodos.formaDOM.on('submit', function(e) {
		return false;
	});

	return Isodos;
};

Isodos.submit = function() {
	Isodos.isodos();
	return Isodos;
};

Isodos.isodos = function() {
	if (Isodos.invalidData())
	return;

	$.post({
		'url': 'isodos.php',
		'data': {
			'login': Isodos.loginDOM.val(),
			'kodikos': Isodos.kodikosDOM.val(),
		},
		'datatype': 'json',
		'success': function(rsp) {
			if (!rsp.hasOwnProperty('error'))
			return (self.location = Selida.baseUrl);

			if (rsp.hasOwnProperty('pedio'))
			Isodos[rsp.pedio + 'DOM'].select();

			if (!rsp.hasOwnProperty('minima'))
			rsp.minima = 'Προέκυψε σφάλμα κατά την είσοδο του χρήστη';

			Selida.fyiErrorRight(rsp.minima);
		},
		'error': function(err) {
			Selida.fyiErrorRight('Login failed');
			console.error(err);
		},
	});
};

Isodos.invalidData = function() {
	if (globals.invalidLogin(Isodos.loginDOM.val())) {
		Selida.fyiErrorRight('Μη αποδεκτό login name');
		Isodos.loginDOM.select();
		return true;
	}

	if (Isodos.kodikosDOM.val() === '') {
		Selida.fyiErrorRight('Μη αποδεκτός κωδικός');
		Isodos.kodikosDOM.select();
		return true;
	}

	return false;
};
