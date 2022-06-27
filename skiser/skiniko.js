"use strict";

skiniko.trapezi = {};
skiniko.pektis = {};
skiniko.sinedria = {};

skiniko.lista1 = {};
skiniko.lista2 = {};

skiniko.stisimo = function() {
	log.fasi.nea('Στήσιμο σκηνικού');
	log.level.push('Τραπέζια');
	skiniko.stisimoTrapezi(db.connection());
};

skiniko.stisimoTrapezi = function(conn) {
	let query = 'SELECT `kodikos`, `stisimo`, `pektis1`, `apodoxi1`, ' +
		'`pektis2`, `apodoxi2`, `poll` ' +
		'FROM `trapezi` ' +
		'WHERE `arxio` IS NULL';

	conn.query(query, function(conn, rows) {
		rows.forEach(function(trapezi) {
			trapezi = new tavladoros.trapezi(trapezi);
			trapezi.trapeziPollSet();
			skiniko.trapeziPush(trapezi);
			skiniko.lista1[trapezi.kodikos] = 1;
		});

		log.print('Παράμετροι');
		skiniko.stisimoTrparam(conn);
	});

	return skiniko;
};

skiniko.stisimoTrparam = function(conn) {
	for (let kodikos in skiniko.lista1) {
		let trapezi = skiniko.trapezi[kodikos];

		skiniko.lista2[kodikos] = 1;
		delete skiniko.lista1[kodikos];

		let query = 'SELECT `param`, `timi` ' +
			'FROM `trparam` ' +
			'WHERE `trapezi` = ' + kodikos;

		conn.query(query, function(conn, rows) {
			rows.forEach(function(trparam) {
				trparam = new tavladoros.trparam(trparam);
				trapezi.trapeziTrparamPush(trparam);
			});

			skiniko.stisimoTrparam(conn);
		});

		return skiniko;
	}

	log.print('Παιχνίδια');
	return skiniko.stisimoPexnidi(conn);
};

skiniko.stisimoPexnidi = function(conn) {
	for (let kodikos in skiniko.lista2) {
		let trapezi = skiniko.trapezi[kodikos];

		skiniko.lista1[kodikos] = 1;
		delete skiniko.lista2[kodikos];

		let query = 'SELECT `kodikos`, `enarxi`, `idos`, `protos`, ' +
			'`xamenos`, `ita`, `telos` ' +
			'FROM `pexnidi` ' +
			'WHERE `trapezi` = ' + kodikos + ' ' +
			'ORDER BY `kodikos`';

		conn.query(query, function(conn, rows) {
			rows.forEach(function(pexnidi) {
				pexnidi = new tavladoros.pexnidi(pexnidi);
				trapezi.trapeziPexnidiPush(pexnidi);
			});

			skiniko.stisimoPexnidi(conn);
		});

		return skiniko;
	}

	log.print('Κινήσεις');
	return skiniko.stisimoKinisi(conn);
};

skiniko.stisimoKinisi = function(conn) {
	for (let kodikos in skiniko.lista1) {
		let trapezi = skiniko.trapezi[kodikos];

		skiniko.lista2[kodikos] = 1;
		delete skiniko.lista1[kodikos];

		if (!trapezi.pexnidi.length)
		return skiniko.stisimoKinisi(conn);

		let pexnidi = trapezi.pexnidi[trapezi.pexnidi.length - 1];

		let query = 'SELECT `kodikos`, `pektis`, `idos`, `data` ' +
			'FROM `kinisi` ' +
			'WHERE `pexnidi` = ' + pexnidi.kodikos;
			'ORDER BY `kodikos`';

		conn.query(query, function(conn, rows) {
			rows.forEach(function(kinisi) {
				kinisi = new tavladoros.kinisi(kinisi);
				pexnidi.pexnidiKinisiPush(kinisi);
			});

			skiniko.stisimoKinisi(conn);
		});

		return skiniko;
	}

	log.print('Συμμετοχές');
	return skiniko.stisimoSimetoxi(conn);
};

skiniko.stisimoSimetoxi = function(conn) {
	for (let kodikos in skiniko.lista2) {
		let trapezi = skiniko.trapezi[kodikos];

		skiniko.lista1[kodikos] = 1;
		delete skiniko.lista2[kodikos];

		let query = 'SELECT `pektis`, `thesi` ' +
			'FROM `simetoxi` ' +
			'WHERE `trapezi` = ' + kodikos;

		conn.query(query, function(conn, rows) {
			rows.forEach(function(simetoxi) {
				simetoxi = new tavladoros.simetoxi(simetoxi);
				trapezi.trapeziSimetoxiPush(simetoxi);
			});

			skiniko.stisimoSimetoxi(conn);
		});

		return skiniko;
	}

	log.level.pop().level.push('Συνεδρίες');
	return skiniko.stisimoSinedria(conn);
};

skiniko.stisimoSinedria = function(conn) {
	let query = 'SELECT `pektis`, `klidi`, `ip`, `isodos`, `poll`, ' +
		'`trapezi`, `thesi`, `simetoxi` ' +
		'FROM `sinedria`';

	conn.query(query, function(conn, rows) {
		skiniko.lista1 = [];
		skiniko.lista2 = [];

		rows.forEach(function(sinedria) {
			sinedria = new tavladoros.sinedria(sinedria).sinedriaPollSet();
			skiniko.sinedriaPush(sinedria);
			skiniko.lista1[sinedria.pektis] = 1;
		});

		log.level.push('Έλεγχος');
		return skiniko.stisimoCheck(conn);
	});

	return skiniko;
};

skiniko.stisimoCheck = function(conn) {
	for (let pektis in skiniko.sinedria) {
		let sinedria = skiniko.sinedria[pektis];
		let trapezi = skiniko.trapezi[sinedria.trapezi];

		if (!trapezi) {
			sinedria.sinedriaRebelosSet();
			continue;
		}

		switch (sinedria.thesi) {
		case 1:
		case 2:
			break;
		default:
			sinedria.sinedriaRebelosSet();
			continue;
		}

		if (trapezi['pektis' + sinedria.thesi] !== sinedria.pektis) {
			sinedria.sinedriaRebelosSet();
			continue;
		}
	}

//console.log(skiniko.sinedria);
for (let t in skiniko.trapezi) {
t = skiniko.trapezi[t];
	if (!t.pexnidi.length)
	continue;

	for (let p of t.pexnidi) {
		let k = p.kinisi;

		if (k.length)
		console.log(k);
	}
}
	return server.ekinisi();
};
