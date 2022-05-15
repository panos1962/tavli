<?php
require_once("lib/selida.php");

Selida::head();
Selida::body();
Selida::toolbar();

if (Selida::is_xristis())
require_once("eponimo.php");

else
require_once("anonimo.html");

Selida::ribbon();
Selida::klisimo();
?>
