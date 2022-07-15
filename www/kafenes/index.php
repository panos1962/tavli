<?php
if (Selida::oxi_xristis())
exit(0);

#require_once("test.php");

Selida::head();
Selida::tavlijs();
Selida::javascript("lib/tavladorosCommon");
Selida::javascript("lib/tavladoros");
Selida::javascript("lib/skinikoCommon");
Selida::javascript("lib/skiniko");
Selida::stylesheet("lib/panel");
Selida::javascript("lib/panel");
Selida::stylesheet("kafenes/selida");
Selida::javascript("kafenes/selida");

Selida::body();
Selida::toolbar();
?>
<div id="panelMain"></div>

<div id="pektisArea">
<?php if (class_exists("Test_kafenes")) Test_kafenes::print_pektis(); ?>
</div>
<div id="panelPektis"></div>

<div id="kafenioArea">
<div id="rebelosArea">
<?php if (class_exists("Test_kafenes")) Test_kafenes::print_rebelos(); ?>
</div>
<div id="trapeziArea">
<?php if (class_exists("Test_kafenes")) Test_kafenes::print_trapezi(); ?>
</div>
</div>
<div id="panelKafenio"></div>

<div id="partidaArea">
<div id="eleftherosArea"></div>
<div class="partidaPektisArea" id="partidaPektis2Area"></div>
<div id="pexnidiArea"></div>
<div class="partidaPektisArea" id="partidaPektis1Area"></div>
<div id="theatisArea"></div>
</div>
<div id="panelPartida"></div>

<div id="pasArea">
<div id="panelProsklisi"></div>
<div id="prosklisiArea"></div>
<div id="panelAnazitisi"></div>
<div id="anazitisiArea"></div>
<div id="panelSizitisi"></div>
<div id="sizitisiArea"></div>
</div>
<div id="panelPas"></div>

<?php
Selida::ribbon();
Selida::klisimo();
?>
