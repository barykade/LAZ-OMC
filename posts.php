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
}else if($_POST["action"] == "saveMap"){
	$mapId = $_POST["mapId"];
	if($mapId > 6){
		$mapData = $_POST["mapData"];
		$sql = "UPDATE maps
				SET map_data='$mapData'
				WHERE map_id=$mapId";
		$query = mysql_query($sql);
		echo '{"status":"success", "mapId":'.$mapId.'}';
	}else{
		echo '{"status":"failure: Cannot overwrite base maps"}';
	}
}
?>