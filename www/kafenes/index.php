<?php
if (Selida::oxi_xristis())
exit(0);

Selida::head();
Selida::stylesheet("lib/panel.css");
Selida::javascript("lib/panel.js");
Selida::stylesheet("kafenes/selida.css");
Selida::javascript("kafenes/selida.js");

Selida::body();
Selida::toolbar();
?>
<div id="panelMain"></div>

<div id="pektisArea">
<?php
for ($i = 0; $i < 50; $i++) {
?>
<div class="pektis">panos</div>
<?php
}
?>
</div>
<div id="panelPektis"></div>

<div id="kafenioArea">
<div id="rebelosArea"></div>
<div id="trapeziArea"></div>
</div>
<div id="panelKafenio"></div>

<div id="partidaArea">
<div id="diathesimosArea"></div>
<div id="pexnidiArea"></div>
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
