"use strict";

var Tavladoros = {};

Tavladoros.peparamAxioma = 'ΑΞΙΩΜΑ';
Tavladoros.peparamKatastasi = 'ΚΑΤΑΣΤΑΣΗ';
Tavladoros.peparamPoulia = 'ΠΟΥΛΙΑ';
Tavladoros.peparamApodosi = 'ΑΠΟΔΟΣΗ';

Tavladoros.peparamValid = {};
Tavladoros.peparamValid[Tavladoros.peparamAxioma] = 1;
Tavladoros.peparamValid[Tavladoros.peparamKatastasi] = 1;
Tavladoros.peparamValid[Tavladoros.peparamPoulia] = 1;
Tavladoros.peparamValid[Tavladoros.peparamApodosi] = 1;

Tavladoros.axiomaThamonas = 'ΘΑΜΩΝΑΣ';
Tavladoros.axiomaVip = 'VIP';
Tavladoros.axiomaEpoptis = 'ΕΠΟΠΤΗΣ';
Tavladoros.axiomaDiaxiristis = 'ΔΙΑΧΕΙΡΙΣΤΗΣ';
Tavladoros.axiomaAdministrator = 'ADMINISTRATOR';
Tavladoros.axiomaProedros = 'ΠΡΟΕΔΡΟΣ';

Tavladoros.katastasiEleftheros = 'ΕΛΕΥΘΕΡΟΣ';
Tavladoros.katastasiApasxolimenos = 'ΑΠΑΣΧΟΛΗΜΕΝΟΣ';

Tavladoros.pouliaAspra = 'ΑΣΠΡΑ';
Tavladoros.pouliaMavra = 'ΜΑΥΡΑ';

Tavladoros.axiomaRank = {};
Tavladoros.axiomaRank[Tavladoros.axiomaThamonas] = 0;
Tavladoros.axiomaRank[Tavladoros.axiomaVip] = 10;
Tavladoros.axiomaRank[Tavladoros.axiomaEpoptis] = 20;
Tavladoros.axiomaRank[Tavladoros.axiomaDiaxiristis] = 30;
Tavladoros.axiomaRank[Tavladoros.axiomaAdministrator] = 40;
Tavladoros.axiomaRank[Tavladoros.axiomaProedros] = 50;

Tavladoros.peparamDefault = {};
Tavladoros.peparamDefault[Tavladoros.peparamAxioma] = Tavladoros.axiomaThamonas;
Tavladoros.peparamDefault[Tavladoros.peparamKatastasi] = Tavladoros.katastasiEleftheros;
Tavladoros.peparamDefault[Tavladoros.peparamPoulia] = Tavladoros.pouliaAspra;
Tavladoros.peparamDefault[Tavladoros.peparamApodosi] = '';
