<?php
class Globals {
	private static $init_ok = FALSE;
	public static $base_dir;

	public static function init() {
		if (self::$init_ok)
		return;

		self::$base_dir = preg_replace("/\/common\/lib\/standard.php$/", "", __FILE__);
		self::$init_ok = TRUE;
	}
}

Globals::init();
?>
