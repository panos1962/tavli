<?php
require_once("../lib/selida.php");

Selida::head();
Selida::javascript("/lib/skinikoCommon");
Selida::stylesheet("/lib/skiniko");
Selida::javascript("/lib/skiniko");
Selida::body();
Selida::toolbar();
Selida::ribbon();
Selida::klisimo();
?>
