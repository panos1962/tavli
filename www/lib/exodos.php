<?php
require_once("selida.php");

unset($_SESSION[SESSION_XRISTIS]);
header("Location: " . Selida::$base_url);
?>
