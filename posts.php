<?php
include("mysql.php");
if($_POST["action"] == "saveAsNewMap"){
	$baseMapsId = $_POST["baseMapsId"];
	$mapData = $_POST["mapData"];
	$sql = "INSERT INTO maps
			VALUES (NULL, '$baseMapsId', '$mapData');";
	$query = mysql_query($sql);

	$sql = "SELECT maps.map_id
			FROM maps
			ORDER BY maps.map_id DESC
			LIMIT 1;";
	$query = mysql_query($sql);
	$result = mysql_fetch_assoc($query);

	$mapId = $result["map_id"];
	echo '{"status":"success", "mapId":'.$mapId.'}';
}
?>