<?php
include("mysql.php");
if(isset($_GET["mapId"])){
	$mapId = $_GET["mapId"];
	$sql = "SELECT base_maps.base_maps_id, base_maps.map_name, base_maps.map_theme, maps.map_data, 
				maps.player_1_race, maps.player_2_race, maps.player_3_race, maps.player_4_race, 
				maps.player_1_wits, maps.player_2_wits, maps.player_3_wits, maps.player_4_wits 
			FROM maps JOIN base_maps on base_maps.base_maps_id = maps.base_maps_id 
			WHERE maps.map_id=$mapId 
			LIMIT 1";
	$query = mysql_query($sql);
	$result = mysql_fetch_assoc($query);
	$baseMapsId = $result["base_maps_id"];
	$mapName = $result["map_name"];
	$mapTheme = $result["map_theme"];
	$mapData = $result["map_data"];
	$playerRaces = array($result["player_1_race"], $result["player_2_race"], $result["player_3_race"], $result["player_4_race"]);
	$playerWits = array($result["player_1_wits"], $result["player_2_wits"], $result["player_3_wits"], $result["player_4_wits"]);
	/*
	$sql = "SELECT replay_data
			FROM replays
			WHERE map_id=$mapId";
	*/
}
include("loaded-map.html");
?>