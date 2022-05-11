"use strict";

var Egrafi = {};

Selida.init = function() {
	let formaDOM = $('<forma>').
	attr('id', 'egrafiForma').
	addClass('forma').
	appendTo(Selida.ofelimoDOM);

	let pediaDOM = $('<div>').appendTo(formaDOM);

	pediaDOM.
	append($('<div>').
	addClass('inputLine').

	append($('<div>').
	addClass('pedioPrompt').
	addClass('egrafiPrompt').
	text('Login')).

	append(Egrafi.loginDOM = $('<input>').
	attr('id', 'egrafiLogin').
	addClass('pedioInput')));

	pediaDOM.
	append($('<div>').
	addClass('inputLine').

	append($('<div>').
	addClass('pedioPrompt').
	addClass('egrafiPrompt').
	text('Ονοματεπώνυμο')).

	append(Egrafi.onomaDOM = $('<input>').
	attr('id', 'egrafiOnoma').
	addClass('pedioInput')));

	pediaDOM.
	append($('<div>').
	addClass('inputLine').

	append($('<div>').
	addClass('pedioPrompt').
	addClass('egrafiPrompt').
	text('Email')).

	append(Egrafi.egrafiDOM = $('<input>').
	attr('id', 'egrafiEmail').
	addClass('pedioInput')));

	pediaDOM.
	append($('<div>').
	addClass('inputLine').

	append($('<div>').
	addClass('pedioPrompt').
	addClass('egrafiPrompt').
	text('Κωδικός')).

	append(Egrafi.kodikos1DOM = $('<input>').
	attr('id', 'egrafiKodikos1').
	attr('type', 'password').
	addClass('pedioInput')));

	pediaDOM.
	append($('<div>').
	addClass('inputLine').

	append($('<div>').
	addClass('pedioPrompt').
	addClass('egrafiPrompt').
	text('Επανάληψη')).

	append(Egrafi.kodikos2DOM = $('<input>').
	attr('id', 'egrafiKodikos2').
	attr('type', 'password').
	addClass('pedioInput')));

	let panelDOM = $('<div>').addClass('formaPanel').appendTo(formaDOM);

	panelDOM.append($('<input>').
	attr('type', 'submit').
	addClass('formaPliktro').
	val('Εγγραφή').
	on('click', function(e) {
	}));

	panelDOM.append($('<input>').
	attr('type', 'button').
	addClass('formaPliktro').
	val('Καθαρισμός').
	on('click', function(e) {
	}));

	panelDOM.append($('<input>').
	attr('type', 'button').
	addClass('formaPliktro').
	val('Άκυρο').
	on('click', function(e) {
	}));

	formaDOM.on('submit', function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	Egrafi.domFix();
	Egrafi.loginDOM.focus();

	return Egrafi;
};

Egrafi.domFix = function() {
	let w = 0;

	$('.egrafiPrompt').each(function() {
		let d = $(this).width();

		if (d > w)
		w = d;
	});

	$('.egrafiPrompt').each(function() {
		$(this).width(w);
	});

	return Egrafi;
};
