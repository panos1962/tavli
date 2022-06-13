"use strict";

var Kafenes = {};

Kafenes.mode =
Kafenes.modeKafenio = 'Καφενείο';
Kafenes.modePartida = 'Παρτίδα';

Kafenes.tavli = new tavlijs.tavli();

(function(t) {
	for (let i = 0; i < 15; i++)
	t.thiki[0].pouliPush(new tavlijs.pouli(t, 0, i));

	for (let i = 0; i < 15; i++)
	t.thiki[1].pouliPush(new tavlijs.pouli(t, 1, i));
})(Kafenes.tavli);


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

	Kafenes.panelMainDOM = $('#panelMain');

	Kafenes.pektisAreaDOM = $('#pektisArea');
	Kafenes.panelPektisDOM = $('#panelPektis');

	Kafenes.kafenioAreaDOM = $('#kafenioArea');
	Kafenes.panelKafenioDOM = $('#panelKafenio');

	Kafenes.partidaAreaDOM = $('#partidaArea');
	Kafenes.eleftherosAreaDOM = $('#eleftherosArea');
	Kafenes.pexnidiAreaDOM = $('#pexnidiArea');
	Kafenes.theatisAreaDOM = $('#theatisArea');
	Kafenes.panelPartidaDOM = $('#panelPartida');

	Kafenes.pasAreaDOM = $('#pasArea');
	Kafenes.panelProsklisiDOM = $('#panelProsklisi');
	Kafenes.prosklisiAreaDOM = $('#prosklisiArea');
	Kafenes.panelAnazitisiDOM = $('#panelAnazitisi');
	Kafenes.anazitisiAreaDOM = $('#anazitisiArea');
	Kafenes.panelSizitisiDOM = $('#panelSizitisi');
	Kafenes.sizitisiAreaDOM = $('#sizitisiArea');
	Kafenes.panelPasDOM = $('#panelPas');

	Kafenes.panelMainSetup();
	Kafenes.panelPektisSetup();
	Kafenes.panelKafenioSetup();
	Kafenes.panelPartidaSetup();
	Kafenes.panelPasSetup();
	Kafenes.panelProsklisiSetup();
	Kafenes.panelAnazitisiSetup();
	Kafenes.panelSizitisiSetup();

	let modeSwitchTab = Selida.tab().appendTo(Selida.toolbarLeftDOM);
	Kafenes.modeSetKafenio(modeSwitchTab);

	Selida.bodyDOM.
	on('mousemove', function(e) {
		Kafenes.mousemove(e);
	}).
	on('mouseup', function(e) {
		e.preventDefault();
		e.stopPropagation();
		Kafenes.mousemove = Kafenes.mousemoveDefault;
	});
};

