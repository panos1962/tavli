<?php
require_once("../lib/selida.php");

Selida::head();
Selida::body();
Selida::toolbar();
?>
<form id="egrafiForma" class="forma">
	<div class="formaTitlos">
		Φόρμα εγγραφής
	</div>

	<div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Login</div>
			<input id="egrafiLogin" class="pedioInput">
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Ονοματεπώνυμο</div>
			<input id="egrafiOnoma" class="pedioInput">
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Email</div>
			<input id="egrafiEmail" class="pedioInput">
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Ηλικία</div>
			<input type="checkbox" id="egrafiIlikia" class="pedioInput">
			<label for="egrafiIlikia">είμαι άνω των 18 ετών</label>
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">
				Όροι χρήσης
			</div>
			<div>
				<input type="checkbox" id="egrafiXrisiDiavasa" class="pedioInput">
				<label for="egrafiXrisiDiavasa">τους έχω διαβάσει</label><br>
				<input type="checkbox" id="egrafiXrisiKatanoisa" class="pedioInput">
				<label for="egrafiXrisiKatanoisa">τους έχω κατανοήσει</label>
			</div>
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Κωδικός</div>
			<input id="egrafiKodikos1" class="pedioInput" type="password">
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Επανάληψη</div>
			<input id="egrafiKodikos2" class="pedioInput" type="password">
		</div>
	</div>

	<div class="formaPanel">
		<input id="egrafiSubmit" type="submit" class="formaPliktro" value="Εγγραφή">
		<input id="egrafiReset" type="reset" class="formaPliktro" value="Καθαρισμός">
		<input id="egrafiCancel" type="button" class="formaPliktro" value="'Ακυρο">
	</div>
</form>


<?php
Selida::ribbon();
Selida::klisimo();
?>
