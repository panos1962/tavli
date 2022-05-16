<?php
require_once("../lib/selida.php");

Selida::head();
Selida::body();
Selida::toolbar();
?>
<form id="accountForma" class="forma">
	<div class="formaTitlos">
<?php
print (Selida::is_xristis() ? "Ενημέρωση στοιχείων" : "Φόρμα εγγραφής");
?>
	</div>

	<div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Login</div>
			<input id="accountLogin" class="pedioInput" value="<?php
if (Selida::is_xristis())
print Selida::$pektis->login; ?>">
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Ονοματεπώνυμο</div>
			<input id="accountOnoma" class="pedioInput" value="<?php
if (Selida::is_xristis())
print Selida::$pektis->onoma; ?>">
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Email</div>
			<input id="accountEmail" class="pedioInput" value="<?php
if (Selida::is_xristis())
print Selida::$pektis->email; ?>">
		</div>
<?php
if (Selida::is_xristis()) {
?>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Τρέχων κωδικός</div>
			<input id="accountKodikos" class="pedioInput" type="password">
		</div>
<?php
}
else {
?>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Ηλικία</div>
			<input type="checkbox" id="accountIlikia" class="pedioInput">
			<label for="accountIlikia">είμαι άνω των 18 ετών</label>
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">
				Όροι χρήσης
			</div>
			<div>
				<input type="checkbox" id="accountXrisiDiavasa" class="pedioInput">
				<label for="accountXrisiDiavasa">τους έχω διαβάσει</label><br>
				<input type="checkbox" id="accountXrisiKatanoisa" class="pedioInput">
				<label for="accountXrisiKatanoisa">τους έχω κατανοήσει</label>
			</div>
		</div>
<?php
}
?>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign"><?php
print (Selida::is_xristis() ? "Νέος κωδικός" : "Κωδικός");
?>
		</div>
			<input id="accountKodikos1" class="pedioInput" type="password">
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Επανάληψη</div>
			<input id="accountKodikos2" class="pedioInput" type="password">
		</div>
	</div>

	<div class="formaPanel">
		<input id="accountSubmit" type="submit" class="formaPliktro" value="<?php
print (Selida::is_xristis() ? "Ενημέρωση" : "Εγγραφή");
?>">
		<input id="accountReset" type="reset" class="formaPliktro" value="Καθαρισμός">
		<input id="accountCancel" type="button" class="formaPliktro" value="'Ακυρο">
	</div>
</form>


<?php
Selida::ribbon();
Selida::klisimo();
?>
