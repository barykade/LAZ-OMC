<?php
include("mysql.php");
if(isset($_GET["mapId"])){
	$mapId = $_GET["mapId"];
	$sql = "SELECT base_maps.base_maps_id, base_maps.map_name, base_maps.map_theme, maps.map_data 
			FROM maps JOIN base_maps on base_maps.base_maps_id = maps.base_maps_id 
			WHERE maps.map_id=$mapId 
			LIMIT 1";
	$query = mysql_query($sql);
	$result = mysql_fetch_assoc($query);
	$baseMapsId = $result["base_maps_id"];
	$mapName = $result["map_name"];
	$mapTheme = $result["map_theme"];
	$mapData = $result["map_data"];

	//retrieve replay data
}
include("loaded-map.html");
?>