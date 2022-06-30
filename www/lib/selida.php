<?php
///////////////////////////////////////////////////////////////////////////////@
//
// Το παρόν αρχείο ορίζει το singleton "Selida" που χρησιμοποιείται σε όλα τα
// PHP προγράμματα που καλούνται από τον web server (apache, nginx κλπ).
//
///////////////////////////////////////////////////////////////////////////////@

// Χρησιμοποιούμε cookies για την αποθήκευση κυρίως του login name του χρήστη,
// επομένως ενεργοποιούμε το PHP session cookie.

session_start();

// Το login name του χρήστη που εκτελεί τα προγράμματα κρατείται στο session
// item με tag "xristis", οπότε ορίζουμε το εν λόγω tag ως συμβολική σταθερά.

define("SESSION_XRISTIS", "xristis");

define("SESSION_KLIDI", "klidi");
define("KLIDI_LENGTH", 6);

// Στα προγράμματα που συμπεριλαμβάνουμε το ανά χείρας αρχείο, δεν χρειάζεται
// να συμπεριλαμβάνουμε χωριστά τη βασική βιβλιοθήκη (common/lib/standard.php)
// καθώς τη συμπεριλαμβάνουμε εμμέσως σε αυτό το σημείο.

if (!class_exists('Globals'))
require_once(preg_replace("/\/lib\/selida\.php$/", "", __FILE__) . "/../common/lib/standard.php");

class Selida {
	// Η flag "init_ok" δείχνει αν έχει τρέξει  function "init". Θυμίζουμε
	// ότι η function "init" πρέπει να τρέχει κατά την έναρξη των PHP
	// προγραμμάτων που εκκινούν από τόν web server.

	private static $init_ok = FALSE;

	// Η μεταβλητή "path_root" δείχνει το pathname της εφαρμογής σε
	// σχέση με το domain, π.χ.
	//
	// Αν η εφαρμογή είναι στο "opasopa.net" στο directory "tavli",
	// το "path_root" είναι:
	//
	//	/tavli
	//
	// Αν η εφαρμογή είναι απευθείας στο "tavli.site", το "path_root"
	// είναι το κενό string.

	public static $path_root;

	// Η μεταβλητή "base_url" δείχνει το url της τοποθεσίας της αρχικής
	// σελίδας της εφαρμογής, π.χ.
	//
	// Αν η εφαρμογή φιλοξενείται στο "opasopa.net" στο directory "tavli",
	// το "base_url" είναι:
	//
	//	http://opasopa.net/tavli
	//
	// Αν η εφαρμογή είναι απευθείας στο "tavladoros.site", το "base_url"
	// είναι:
	//
	//	http://tavladoros.site
	//
	// Με άλλα λόγια, το "base_url" είναι το όνομα του domain συνοδευόμενο
	// από το "path_root".


	public static $base_url;

	// Η μεταβλητή "www_dir" δείχνει το full pathname των αρχείων της
	// εφαρμογής που είναι προσβάσιμα στον έξω κόσμο, π.χ.
	//
	//	/var/opt/tavli/www

	public static $www_dir;

	// Η μεταβλητή "xristis" περιέχει το login name του παίκτη που τρέχει
	// το πρόγραμμα, εφόσον ο χρήστης έχει εισέλθει στην εφαρμογή.

	public static $xristis = NULL;

	public static function init() {
		if (self::$init_ok)
		return;

		self::$init_ok = TRUE;

		$server_name = $_SERVER["SERVER_NAME"];
		switch ($server_name) {
		case "tavladoros.site":
		case "tavladoros.gr":
			self::$path_root = "";
			break;
		default:
			self::$path_root = "/tavli";
			break;
		}

		self::$base_url = "http://" . $server_name . self::$path_root;

		if (isset($_SERVER['SERVER_PORT']) && ($_SERVER['SERVER_PORT'] == 443)) {
			header("Location: " . self::$base_url);
			exit(0);
		}

		self::$www_dir = Globals::$base_dir . "/www";
		self::xristis_check();

		return __CLASS__;
	}

	private static function xristis_check() {
		if (!isset($_SESSION))
		fatal("no session");

		if (!is_array($_SESSION))
		fatal("_SESSION: not an array");

		if (!array_key_exists(SESSION_XRISTIS, $_SESSION))
		return self::xristis_unset();

		if (!$_SESSION[SESSION_XRISTIS])
		return self::xristis_unset();

		self::$xristis = $_SESSION[SESSION_XRISTIS];

		return __CLASS__;
	}

	public static function xristis_unset() {
		self::$xristis = NULL;
		unset($_SESSION[SESSION_XRISTIS]);

		return __CLASS__;
	}

