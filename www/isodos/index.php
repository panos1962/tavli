<?php
require_once("../lib/selida.php");

Selida::unset_xristis();
Selida::head();
Selida::body();
Selida::toolbar();
?>
<form id="isodosForma" class="forma">
	<div class="formaTitlos">
		Φόρμα εγγραφής
	</div>

	<div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Login</div>
			<input id="isodosLogin" class="pedioInput">
		</div>
		<div class="inputEnotita">
			<div class="pedioPrompt promptAlign">Κωδικός</div>
			<input id="isodosKodikos" class="pedioInput" type="password">
		</div>
	</div>

	<div class="formaPanel">
		<input id="isodosSubmit" type="submit" class="formaPliktro" value="Εγγραφή">
		<input id="isodosReset" type="reset" class="formaPliktro" value="Καθαρισμός">
		<input id="isodosCancel" type="button" class="formaPliktro" value="'Ακυρο">
	</div>
</form>


<?php
Selida::ribbon();
Selida::klisimo();
?>
