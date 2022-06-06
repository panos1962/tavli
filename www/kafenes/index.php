<?php
if (Selida::oxi_xristis())
exit(0);

Selida::head();
Selida::stylesheet("kafenes/selida.css");
Selida::javascript("kafenes/selida.js");

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

<div id="panelMain"></div>

<div id="pasArea">
<div id="prosklisiArea"></div>
<div id="anazitisiArea"></div>
<div id="sizitisiArea"></div>
</div>

<div id="panelPas"></div>
<?php
Selida::ribbon();
Selida::klisimo();
?>
