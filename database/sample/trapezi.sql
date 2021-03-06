INSERT INTO `trapezi` (
	`kodikos`,
	`pektis1`,
	`apodoxi1`,
	`pektis2`,
	`apodoxi2`
) VALUES
(1, 'panos', 'ΝΑΙ', 'maria', 'ΝΑΙ'),
(2, 'akis', 'ΝΑΙ', NULL, 'ΟΧΙ'),
(3, 'mimis', 'ΝΑΙ', 'tasos', 'ΟΧΙ');

INSERT INTO `trparam` (
	`trapezi`,
	`param`,
	`timi`
) VALUES
(1, 'ΕΝΑΛΛΑΓΗ', 'ΠΛΦ'),
(1, 'ΠΡΙΒΕ', 'ΝΑΙ'),
(2, 'ΕΝΑΛΛΑΓΗ', 'Π'),
(2, 'ΙΔΙΟΚΤΗΤΟ', 'ΝΑΙ'),
(3, 'ΕΝΑΛΛΑΓΗ', 'ΠΛΦ'),
(3, 'ΙΔΙΟΚΤΗΤΟ', 'ΝΑΙ'),
(3, 'ΠΡΙΒΕ', 'ΝΑΙ');

INSERT INTO `pexnidi` (
	`kodikos`,
	`trapezi`,
	`idos`,
	`protos`,
	`xamenos`,
	`ita`
) VALUES
(1, 1, 'ΠΟΡΤΕΣ', 1, 1, 'ΜΟΝΟ'),
(2, 1, 'ΠΛΑΚΩΤΟ', 2, 1, 'ΜΟΝΟ'),
(3, 1, 'ΦΕΥΓΑ', 2, 2, 'ΔΙΠΛΟ'),
(4, 1, 'ΠΟΡΤΕΣ', 1, 1, 'ΜΟΝΟ');

INSERT INTO `kinisi` (
	`pexnidi`,
	`pektis`,
	`idos`,
	`data`
) VALUES
(4, 1, 'ΖΑΡΙΑ', '6:3'),
(4, 1, 'ΠΑΙΞΙΜΟ', '13:6:7:1');

INSERT INTO `simetoxi` (
	`trapezi`,
	`pektis`,
	`thesi`
) VALUES
(1, 'lola', 1),
(1, 'manos', 2),
(1, 'dakis', 2),
(1, 'silia', 1),
(1, 'takis', 2),
(2, 'fotis', 1),
(3, 'leta', 1),
(3, 'takis', 1);
