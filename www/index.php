<?php
require_once("lib/selida.php");

if (Selida::is_xristis())
require_once("eponimo.php");

else
require_once("anonimo.php");
?>
