INSERT INTO `trapezi` (
	`kodikos`,
	`pektis1`,
	`apodoxi1`,
	`pektis2`,
	`apodoxi2`
) VALUES
(1, 'panos', 'ΝΑΙ', 'maria', 'ΟΧΙ'),
(2, 'akis', 'ΟΧΙ', NULL, 'ΟΧΙ');

INSERT INTO `trparam` (
	`trapezi`,
	`param`,
	`timi`
) VALUES
(1, 'ΕΝΑΛΛΑΓΗ', 'ΠΛΦ'),
(1, 'ΠΡΙΒΕ', 'ΝΑΙ'),
(2, 'ΕΝΑΛΛΑΓΗ', 'Π'),
(2, 'ΙΔΙΟΚΤΗΤΟ', 'ΝΑΙ');
