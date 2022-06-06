<?php
require_once("lib/selida.php");

if (Selida::is_xristis())
require_once("kafenes/index.php");

else
require_once("welcome/index.php");
?>
