<?php

class Test_kafenes {
	private static $plist;
	private static $pcount;

	public static function init() {
		self::$plist = [
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

		self::$pcount = count(self::$plist) - 1;
	}

	public static function print_pektis() {
		for ($i = 0; $i <= self::$pcount; $i++) {
?>
<div class="pektis"><?php print self::$plist[$i]; ?></div>
<?php
		}
	}

	public static function print_trapezi() {
		$kodikos = 138345;
		$tcount = 10;

		for ($i = 0; $i < $tcount; $i++) {
			$pektis1 = random_int(0, self::$pcount);
			$pektis2 = random_int(0, self::$pcount);

			if ($pektis2 === $pektis1) {
				$pektis2--;

				if ($pektis2 < 0)
				$pektis2 = self::$pcount;
			}
?>
<div class="trapeziArea">
<div class="trapezi">
<div class="trapeziKodikos">
<?php print $kodikos; ?>
</div>
<div class="pektis trapeziPektis1">
<?php print self::$plist[$pektis1]; ?>
</div>
<div class="pektis trapeziPektis2">
<?php print self::$plist[$pektis2]; ?>
</div>
</div>
<div class="trapeziTheatisArea">
<?php self::print_theatis(random_int(0, 3)); ?>
</div>
</div>
<?php
		}
	}

	public static function print_theatis($n) {
		if ($n > 0)
		return;

		$count = random_int(1, 10);

		for ($i = 0; $i < $count; $i++) {
?>
<div class="pektis trapeziTheatis">
<?php print self::$plist[random_int(0, self::$pcount)]; ?>
</div>
<?php
		}
	}

	public static function print_rebelos() {
		$count = random_int(0, self::$pcount);

		for ($i = 0; $i < $count; $i++) {
?>
<div class="pektis kafenioRebelos">
<?php print self::$plist[random_int(0, self::$pcount)]; ?>
</div>
<?php
		}
	}
}

Test_kafenes::init();
?>