Selida.resize = function() {
	// Πρώτα θέτουμε την καθ' ύψος διάσταση όλων των επίμαχων περιοχών.
	// Οι επίμαχες περιοχές είναι οι κάθετες περιοχές που εκτείνονται
	// στην ωφέλιμη περιοχή.

	let h = Selida.ofelimoDOM.height();

	Kafenes.panelMainDOM.height(h);
	Kafenes.pektisAreaDOM.height(h);
	Kafenes.panelPektisDOM.height(h);
	Kafenes.kafenioAreaDOM.height(h);
	Kafenes.panelKafenioDOM.height(h);
	Kafenes.partidaAreaDOM.height(h);
	Kafenes.panelPartidaDOM.height(h);
	Kafenes.pasAreaDOM.height(h);
	Kafenes.panelPasDOM.height(h);
	Kafenes.pasHeightResize();

	// Κατόπιν θέτουμε τα πλάτη των επίμαχων περιοχών ώστε να χωρούν κατά
	// πλάτος στην ωφέλιμη περιοχή.

	// Αρχικά μηδενίζουμε όλα τα πλάτη.

	Kafenes.pektisAreaDOM.width(0);
	Kafenes.kafenioAreaDOM.width(0);
	Kafenes.partidaAreaDOM.width(0);
	Kafenes.pasAreaDOM.width(0);

	// Υπολογίζουμε το πλάτος της ωφέλιμης περιοχής.

	let ow = Selida.ofelimoDOM.innerWidth();

	// Αφαιρούμε από το διαθέσιμο πλάτος τα πλάτη των κάθετων panels.

	ow -= Kafenes.panelMainDOM.outerWidth(true);
	ow -= Kafenes.panelPektisDOM.outerWidth(true);
	ow -= Kafenes.panelKafenioDOM.outerWidth(true);
	ow -= Kafenes.panelPartidaDOM.outerWidth(true);
	ow -= Kafenes.panelPasDOM.outerWidth(true);

	// Αν δεν έχει περισσέψει διαθέσιμο πλάτος, τότε δεν μπορούμε να
	// κάνουμε τίποτα.

	if (ow <= 0)
	return Kafenes;

	// Έχει περισσέψει κάποιο πλάτος, επομένως θα πρέπει να διαπλατύνουμε
	// κάποιες από τις περιοχές. Αν είμαστε σε mode παρτίδας, δίνουμε
	// έμφαση στην περιοχή παρτίδας.

	if (Kafenes.modeIsPartida()) {
		Kafenes.partidaAreaDOM.width(ow);
		Kafenes.pexnidiResize();
		Kafenes.partidaWidthResize();
		return Kafenes;
	}

	// Είμαστε σε mode καφενείου, οπότε εκκινούμε τις διαπλατύνσεις από
	// την περιοχή παικτών, δίνοντάς της αρχικά το default πλάτος.

	Kafenes.pektisAreaDOM.css('width', '');
	let w = Kafenes.pektisAreaDOM.outerWidth(true);
	ow -= w;

	// Αν έχουμε υπερβεί το διαθέσιμο πλάτος, τότε μειώνουμε το πλάτος
	// της περιοχής παικτών και επιστρέφουμε.

	if (ow < 0) {
		Kafenes.pektisAreaDOM.width(w + ow);
		return Kafenes;
	}

	// Υπάρχει και άλλο διαθέσιμο πλάτος, οπότε πλαταίνουμε την περιοχή
	// καφενείου, δίνοντάς της αρχικά το default πλάτος.

	Kafenes.kafenioAreaDOM.css('width', '');
	w = Kafenes.kafenioAreaDOM.outerWidth(true);
	ow -= w;

	// Αν έχουμε υπερβεί το διαθέσιμο πλάτος, τότε μειώνουμε το πλάτος
	// της περιοχής καφενείου και επιστρέφουμε.

	if (ow < 0) {
		Kafenes.kafenioAreaDOM.width(w + ow);
		return Kafenes;
	}

	// Εφόσον υπάρχει επιπλέον διαθέσιμο πλάτος, το δίνουμε στην περιοχή
	// συζήτησης.

	Kafenes.pasAreaDOM.width(ow);
	return Kafenes;
};

Kafenes.pasHeightResize = function() {
	let h = Selida.ofelimoDOM.innerHeight();

	h -= Kafenes.panelProsklisiDOM.outerHeight(true);
	h -= Kafenes.prosklisiAreaDOM.outerHeight(true);

	h -= Kafenes.panelAnazitisiDOM.outerHeight(true);
	h -= Kafenes.anazitisiAreaDOM.outerHeight(true);

	h -= Kafenes.panelSizitisiDOM.outerHeight(true);

	Kafenes.sizitisiAreaDOM.css('height', h + 'px');
	return Kafenes;
};

