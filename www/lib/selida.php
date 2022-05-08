<?php
if (!class_exists('Globals'))
require_once(preg_replace("/\/lib\/selida\.php$/", "", __FILE__) . "/../common/lib/standard.php");

class Selida {
	private static $init_ok = FALSE;
	public static $www_dir;

	public static function init() {
		if (self::$init_ok)
		return;

		self::$init_ok = TRUE;

		$server_name = $_SERVER["SERVER_NAME"];
		switch ($server_name) {
		case "tavladoros.gr":
			self::$www_dir = "http://" . $_SERVER["SERVER_NAME"];
			break;
		default:
			self::$www_dir = "http://" . $_SERVER["SERVER_NAME"] . "/tavli";
			break;
		}

		return __CLASS__;
	}

	public static function head($titlos = "Τάβλι") {
?>
<html>
<head>
<link rel="icon" type="image/svg+xml" href="<?php print self::www("ikona/tavli.svg"); ?>">
<title>
<?php print $titlos; ?>
</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<?php print Selida::www("lib/selida.css"); ?>">
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
?>
<link rel="stylesheet" href="<?php print $css; ?>">
<?php
	}

	public function javascript($js) {
?>
<script src="<?php print $js; ?>"></script>
<?php
		return __CLASS__;
	}

	public function www($file) {
		if (substr($file, 0, 1) === "/")
		return self::$www_dir . $file;

		return self::$www_dir . "/" . $file;
	}
}

Selida::init();
?>
