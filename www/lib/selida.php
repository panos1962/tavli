<?php
if (!class_exists('Globals'))
require_once(preg_replace("/\/lib\/selida\.php$/", "", __FILE__) . "/../common/lib/standard.php");

class Selida {
	private static $init_ok = FALSE;
	public static $www;

	public static function init() {
		if (self::$init_ok)
		return;

		self::$init_ok = TRUE;

		$server_name = $_SERVER["SERVER_NAME"];
		switch ($server_name) {
		case "tavladoros.gr":
			self::$www = "http://" . $_SERVER["SERVER_NAME"];
			break;
		default:
			self::$www = "http://" . $_SERVER["SERVER_NAME"] . "/tavli";
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
?>
<link rel="stylesheet" href="<?php print $css; ?>">
<?php
	}

	public function javascript($script) {
		$file = Globals::$base_dir . "/www/" . $script . ".js";

		if (!file_exists($file))
		return;

		$mtime = filemtime($file);
		$file1 = Globals::$base_dir . "/www/" . $script . ".min.js";

		if (file_exists($file1)) {
			$mtime1 = filemtime($file1);
			if ($mtime1 > $mtime) {
				$script .= ".min";
				$mtime = $mtime1;
			}
		}
?>
<script src="<?php
print self::www($script); ?>.js?mt=<?php
print $mtime; ?>"></script>
<?php
		return __CLASS__;
	}

	public function www($file) {
		if (substr($file, 0, 1) === "/")
		return self::$www . $file;

		return self::$www . "/" . $file;
	}
}

Selida::init();
?>
