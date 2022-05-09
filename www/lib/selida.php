<?php
if (!class_exists('Globals'))
require_once(preg_replace("/\/lib\/selida\.php$/", "", __FILE__) . "/../common/lib/standard.php");

class Selida {
	private static $init_ok = FALSE;
	public static $base_url;
	public static $www_dir;

	public static function init() {
		if (self::$init_ok)
		return;

		self::$init_ok = TRUE;

		$server_name = $_SERVER["SERVER_NAME"];
		switch ($server_name) {
		case "tavladoros.gr":
			self::$base_url = "http://" . $server_name;
			break;
		default:
			self::$base_url = "http://" . $_server_name . "/tavli";
			break;
		}

		self::$www_dir = self::$base_dir . "/www";

		return __CLASS__;
	}

	public static function head($titlos = "Τάβλι") {
?>
<html>
<head>
<link rel="icon" type="image/svg+xml" href="<?php print self::url("ikona/tavli.svg"); ?>">
<title><?php print $titlos; ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
<?php
		self::css("lib/selida");
		self::javascript("lib/selida");

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
		$file = self::$www_dir . "/" . $script . ".js";
?>
<link rel="stylesheet" href="<?php print $css; ?>.css">
<?php
	}

	public function javascript($script) {
		if (substr($script, 0, 1) !== "/")
		$file = self::$www_dir . "/" . $script . ".js";

		if (!file_exists($file))
		return;

		$mtime = filemtime($file);

		$filemin = self::$www_dir . "/" . $script . ".min.js";

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

	public function url($file) {
		if (substr($file, 0, 1) !== "/")
		$file = "/" . $file;

		return self::$base_url . $file;
	}
}

Selida::init();
?>