Kafenes.pexnidiResize = function() {
	Kafenes.pexnidiAreaDOM.css('height', '');
	Kafenes.theatisAreaDOM.css('height', '');
	Kafenes.pexnidiAreaDOM.empty();

	let pw = Kafenes.pexnidiAreaDOM.width();
	let ph = Kafenes.pexnidiAreaDOM.height();

	// Ο συντελεστής που ακολουθεί δείχνει την αναλογία του ύψους
	// προς το πλάτος του board (στις διαστάσεις συμπεριλαμβάνονται
	// οι εκατέρωθεν «θήκες»).

	const coe = 0.8;

	// Σε περίπτωση που υπάρχει «περίσσευμα» πλάτους με βάση το ύψος
	// που έχει διαμορφωθεί, διαμορφώνω κατάλληλα το πλάτος του board
	// προκειμένου να μην «χάνεται» διαθέσιμο πλάτος από τη συζήτηση.

	if ((pw * coe) > ph)
	pw = ph / coe;

	Kafenes.tavli.platos = pw;
	Kafenes.tavliDOM = Kafenes.tavli.dom().appendTo(Kafenes.pexnidiAreaDOM);

	// Το board έχει διαμορφωθεί, οπότε θα ελέγξουμε αν υπάρχει διαθέσιμο
	// ύψος προκειμένου να αυξήσουμε τον χώρο των θεατών (κάτω).

	let bh = Kafenes.tavliDOM.outerHeight(true);
	let dh = ph - bh;

	if (dh <= 0)
	return Kafenes;

	let th = Kafenes.theatisAreaDOM.height();

	Kafenes.pexnidiAreaDOM.height(ph - dh);
	Kafenes.theatisAreaDOM.height(th + dh);

	return Kafenes;
};

Kafenes.partidaWidthResize = function() {
	let pw = Kafenes.partidaAreaDOM.width();
	let tw = Kafenes.tavliDOM.width();

	// Προσθέτουμε το οριζόντιο padding της περιοχής παιχνιδιού.

	tw += Kafenes.pexnidiAreaDOM.outerWidth(true);
	tw -= Kafenes.pexnidiAreaDOM.width();

	// Υπολογίζουμε το διαθέσιμο υπόλοιπο πλάτος της περιοχής παιχνιδιού
	// προκειμένου να αυξήσουμε, αν μπορούμε, το πλάτος της συζήτησης.

	let dw = pw - tw;

	if (dw < 0)
	return Kafenes;

	Kafenes.pasAreaDOM.width(Kafenes.pasAreaDOM.width() + dw);
	Kafenes.partidaAreaDOM.width(Kafenes.partidaAreaDOM.width() - dw);

	return Kafenes;
};

Kafenes.mousemove =
Kafenes.mousemoveDefault = function(e) {
	e.preventDefault();
	e.stopPropagation();
};

Kafenes.mouseup =
Kafenes.mouseupDefault = function(e) {
	e.preventDefault();
	e.stopPropagation();

	Kafenes.mousemove = Kafenes.mousemoveDeault;
};

///////////////////////////////////////////////////////////////////////////////@

Kafenes.modeIsKafenio = function() {
	return (Kafenes.mode === Kafenes.modeKafenio);
};

Kafenes.modeIsPartida = function() {
	return (Kafenes.mode === Kafenes.modePartida);
};

Kafenes.modeSetKafenio = function(tabDom) {
	let tabData = tabDom.data('tabData');

	Kafenes.mode = Kafenes.modeKafenio;
	tabData.title = 'Άποψη παρτίδας';
	tabDom.html(Kafenes.modePartida);
	tabData.action = Kafenes.modeSetPartida;

	Selida.resize();
	return Kafenes;
};

Kafenes.modeSetPartida = function(tabDom) {
	let tabData = tabDom.data('tabData');

	Kafenes.mode = Kafenes.modePartida;
	tabData.title = 'Άποψη καφενείου';
	tabDom.html(Kafenes.modeKafenio);
	tabData.action = Kafenes.modeSetKafenio;

	Selida.resize();
	return Kafenes;
};

///////////////////////////////////////////////////////////////////////////////@

// Σχεδόν σε όλα τα πάνελ, κάθετα και οριζόντια, υπάρχει πλήκτρο αναδιάταξης
// περιοχών. Για να αποφύγουμε την επανάληψη κώδικα, ορίζουμε function που
// επιστρέφει το πλήκτρο.

