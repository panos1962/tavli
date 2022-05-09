<?php
require_once("../lib/selida.php");

Selida::head();
Selida::stylesheet("test_test");
Selida::javascript("test_test");
Selida::body();
?>
Hello test/tavli!
<?php

$query = "SELECT * FROM `pektis` ORDER BY `login`";

$result = Globals::query($query);

while ($row = $result->fetch_object()) {
?>
<div>
<?php
	print $row->login;
?>
</div>
<?php
}

$result->close();

Selida::
klisimo();
?>
