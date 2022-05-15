<?php
define("SESSION_XRISTIS", "xristis");
session_start();

if (!class_exists('Globals'))
require_once(preg_replace("/\/lib\/selida\.php$/", "", __FILE__) . "/../common/lib/standard.php");

class Selida {
	private static $init_ok = FALSE;
	public static $base_url;
	public static $www_dir;
	public static $path_root;
	public static $pektis = NULL;

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
		self::check_xristis();

		return __CLASS__;
	}

	public static function unset_xristis() {
		self::$pektis = NULL;
		unset($_SESSION[SESSION_XRISTIS]);
		return __CLASS__;
	}

	private static function check_xristis() {
		if (!isset($_SESSION))
		return __CLASS__;

		if (!is_array($_SESSION))
		return __CLASS__;

		if (!array_key_exists(SESSION_XRISTIS, $_SESSION))
		return __CLASS__;

		if (!$_SESSION[SESSION_XRISTIS])
		return self::unset_xristis();

		$query = "SELECT * FROM `pektis` WHERE `login` = " .
			Globals::sql_string($_SESSION[SESSION_XRISTIS]);
		$result = Globals::query($query);
		self::$pektis = $result->fetch_object();
		$result->close();

		if (self::$pektis)
		return __CLASS__;

		return self::unset_xristis();
	}

	public static function head($titlos = "Τάβλι") {
?>
<!DOCTYPE html>
<html>
<head>
<link rel="icon" type="image/svg+xml" href="<?php print self::$base_url; ?>/ikona/tavli.svg">
<title><?php print $titlos; ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<?php
		self::stylesheet("/lib/selida");
		self::stylesheet("selida");

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
		self::javascript("/lib/standardCommon");
?>
<script type="text/javascript">
//<![CDATA[
"use strict";

if (Globals.gramataMask !== '<?php print GRAMATA_MASK; ?>')
throw new Error('Globals.gramataMask !== GRAMATA_MASK');

if (Globals.akindinaMask !== '<?php print AKINDINA_MASK ?>')
throw new Error('Globals.akindinaMask !== AKINDINA_MASK');

if (Globals.loginMask !== '<?php print LOGIN_MASK; ?>')
throw new Error('Globals.loginMask !== LOGIN_MASK');

if (Globals.onomaMask !== '<?php print ONOMA_MASK ?>')
throw new Error('Globals.onomaMask !== ONOMA_MASK');

var Selida = {};

Selida.baseUrl = '<?php print self::$base_url; ?>';
Selida.pathRoot = '<?php print self::$path_root; ?>';
Selida.xristis = <?php
	if (self::is_xristis())
	print "'" . self::$pektis->login . "'";

	else
	print "undefined";
?>
//]]>
</script>
<?php
		self::javascript("/lib/selida");
		self::javascript("selida");
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
<img src="<?php print Selida::$base_url; ?>/ikona/zari<?php
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

	public static function header_json() {
		header('Content-Type: application/json; charset=utf-8');
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
		return isset(self::$pektis);
	}

	public static function oxi_xristis() {
		return !self::is_xristis();
	}
}

Selida::init();
?>
