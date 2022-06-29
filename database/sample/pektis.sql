INSERT INTO `pektis` (
	`login`,
	`onoma`,
	`email`,
	`kodikos`
) VALUES
('panos', 'Πάνος Παπαδόπουλος', 'panos@tavladoros.site', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('akis', 'Άκης Πετρετζίκης', 'akis@xyz.io', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('dakis', 'Ιορδάνης Δουβλετής', 'dakis@eleo.com', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('maria', 'Μαρία Πενταγιώτισσα', 'maripenta@yahoo.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('tasos', 'Τάσος Καρατάσος', NULL, 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('dora', 'Δώρα Καργάκη', 'dorak@yahoo.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('manos', 'Μάνος Καραμάνος', NULL, 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('silia', 'Σίλβια Ιωαννίδου', 'silia@newlife.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('mimis', 'Δημήτρης Μιμιλίδης', 'dmimil@yahoo.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('alekos', 'Αλέκος Μπαρμπαλέκος', 'barbalekos@prestige.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('sakis', 'Θανάσης Αλεξιάδης', NULL, 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('takis', 'Τάκης Σιλιβέρδης', 'siliverdis@daytona.us', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('mitsos', 'Δημήτρης Γράψας', 'grapsas@yahoo.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('lola', 'Λόλα Δημητριάδου', 'loladim@gmail.com', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('soula', 'Αναστασία Βελή', NULL, 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('lela', 'Ελένη Κεσίδου', 'el.kesidou@ert.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('fotis', 'Φώτης Καραφώτης', NULL, 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('teta', 'Αναστασία Τελίδου', NULL, 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('leta', 'Ελισάβετ Δαγκλή', 'el.dagkli@hcn.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('eleni', 'Ελένη Μακρή', NULL, 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('vagos', 'Βαγγέλης Μητρούσης', 'v.mitrousis@yahoo.gr', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('litsa', 'Ευαγγελία Νομικού', 'eva.nomik@hotmail.com', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('zisis', 'Ζήσης Καραφώτης', 'karafotis62@gmail.com', 'b60d121b438a380c343d5ec3c2037564b82ffef3'),
('lakis', 'Λάκης Γαβαλάς', 'gavalas@abc.com', 'b60d121b438a380c343d5ec3c2037564b82ffef3');

INSERT INTO `peparam` (
	`pektis`,
	`param`,
	`timi`
) VALUES
('panos', 'ΠΟΥΛΙΑ', 'ΜΑΥΡΑ'),
('panos', 'ΑΠΑΣΧΟΛΗΜΕΝΟΣ', 'ΝΑΙ'),
('panos', 'ΑΞΙΩΜΑ', 'ADMINISTRATOR'),
('maria', 'ΠΟΥΛΙΑ', 'ΑΣΠΡΑ'),
('maria', 'ΑΞΙΩΜΑ', 'VIP'),
('tasos', 'ΑΞΙΩΜΑ', 'ΕΠΟΠΤΗΣ');

INSERT INTO `profinfo` (
	`pektis`,
	`sxoliastis`,
	`kimeno`
) VALUES
('panos', 'panos', 'Είμαι μαθηματικός και έχω γεννηθεί το 1962. Εκτός από τάβλι, παίζω πρέφα και μπουρλότο'),
('panos', 'maria', 'Τηλ. 2310-999222.\nΚινητό: 6977-888999'),
('panos', 'tasos', 'Καλός παίκτης. Έχει κάνει το site'),
('maria', 'maria', 'Οι φίλοι με φωνάζουν Μαράκι. Αν είσαι νευρικός μην με καλέσεις.');

INSERT INTO `sxesi` (
	`pektis`,
	`sxetizomenos`,
	`sxesi`
) VALUES
('panos', 'maria', 'ΦΙΛΟΣ'),
('panos', 'tasos', 'ΦΙΛΟΣ'),
('panos', 'zisis', 'ΑΠΟΚΛΕΙΣΜΕΝΟΣ'),
('maria', 'panos', 'ΦΙΛΟΣ'),
('maria', 'dora', 'ΦΙΛΟΣ'),
('tasos', 'akis', 'ΦΙΛΟΣ');