	public static function head($titlos = "Τάβλι") {
?>
<!DOCTYPE html>
<html>
<head>
<link rel="icon" type="image/svg+xml" href="<?php
	print self::$base_url; ?>/ikona/misc/tavli.svg">
<title><?php print $titlos; ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<?php
		self::javascript("/lib/standardCommon");
		self::stylesheet("/lib/selida");
		self::javascript("/lib/selida");
		self::stylesheet("selida");
		self::javascript("selida");
?>
<script type="text/javascript">
//<![CDATA[
"use strict";

if (globals.gramataMask !== '<?php print GRAMATA_MASK; ?>')
throw new Error('globals.gramataMask !== GRAMATA_MASK');

if (globals.akindinaMask !== '<?php print AKINDINA_MASK ?>')
throw new Error('globals.akindinaMask !== AKINDINA_MASK');

if (globals.loginMask !== '<?php print LOGIN_MASK; ?>')
throw new Error('globals.loginMask !== LOGIN_MASK');

if (globals.onomaMask !== '<?php print ONOMA_MASK ?>')
throw new Error('globals.onomaMask !== ONOMA_MASK');

if (globals.emailMask !== '<?php print EMAIL_MASK ?>')
throw new Error('globals.emailMask !== EMAIL_MASK');

Selida.baseUrl = '<?php print self::$base_url; ?>';
Selida.pathRoot = '<?php print self::$path_root; ?>';
Selida.xristis = <?php
	if (self::is_xristis())
	print "'" . self::$xristis . "';";

	else
	print "undefined";
?>
//]]>
</script>
<?php

		return __CLASS__;
	}

	public static function body() {
?>
</head>
<body>
<?php
		return __CLASS__;
	}

	public static function klisimo() {
?>
</body>
</html>
<?php
		return __CLASS__;
	}

	public function stylesheet($css) {
		$css = preg_replace("/\.css$/", "", $css);
		$file = $css . ".css";

		if (substr($css, 0, 1) === "/") {
			$file = self::$www_dir . $file;
			$css = self::$base_url . $css;
		}

		if (!file_exists($file))
		return;

		$mtime = filemtime($file);
?>
<link rel="stylesheet" href="<?php print $css; ?>.css?mt=<?php print $mtime; ?>">
<?php
	}

	public function javascript($script) {
		$script = preg_replace("/(\.min)?\.js$/", "", $script);
		$file = $script . ".js";
		$filemin = $script . ".min.js";

		if (substr($script, 0, 1) === "/") {
			$file = self::$www_dir . $file;
			$filemin = self::$www_dir . $filemin;
			$script = self::$base_url . $script;
		}

		if (!file_exists($file))
		return;

		$mtime = filemtime($file);

		if (file_exists($filemin)) {
			$mtimemin = filemtime($filemin);

			if ($mtimemin > $mtime) {
				$script .= ".min";
				$mtime = $mtimemin;
			}
		}
?>
<script src="<?php print $script; ?>.js?mt=<?php print $mtime; ?>"></script>
<?php
		return __CLASS__;
	}

	public static function tavlijs() {
		$tavlijs = Globals::$conf->tavlijs . "/";
?>
<script src="<?php print $tavlijs . "tavlijsCore" .
	Globals::$conf->tavlijsJS; ?>"></script>
<link rel="stylesheet" href="<?php print $tavlijs . "tavlijs" .
	Globals::$conf->tavlijsCSS; ?>">
<script src="<?php print $tavlijs . "tavlijs" .
	Globals::$conf->tavlijsJS; ?>"></script>
<?php
	}

	public static function toolbar() {
?>
<div id="toolbar">
<div id="toolbarLeft">
</div>
<div id="toolbarCenter">
<?php
self::toolbarCenterZari(0);
self::toolbarCenterZari(1);
?>
</div>
<div id="toolbarRight">
</div>
</div>
<div id="fyi">
&#8203;
</div>
<div id="ofelimo">
<?php
		return __CLASS__;
	}

	private static function toolbarCenterZari($zari) {
?>
<div style="display: inline-block; height: 100%;">
<img src="<?php print Selida::$base_url; ?>/ikona/misc/zari<?php
	print $zari; ?>.png" style="height: 100%;">
</div>
<?php
	}

	public static function ribbon() {
?>
</div>
<div id="ribbon">
<div id="ribbonLeft">
</div>
<div id="ribbonCenter">
</div>
<div id="ribbonRight">
<div id="ribbonCopyright">
&copy;Panos Papadopoulos 2022-
</div>
</div>
<?php
		return __CLASS__;
	}

	public static function is_post($param) {
		if (!isset($param))
		return FALSE;

		if (!isset($_POST))
		return FALSE;

		if (!is_array($_POST))
		return FALSE;

		if (!array_key_exists($param, $_POST))
		return FALSE;

		return TRUE;
	}

	public static function oxi_post($param) {
		return !self::is_post($param, $_POST);
	}

	public static function is_xristis() {
		return isset(self::$xristis);
	}

	public static function oxi_xristis() {
		return !self::is_xristis();
	}

	public static function content_text() {
		header('Content-Type: text/html; charset=utf-8');
	}

	public static function content_json() {
		header('Content-Type: application/json; charset=utf-8');
	}
}

Selida::init();
?>
