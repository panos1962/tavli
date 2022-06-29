"use strict";

skiniko.trapezi = {};
skiniko.pektis = {};
skiniko.sinedria = {};

skiniko.lista1 = {};
skiniko.lista2 = {};

skiniko.stisimo = function() {
	log.fasi.nea('Στήσιμο σκηνικού');
	log.level.push();
	log.print('Τραπέζια');
	log.level.push();
	skiniko.stisimoTrapezi(db.connection());
};

skiniko.stisimoTrapezi = function(conn) {
	let query = 'SELECT `kodikos`, ' +
		'UNIX_TIMESTAMP(`stisimo`) AS `stisimo`, ' +
		'`pektis1`, `apodoxi1`, ' +
		'`pektis2`, `apodoxi2`, ' +
		'UNIX_TIMESTAMP(`poll`) AS `poll` ' +
		'FROM `trapezi` ' +
		'WHERE `arxio` IS NULL';

	conn.query(query, function(conn, rows) {
console.log(rows);
		rows.forEach(function(trapezi) {
			trapezi = new tavladoros.trapezi(trapezi);
console.log(JSON.stringify(trapezi));
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

	log.level.pop();
	log.print('Συνεδρίες');
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

		skiniko.lista1 = [];
		skiniko.lista2 = [];

		log.level.push();
		log.print('Έλεγχος');
		return skiniko.stisimoCheck(conn);
	});

	return skiniko;
};

skiniko.stisimoCheck = function(conn) {
	for (let pektis in skiniko.sinedria) {
		skiniko.lista1[pektis] = 1;

		let sinedria = skiniko.sinedria[pektis];
		let trapezi = skiniko.trapezi[sinedria.trapezi];

		if (!trapezi) {
			sinedria.sinedriaRebelosSet();
			continue;
		}

		switch (sinedria.simetoxi) {
		case 'ΠΑΙΚΤΗΣ':
		case 'ΘΕΑΤΗΣ':
			break;
		default:
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

		if (sinedria.sinedriaIsPektis() &&
			trapezi.trapeziPektisGet(sinedria.thesi) !== sinedria.sinedriaPektisGet()) {
			sinedria.sinedriaRebelosSet();
			continue;
		}
	}

	for (let trapezi in skiniko.trapezi) {
		trapezi = skiniko.trapezi[trapezi];
		skiniko.lista1[trapezi.pektis1] = 1;
		skiniko.lista1[trapezi.pektis2] = 1;
	}

	delete skiniko.lista1[null];
	delete skiniko.lista1[undefined];

	log.level.pop();
	log.print('Παίκτες');
	return skiniko.stisimoPektis(conn);
}

skiniko.stisimoPektis = function(conn) {
	for (let pektis in skiniko.lista1) {
		skiniko.lista2[pektis] = 1;
		delete skiniko.lista1[pektis];

		let query = 'SELECT `login`, `onoma` ' +
			'FROM `pektis` ' +
			'WHERE `login` = ' + pektis.json();

		conn.query(query, function(conn, rows) {
			rows.forEach(function(pektis) {
				pektis = new tavladoros.pektis(pektis);
				skiniko.pektisPush(pektis);
			});

			skiniko.stisimoPektis(conn);
		});

		return skiniko;
	}

	log.level.push();
	log.print('Παράμετροι');
	return skiniko.stisimoPeparam(conn);
};

skiniko.stisimoPeparam = function(conn) {
	for (let login in skiniko.lista2) {
		let pektis = skiniko.pektis[login];

		skiniko.lista1[login] = 1;
		delete skiniko.lista2[login];

		let query = 'SELECT `param`, `timi` ' +
			'FROM `peparam` ' +
			'WHERE `pektis` = ' + login.json();

		conn.query(query, function(conn, rows) {
			rows.forEach(function(peparam) {
				peparam = new tavladoros.peparam(peparam);
				pektis.pektisPeparamPush(peparam);
			});

			skiniko.stisimoPeparam(conn);
		});

		return skiniko;
	}

	log.print('Προφίλ');
	return skiniko.stisimoProfinfo(conn);
};

skiniko.stisimoProfinfo = function(conn) {
	for (let login in skiniko.lista1) {
		let pektis = skiniko.pektis[login];

		skiniko.lista2[login] = 1;
		delete skiniko.lista1[login];

		let query = 'SELECT `sxoliastis`, `kimeno` ' +
			'FROM `profinfo` ' +
			'WHERE `pektis` = ' + login.json();

		conn.query(query, function(conn, rows) {
			rows.forEach(function(profinfo) {
				profinfo = new tavladoros.profinfo(profinfo);
				pektis.pektisProfinfoPush(profinfo);
			});

			skiniko.stisimoProfinfo(conn);
		});

		return skiniko;
	}

	log.print('Σχέσεις');
	return skiniko.stisimoSxesi(conn);
};

skiniko.stisimoSxesi = function(conn) {
	for (let login in skiniko.lista2) {
		let pektis = skiniko.pektis[login];

		skiniko.lista1[login] = 1;
		delete skiniko.lista2[login];

		let query = 'SELECT `sxetizomenos`, `sxesi` ' +
			'FROM `sxesi` ' +
			'WHERE `pektis` = ' + login.json();

		conn.query(query, function(conn, rows) {
			rows.forEach(function(sxesi) {
				sxesi = new tavladoros.sxesi(sxesi);
				pektis.pektisSxesiPush(sxesi);
			});

			skiniko.stisimoSxesi(conn);
		});

		return skiniko;
	}

	delete skiniko.lista1;
	delete skiniko.lista2;

	return server.ekinisi();
};
