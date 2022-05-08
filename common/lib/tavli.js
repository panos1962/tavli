"use strict";

var tavli = {};

tavli.peparamAxioma = 'ΑΞΙΩΜΑ';
tavli.peparamKatastasi = 'ΚΑΤΑΣΤΑΣΗ';
tavli.peparamPoulia = 'ΠΟΥΛΙΑ';
tavli.peparamApodosi = 'ΑΠΟΔΟΣΗ';

tavli.peparamValid = {};
tavli.peparamValid[tavli.peparamAxioma] = 1;
tavli.peparamValid[tavli.peparamKatastasi] = 1;
tavli.peparamValid[tavli.peparamPoulia] = 1;
tavli.peparamValid[tavli.peparamApodosi] = 1;

tavli.axiomaThamonas = 'ΘΑΜΩΝΑΣ';
tavli.axiomaVip = 'VIP';
tavli.axiomaEpoptis = 'ΕΠΟΠΤΗΣ';
tavli.axiomaDiaxiristis = 'ΔΙΑΧΕΙΡΙΣΤΗΣ';
tavli.axiomaAdministrator = 'ADMINISTRATOR';
tavli.axiomaProedros = 'ΠΡΟΕΔΡΟΣ';

tavli.katastasiEleftheros = 'ΕΛΕΥΘΕΡΟΣ';
tavli.katastasiApasxolimenos = 'ΑΠΑΣΧΟΛΗΜΕΝΟΣ';

tavli.pouliaAspra = 'ΑΣΠΡΑ';
tavli.pouliaMavra = 'ΜΑΥΡΑ';

tavli.axiomaRank = {};
tavli.axiomaRank[tavli.axiomaThamonas] = 0;
tavli.axiomaRank[tavli.axiomaVip] = 10;
tavli.axiomaRank[tavli.axiomaEpoptis] = 20;
tavli.axiomaRank[tavli.axiomaDiaxiristis] = 30;
tavli.axiomaRank[tavli.axiomaAdministrator] = 40;
tavli.axiomaRank[tavli.axiomaProedros] = 50;

tavli.peparamDefault = {};
tavli.peparamDefault[tavli.peparamAxioma] = tavli.axiomaThamonas;
tavli.peparamDefault[tavli.peparamKatastasi] = tavli.katastasiEleftheros;
tavli.peparamDefault[tavli.peparamPoulia] = tavli.pouliaAspra;
tavli.peparamDefault[tavli.peparamApodosi] = '';
