INSERT INTO `trapezi` (
	`kodikos`,
	`pektis1`,
	`apodoxi1`,
	`pektis2`,
	`apodoxi2`
) VALUES
(1, 'panos', 'ΝΑΙ', 'maria', 'ΝΑΙ'),
(2, 'akis', 'ΝΑΙ', NULL, 'ΟΧΙ');

INSERT INTO `trparam` (
	`trapezi`,
	`param`,
	`timi`
) VALUES
(1, 'ΕΝΑΛΛΑΓΗ', 'ΠΛΦ'),
(1, 'ΠΡΙΒΕ', 'ΝΑΙ'),
(2, 'ΕΝΑΛΛΑΓΗ', 'Π'),
(2, 'ΙΔΙΟΚΤΗΤΟ', 'ΝΑΙ');

INSERT INTO `pexnidi` (
	`trapezi`,
	`idos`,
	`protos`,
	`xamenos`,
	`ita`
) VALUES
(1, 'ΠΟΡΤΕΣ', 1, 1, 'ΜΟΝΟ'),
(1, 'ΠΛΑΚΩΤΟ', 2, 1, 'ΜΟΝΟ'),
(1, 'ΦΕΥΓΑ', 2, 2, 'ΔΙΠΛΟ'),
(1, 'ΠΟΡΤΕΣ', 1, 1, 'ΜΟΝΟ'),
(2, 'ΠΟΡΤΕΣ', 2, 1, 'ΜΟΝΟ'),
(2, 'ΠΛΑΚΩΤΟ', 2, 1, 'ΜΟΝΟ');

INSERT INTO `simetoxi` (
	`trapezi`,
	`pektis`,
	`thesi`
) VALUES
(1, 'lakis', 1),
(1, 'sakis', 1),
(1, 'tasos', 1),
(1, 'silia', 2),
(1, 'takis', 2),
(2, 'alekos', 1),
(2, 'takis', 1);
