<?php
if (!class_exists('Globals'))
require_once(preg_replace("/\/lib\/selida\.php$/", "", __FILE__) . "/../common/lib/standard.php");

class Selida {
	private static $init_ok = FALSE;
	public static $base_url;
	public static $www_dir;
	public static $path_root;

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

		return __CLASS__;
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
var Selida = {};
Selida.baseUrl = '<?php print self::$base_url; ?>';
Selida.pathRoot = '<?php print self::$path_root; ?>';
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
}

Selida::init();
?>