Kafenes.areaResize = function() {
	return new Panel.panelItem({
		'icon': 'ikona/panel/resize.gif',
		'title': 'Αυξομείωση περιοχής',
		'siromeno': true,
	});
};

Kafenes.areaResizeStart = function(panel, resizeFunc) {
	panel.
	on('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();

		panel.
		data('mousedownData', {
			'pageX': e.pageX,
			'pageY': e.pageY,
			'pektisW': Kafenes.pektisAreaDOM.innerWidth(),
			'kafenioW': Kafenes.kafenioAreaDOM.innerWidth(),
			'partidaW': Kafenes.partidaAreaDOM.innerWidth(),
			'pasW': Kafenes.pasAreaDOM.innerWidth(),
			'prosklisiH': Kafenes.prosklisiAreaDOM.innerHeight(),
			'anazitisiH': Kafenes.anazitisiAreaDOM.innerHeight(),
			'sizitisiH': Kafenes.sizitisiAreaDOM.innerHeight(),
		});

		Kafenes.mousemove = resizeFunc;
	});
};

Kafenes.panelMainSetup = function() {
	Kafenes.panelMain = new Panel.panel({
		'vh': 'V',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/panel/resize.gif',
				'title': 'Επαναφορά περιοχών',
				'action': function() {
					Kafenes.pektisAreaDOM.css('width', '');
					Kafenes.kafenioAreaDOM.css('width', '');
					Kafenes.partidaAreaDOM.css('width', '');
					Kafenes.pasAreaDOM.css('width', '');
					Selida.resize();
				},
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelMain.domGet();
	Kafenes.panelMainDOM.replaceWith(dom);
	Kafenes.panelMainDOM = dom;

	return Kafenes;
};

Kafenes.panelPektisSetup = function() {
	Kafenes.panelPektis = new Panel.panel({
		'vh': 'V',
		'ilist': [
			Kafenes.areaResize(),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelPektis.domGet();
	Kafenes.panelPektisDOM.replaceWith(dom);
	Kafenes.panelPektisDOM = dom;
	Kafenes.areaResizeStart(dom, Kafenes.pektisResize);

	return Kafenes;
};

Kafenes.pektisResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelPektisDOM.data('mousedownData');
	let dx = data.pageX - e.pageX;
	let pw = data.pektisW
	let kw = data.kafenioW;
	let rw = data.partidaW;
	let sw = data.pasW;

	let dxMin = -(kw + rw + sw);
	let dxMax = pw;

	if (dx < dxMin)
	dx = dxMin;

	else if (dx > dxMax)
	dx = dxMax;

	kw += dx;
	pw -= dx;

	if (kw < 0) {
		rw += kw;
		kw = 0;
	}

	if (rw < 0) {
		sw += rw;
		rw = 0;
	}

	if (sw < 0)
	sw = 0;

	Kafenes.pektisAreaDOM.width(pw);
	Kafenes.kafenioAreaDOM.width(kw);
	Kafenes.partidaAreaDOM.width(rw);
	Kafenes.pasAreaDOM.width(sw);
	Kafenes.pexnidiResize();
};

Kafenes.panelKafenioSetup = function() {
	Kafenes.panelKafenio = new Panel.panel({
		'vh': 'V',
		'ilist': [
			Kafenes.areaResize(),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelKafenio.domGet();
	Kafenes.panelKafenioDOM.replaceWith(dom);
	Kafenes.panelKafenioDOM = dom;
	Kafenes.areaResizeStart(dom, Kafenes.kafenioResize);

	return Kafenes;
};

Kafenes.kafenioResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelKafenioDOM.data('mousedownData');
	let dx = data.pageX - e.pageX;
	let pw = data.pektisW
	let kw = data.kafenioW;
	let rw = data.partidaW;
	let sw = data.pasW;

	let dxMin = -(rw + sw);
	let dxMax = kw + pw;

	if (dx < dxMin)
	dx = dxMin;

	else if (dx > dxMax)
	dx = dxMax;

	rw += dx;
	kw -= dx;

	if (rw < 0) {
		sw += rw;
		rw = 0;
	}

	if (kw < 0) {
		pw += kw;
		kw = 0;
	}

	if (pw < 0)
	pw = 0;

	Kafenes.pektisAreaDOM.width(pw);
	Kafenes.kafenioAreaDOM.width(kw);
	Kafenes.partidaAreaDOM.width(rw);
	Kafenes.pasAreaDOM.width(sw);
	Kafenes.pexnidiResize();
};

Kafenes.panelPartidaSetup = function() {
	Kafenes.panelPartida = new Panel.panel({
		'vh': 'V',
		'ilist': [
			Kafenes.areaResize(),
			new Panel.panelItem({
				'icon': 'ikona/panel/eleftheros.png',
				'action': Kafenes.eleftherosAreaToggle,
				'title': 'Απόκρυψη/Εμφάνιση διαθέσιμων παικτών',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/theatis.png',
				'action': Kafenes.theatisAreaToggle,
			}),
		],
	});

	let dom = Kafenes.panelPartida.domGet();
	Kafenes.panelPartidaDOM.replaceWith(dom);
	Kafenes.panelPartidaDOM = dom;
	Kafenes.areaResizeStart(dom, Kafenes.partidaResize);

	return Kafenes;
};

Kafenes.partidaResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelPartidaDOM.data('mousedownData');
	let dx = data.pageX - e.pageX;
	let pw = data.pektisW
	let kw = data.kafenioW;
	let rw = data.partidaW;
	let sw = data.pasW;

	let dxMin = -sw;
	let dxMax = pw + kw + rw;

	if (dx < dxMin)
	dx = dxMin;

	else if (dx > dxMax)
	dx = dxMax;

	sw += dx;
	rw -= dx;

	if (rw < 0) {
		kw += rw;
		rw = 0;
	}

	if (kw < 0) {
		pw += kw;
		kw = 0;
	}

	if (pw < 0)
	pw = 0;

	Kafenes.pektisAreaDOM.width(pw);
	Kafenes.kafenioAreaDOM.width(kw);
	Kafenes.partidaAreaDOM.width(rw);
	Kafenes.pasAreaDOM.width(sw);
	Kafenes.pexnidiResize();
};

Kafenes.panelPasSetup = function() {
	Kafenes.panelPas = new Panel.panel({
		'vh': 'V',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelPas.domGet();
	Kafenes.panelPasDOM.replaceWith(dom);
	Kafenes.panelPasDOM = dom;

	return Kafenes;
};

Kafenes.panelProsklisiSetup = function() {
	Kafenes.panelProsklisi = new Panel.panel({
		'vh': 'H',
		'ilist': [
			new Panel.panelItem({
				'icon': 'ikona/panel/resize.gif',
				'title': 'Επαναφορά περιοχών',
				'action': function() {
					Kafenes.prosklisiAreaDOM.css('height', '');
					Kafenes.anazitisiAreaDOM.css('height', '');
					Kafenes.sizitisiAreaDOM.css('height', '');
					Kafenes.pasHeightResize();
				},
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelProsklisi.domGet();
	Kafenes.panelProsklisiDOM.replaceWith(dom);
	Kafenes.panelProsklisiDOM = dom;

	return Kafenes;
};

Kafenes.panelAnazitisiSetup = function() {
	Kafenes.panelAnazitisi = new Panel.panel({
		'vh': 'H',
		'ilist': [
			Kafenes.areaResize(),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelAnazitisi.domGet();
	Kafenes.panelAnazitisiDOM.replaceWith(dom);
	Kafenes.panelAnazitisiDOM = dom;
	Kafenes.areaResizeStart(dom, Kafenes.anazitisiResize);

	return Kafenes;

};

Kafenes.anazitisiResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelAnazitisiDOM.data('mousedownData');
	let dy = data.pageY - e.pageY;
	let ph = data.prosklisiH;
	let ah = data.anazitisiH;
	let sh = data.sizitisiH;

	let dyMin = -(ah + sh);
	let dyMax = ph;

	if (dy < dyMin)
	dy = dyMin;

	else if (dy > dyMax)
	dy = dyMax;

	ah += dy;
	ph -= dy;

	if (ah < 0) {
		sh += ah;
		ah = 0;
	}

	Kafenes.sizitisiAreaDOM.height(sh);
	Kafenes.anazitisiAreaDOM.height(ah);
	Kafenes.prosklisiAreaDOM.height(ph);
};

Kafenes.panelSizitisiSetup = function() {
	Kafenes.panelSizitisi = new Panel.panel({
		'vh': 'H',
		'ilist': [
			Kafenes.areaResize(),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({
				'icon': 'ikona/panel/4Balls.png',
			}),
			new Panel.panelItem({

				'icon': 'ikona/panel/4Balls.png',
			}),
		],
	});

	let dom = Kafenes.panelSizitisi.domGet();
	Kafenes.panelSizitisiDOM.replaceWith(dom);
	Kafenes.panelSizitisiDOM = dom;
	Kafenes.areaResizeStart(dom, Kafenes.sizitisiResize);

	return Kafenes;
};

Kafenes.sizitisiResize = function(e) {
	e.preventDefault();
	e.stopPropagation();

	let data = Kafenes.panelSizitisiDOM.data('mousedownData');
	let dy = data.pageY - e.pageY;
	let ph = data.prosklisiH;
	let ah = data.anazitisiH;
	let sh = data.sizitisiH;

	let dyMin = -sh;
	let dyMax = ah + ph;

	if (dy < dyMin)
	dy = dyMin;

	else if (dy > dyMax)
	dy = dyMax;

	sh += dy;
	ah -= dy;

	if (ah < 0) {
		ph += ah;
		ah = 0;
	}

	Kafenes.sizitisiAreaDOM.height(sh);
	Kafenes.anazitisiAreaDOM.height(ah);
	Kafenes.prosklisiAreaDOM.height(ph);
};

///////////////////////////////////////////////////////////////////////////////@

Kafenes.eleftherosAreaIsHidden = function() {
	let vis = Kafenes.eleftherosAreaDOM.css('visibility');

	return (vis === 'hidden');
}

Kafenes.eleftherosAreaIsVisible = function() {
	return !Kafenes.eleftherosAreaIsHidden();
}

Kafenes.eleftherosAreaToggle = function(panelItemDom) {
	let panelItem = panelItemDom.data('panelItem');

	if (Kafenes.eleftherosAreaIsHidden()) {
		Kafenes.eleftherosAreaDOM.css('visibility', 'visible');
		panelItemDom.
		css('opacity', 1).
		attr('title', 'Απόκρυψη ελεύθερων παικτών');
	}

	else {
		Kafenes.eleftherosAreaDOM.css('visibility', 'hidden');
		panelItemDom.
		css('opacity', 0.6).
		attr('title', 'Εμφάνιση ελεύθερων παικτών');
	}
};

///////////////////////////////////////////////////////////////////////////////@

Kafenes.theatisAreaIsHidden = function() {
	let vis = Kafenes.theatisAreaDOM.css('visibility');

	return (vis === 'hidden');
}

Kafenes.theatisAreaIsVisible = function() {
	return !Kafenes.theatisAreaIsHidden();
}

Kafenes.theatisAreaToggle = function(panelItemDom) {
	let panelItem = panelItemDom.data('panelItem');

	if (Kafenes.theatisAreaIsHidden()) {
		Kafenes.theatisAreaDOM.css('visibility', 'visible');
		panelItemDom.
		css('opacity', 1).
		attr('title', 'Απόκρυψη θεατών παρτίδας');
	}

	else {
		Kafenes.theatisAreaDOM.css('visibility', 'hidden');
		panelItemDom.
		css('opacity', 0.6).
		attr('title', 'Εμφάνιση θεατών παρτίδας');
	}
};

///////////////////////////////////////////////////////////////////////////////@
