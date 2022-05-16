<?php
require_once("../lib/selida.php");
Selida::unset_xristis();
Selida::header_json();

if ($error = Isodos::invalid_data())
Isodos::return_error($error);

if ($error = Isodos::oxi_xristis())
Isodos::return_error($error);

$_SESSION[SESSION_XRISTIS] = $_POST["login"];
print Globals::json_encode(array("login" => $_POST["login"]));

class Isodos {
	public static function invalid_data() {
		if (Selida::oxi_post("login"))
		return array(
			"pedio" => "login",
			"minima" => "Δεν περάστηκε login name χρήστη"
		);

		if (Globals::invalid_login($_POST["login"]))
		return array(
			"pedio" => "login",
			"minima" => "Μη αποδεκτό login name χρήστη"
		);

		if (Selida::oxi_post("kodikos"))
		return array(
			"pedio" => "kodikos",
			"minima" => "Δεν περάστηκε κωδικός χρήστη"
		);

		return FALSE;
	}

	public static function oxi_xristis() {
		$found = FALSE;

		$query = "SELECT 1 FROM `pektis` WHERE " .
			"(`login` = " . Globals::sql_string($_POST["login"]) . ") AND " .
			"(`kodikos` = " . Globals::sql_string(sha1($_POST["kodikos"])) . ")";
		$result = Globals::query($query);

		while ($result->fetch_row())
		$found = TRUE;

		$result->close();

		if ($found)
		return FALSE;

		return array(
			"pedio" => "login",
			"minima" => "Login failed",
		);
	}

	public static function return_error($error) {
		$error["error"] = 1;
		print Globals::json_encode($error);
		exit(0);
	}
}
?>
