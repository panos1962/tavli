"use strict";

var Account = {};

Selida.init = function() {
	Selida.formaSpotFocus();
	Account.formaDOM = $('#accountForma');
	Account.loginDOM = $('#accountLogin');
	Account.onomaDOM = $('#accountOnoma');
	Account.emailDOM = $('#accountEmail');
	Account.kodikosDOM = $('#accountKodikos');
	Account.kodikos1DOM = $('#accountKodikos1');
	Account.kodikos2DOM = $('#accountKodikos2');
	Account.ilikiaDOM = $('#accountIlikia');
	Account.xrisiDiavasaDOM = $('#accountXrisiDiavasa');
	Account.xrisiKatanoisaDOM = $('#accountXrisiKatanoisa');

	Account.submitDOM = $('#accountSubmit');
	Account.resetDOM = $('#accountReset');
	Account.cancelDOM = $('#accountCancel');

	Selida.promptAlign(Account.formaDOM.find('.promptAlign'));

	if (Selida.isXristis()) {
		Account.loginDOM.prop('disabled', true).text(Selida.xristis);
		Account.onomaDOM.focus();
	}
	else {
		Account.loginDOM.focus();
	}

	Account.formaDOM.on('submit', function(e) {
		return false;
	});

	Account.submitDOM.on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		Account.submit();
	});

	Account.resetDOM.on('click', function(e) {
		e.stopPropagation();
		Account.loginDOM.focus();
	});

	Account.cancelDOM.on('click', function(e) {
		Selida.formaAkiro(e);
	});

	return Account;
};

Account.submit = function() {
	if (Account.invalidData())
	return;

	if (Selida.oxiXristis())
	Account.egrafi();

	else
	Account.enimerosi();

	return Account;
};

Account.egrafi = function() {
	$.post({
		'url': 'account.php',
		'data': {
			'login': Account.loginDOM.val(),
			'onoma': Account.onomaDOM.val(),
			'email': Account.emailDOM.val(),
			'kodikos1': Account.kodikos1DOM.val(),
			'kodikos2': Account.kodikos2DOM.val(),
		},
		'datatype': 'json',
		'success': function(rsp) {
			if (!rsp.hasOwnProperty('error'))
			return (self.location = Selida.baseUrl);

			if (rsp.hasOwnProperty('pedio'))
			Account[rsp.pedio + 'DOM'].select();

			if (!rsp.hasOwnProperty('minima'))
			rsp.minima = 'Προέκυψε σφάλμα κατά την εγγραφή του χρήστη';

			Selida.fyiErrorRight(rsp.minima);
		},
		'error': function(err) {
			Selida.fyiErrorRight('Απέτυχε η εγγραφή του χρήστη');
			console.error(err);
		},
	});
};

Account.enimerosi = function() {
	$.post({
		'url': 'account.php',
		'data': {
			'login': Account.loginDOM.val(),
			'onoma': Account.onomaDOM.val(),
			'email': Account.emailDOM.val(),
			'kodikos': Account.kodikosDOM.val(),
			'kodikos1': Account.kodikos1DOM.val(),
			'kodikos2': Account.kodikos2DOM.val(),
		},
		'datatype': 'json',
		'success': function(rsp) {
			if (!rsp.hasOwnProperty('error')) {
				Selida.fyiMessageRight('Ενημέρωση στοιχείων χρήστη επιτυχής!');
				self.close();
				self.location = Selida.baseUrl;
				return;
			}

			if (rsp.hasOwnProperty('pedio'))
			Account[rsp.pedio + 'DOM'].select();

			if (!rsp.hasOwnProperty('minima'))
			rsp.minima = 'Προέκυψε σφάλμα κατά την ενημέρωση στοιχείων χρήστη';

			Selida.fyiErrorRight(rsp.minima);
		},
		'error': function(err) {
			Selida.fyiErrorRight('Απέτυχε η ενημέρωση στοιχείων χρήστη');
			console.error(err);
		},
	});
};

Account.invalidData = function() {
	if (Globals.invalidLogin(Account.loginDOM.val())) {
		Selida.fyiErrorRight('Μη αποδεκτό login name');
		Account.loginDOM.select();
		return true;
	}

	if (Globals.invalidOnoma(Account.onomaDOM.val())) {
		Selida.fyiErrorRight('Μη αποδεκτό ονοματεπώνυμο');
		Account.onomaDOM.select();
		return true;
	}

	if (Globals.invalidEmail(Account.emailDOM.val())) {
		Selida.fyiErrorRight('Μη αποδεκτό email');
		Account.emailDOM.select();
		return true;
	}

	if (Selida.oxiXristis()) {
		if (!Account.ilikiaDOM.prop('checked')) {
			Selida.fyiErrorRight('Πρέπει να είστε άνω των ' +
				Globals.ilikiaMinimum + ' ετών');
			Account.ilikiaDOM.focus();
			return true;
		}

		if (!Account.xrisiDiavasaDOM.prop('checked')) {
			Selida.fyiErrorRight('Πρέπει να έχετε διαβάσει τους όρους χρήσης');
			Account.xrisiDiavasaDOM.focus();
			return true;
		}

		if (!Account.xrisiKatanoisaDOM.prop('checked')) {
			Selida.fyiErrorRight('Πρέπει να έχετε κατανοήσει τους όρους χρήσης');
			Account.xrisiKatanoisaDOM.focus();
			return true;
		}

		if (Account.kodikos1DOM.val() === '') {
			Selida.fyiErrorRight('Δεν περάστηκε κωδικός');
			Account.kodikos1DOM.select();
			return true;
		}
	}

	else {
		if (Account.kodikosDOM.val() === '') {
			Selida.fyiErrorRight('Δεν περάστηκε κωδικός');
			Account.kodikosDOM.select();
			return true;
		}
	}

	if (Account.kodikos1DOM.val() !== Account.kodikos2DOM.val()) {
		Selida.fyiErrorRight('Οι δύο κωδικοί είναι διαφορετικοί');
		Account.kodikos1DOM.select();
		return true;
	}

	return false;
};
