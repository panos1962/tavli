<?php
require_once("../lib/selida.php");
Selida::content_text();

$pektis = new Pektis($_POST["login"]);

if ($pektis->is_pektis())
print "exists";
?>
