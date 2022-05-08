<?php
require_once("../lib/selida.php");

Selida::
head()::
body();
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
