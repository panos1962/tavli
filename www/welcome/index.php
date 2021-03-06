<?php
Selida::head();
Selida::stylesheet("welcome/selida.css");
Selida::javascript("welcome/selida.js");

Selida::body();
Selida::toolbar();
?>
<div id="welcome">
<div>
Καλώς ορίσατε στον «Ταβλαδόρο».
Πρόκειται για ιστότοπο που επιχειρεί να προσομοιάσει ένα διαδικτυακό καφενείο
για τάβλι. Ο ιστότοπος σας δίνει τη δυνατότητα να παίξετε αμέτρητες παρτίδες
τάβλι με τους φίλους σας οποιαδήποτε ώρα και χωρίς να βρίσκεστε απαραίτητα
στον ίδιο χώρο.
Τα παιχνίδια που μπορείτε να παίξετε είναι «πόρτες», «πλακωτό» και «φεύγα»
με τους παραδοσιακούς κανόνες που ισχύουν στην Ελλάδα.
</div>
<div>
Για να παίξετε τάβλι στον «Ταβλαδόρο», αρκεί να
<a href="account/index.php">δημιουργήσετε λογαριασμό</a>,
να στήσετε ένα τραπέζι και να προσκαλέσετε τους
φίλους σας στο παιχνίδι, ή να αποδεχθείτε προσκλήσεις των φίλων σας για να
παίξετε στα δικά τους τραπέζια. Έχετε τη δυνατότητα να δημιουργήσετε φίλους,
να αποκλείσετε ενοχλητικά πρόσωπα και να συζητάτε με τους συμπαίκτες σας
για το παιχνίδι.
Επιπλέον, μπορείτε να συμμετέχετε ως θεατής σε τραπέζια τρίτων.
</div>
<div id="prosoxi">
Προσοχή!
</div>
<div>
Τα προγράμματα του «Ταβλαδόρου» αναπτύσσονται και ελέγχονται στους πιο
διαδεδομένους σύγχρονους browsers (Chrome, Firefox, Opera, Edge κλπ).
Ωστόσο, θα πρέπει να φροντίσετε ώστε να έχετε ενημερωμένες εκδόσεις
από τους browsers που χρησιμοποιείτε, προκειμένου, αφενός τα πρόγραμματα
να λειτουργούν ορθά και με τον προσήκοντα τρόπο, και αφετέρου να είστε
κατά το δυνατόν προστατευμένοι από κακόβουλα προγράμματα και άλλες
διαδικτυακές απειλές.
</div>
<div>
Για να εγγραφείτε και να κάνετε χρήση των προγραμμάτων του «Ταβλαδόρου»
θα πρέπει να είστε άνω των <?php print ILIKIA_MINIMUM; ?> ετών
και να έχετε διαβάσει προσεκτικά τους
<a id="arxikiXrisi" href="xrisi/index.php">όρους χρήσης</a> του ιστοτόπου.
Τέλος, τονίζουμε ρητά και κατηγορηματικά ότι απαγορεύεται οποιαδήποτε
χρήση του «Ταβλαδόρου» για την απόκτηση οικονομικού ή άλλου οφέλους μέσω
των παιχνιδιών, είτε απευθείας, είτε με οποιονδήποτε άλλον τρόπο
(στοιχήματα, διαφημίσεις κλπ).
</div>
</div>
<?php

Selida::ribbon();
Selida::klisimo();
?>
