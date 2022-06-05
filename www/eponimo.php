<?php
require_once("lib/selida.php");

if (Selida::oxi_xristis())
exit(0);

Selida::head();
Selida::stylesheet("eponimo");
Selida::javascript("eponimo");

Selida::body();
Selida::toolbar();
?>
<div id="pektisArea"></div>

<div id="kafenioArea">
<div id="rebelosArea"></div>
<div id="trapeziArea"></div>
</div>

<div id="partidaArea">
<div id="diathesimosArea"></div>
<div id="pexnidiArea"></div>
</div>

<div id="toolkitMain" class="toolkitVertical"></div>

<div id="pasArea">
<div id="prosklisiArea"></div>
<div id="anazitisiArea"></div>
<div id="sizitisiArea"></div>
</div>

<div id="toolkitPas" class="toolkitVertical"></div>
<?php
Selida::ribbon();
Selida::klisimo();
?>
