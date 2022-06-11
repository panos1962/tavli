<?php
if (Selida::oxi_xristis())
exit(0);

$plist = [
	"ROYBAS",
	"ntinos",
	"mixalhstz",
	"liados",
	"kaklamanakis",
	"manolis9494",
	"thaxaseis",
	"gigo68",
	"armenoi",
	"mdask",
	"georg1",
	"FOTO",
	"Asxetosss",
	"Tragikos",
	"taro",
	"mesitis",
	"gretafar2",
	"Lb",
	"STRATOSCHATZI",
	"xanthakos",
	"petraras56",
	"dmouts59",
	"VAROUFAKIS",
	"meliss",
	"jimdad",
	"apo",
	"vassilis_a",
	"stam1",
	"gmarietis",
	"MAGOYFAKARDIA",
	"kpat",
	"dimzio",
	"BILHS3876",
	"nickm",
	"stamg",
	"HORSE",
	"KostaKosta",
	"XALARA",
	"MILHAR",
	"Vakats",
	"PREFOKATHIGITIS",
];
$pcount = count($plist) - 1;

function print_pektis() {
	global $plist;
	global $pcount;

	for ($i = 0; $i <= $pcount; $i++) {
	?>
<div class="pektis"><?php print $plist[$i]; ?></div>
	<?php
	}
}

function print_trapezi() {
	global $plist;
	global $pcount;
	$kodikos = 138345;
	$tcount = 10;

	for ($i = 0; $i < $tcount; $i++) {
		$pektis1 = random_int(0, $pcount);
		$pektis2 = random_int(0, $pcount);

		if ($pektis2 === $pektis1) {
			$pektis2--;

			if ($pektis2 < 0)
			$pektis2 = $pcount;
		}
	?>
<div class="trapeziArea">
<div class="trapezi">
<div class="trapeziKodikos">
<?php print $kodikos; ?>
</div>
<div class="pektis trapeziPektis1">
<?php print $plist[$pektis1]; ?>
</div>
<div class="pektis trapeziPektis2">
<?php print $plist[$pektis2]; ?>
</div>
</div>
<div class="trapeziTheatisArea">
<?php print_theatis(random_int(0, 3)); ?>
</div>
</div>
	<?php
	}
}

function print_theatis($n) {
	if ($n > 0)
	return;

	global $plist;
	global $pcount;

	$count = random_int(1, 10);

	for ($i = 0; $i < $count; $i++) {
?>
<div class="pektis trapeziTheatis">
<?php print $plist[random_int(0, $pcount)]; ?>
</div>
<?php
	}
}

function print_rebelos() {
	global $plist;
	global $pcount;

	$count = random_int(0, $pcount);

	for ($i = 0; $i < $count; $i++) {
?>
<div class="pektis kafenioRebelos">
<?php print $plist[random_int(0, $pcount)]; ?>
</div>
<?php
	}
}


Selida::head();
Selida::stylesheet("tavlijs/tavlijs");
Selida::javascript("tavlijs/tavlijs");
Selida::stylesheet("lib/panel");
Selida::javascript("lib/panel");
Selida::stylesheet("kafenes/selida");
Selida::javascript("kafenes/selida");

Selida::body();
Selida::toolbar();
?>
<div id="panelMain"></div>

<div id="pektisArea">
<?php print_pektis(); ?>
</div>
<div id="panelPektis"></div>

<div id="kafenioArea">
<div id="rebelosArea">
<?php print_rebelos(); ?>
</div>
<div id="trapeziArea">
<?php print_trapezi(); ?>
</div>
</div>
<div id="panelKafenio"></div>

<div id="partidaArea">
<div id="diathesimosArea"></div>
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
