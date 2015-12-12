<?php
include("mysql.php");
$postAction = $_POST["action"];
if($postAction == "saveAsNewMap"){
	$baseMapsId = $_POST["baseMapsId"];
	$mapData = $_POST["mapData"];
	$player1Race = $_POST["player1Race"];
	$player2Race = $_POST["player2Race"];
	$player3Race = $_POST["player3Race"];
	$player4Race = $_POST["player4Race"];
	$player1Wits = $_POST["player1Wits"];
	$player2Wits = $_POST["player2Wits"];
	$player3Wits = $_POST["player3Wits"];
	$player4Wits = $_POST["player4Wits"];
	$sql = "INSERT INTO maps
			VALUES (NULL, '$baseMapsId', '$mapData', '$player1Race', '$player2Race', '$player3Race', '$player4Race', '$player1Wits', '$player2Wits', '$player3Wits', '$player4Wits');";
	$query = mysql_query($sql);

	$sql = "SELECT maps.map_id
			FROM maps
			ORDER BY maps.map_id DESC
			LIMIT 1;";
	$query = mysql_query($sql);
	$result = mysql_fetch_assoc($query);

	$mapId = $result["map_id"];
	echo '{"status":"success", "mapId":'.$mapId.'}';
}else if($postAction == "saveMap"){
	$mapId = $_POST["mapId"];
	if($mapId > 6){
		$mapData = $_POST["mapData"];
		$player1Race = $_POST["player1Race"];
		$player2Race = $_POST["player2Race"];
		$player3Race = $_POST["player3Race"];
		$player4Race = $_POST["player4Race"];
		$player1Wits = $_POST["player1Wits"];
		$player2Wits = $_POST["player2Wits"];
		$player3Wits = $_POST["player3Wits"];
		$player4Wits = $_POST["player4Wits"];
		$sql = "UPDATE maps
				SET map_data='$mapData', 
					player_1_race='$player1Race', player_2_race='$player2Race', player_3_race='$player3Race', player_4_race='$player4Race', 
					player_1_wits='$player1Wits', player_2_wits='$player2Wits', player_3_wits='$player3Wits', player_4_wits='$player4Wits'
				WHERE map_id=$mapId";
		$query = mysql_query($sql);
		echo '{"status":"success", "mapId":'.$mapId.'}';
	}else{
		echo '{"status":"failure: Cannot overwrite base maps"}';
	}
}else if($postAction == "saveAsNewReplay"){

}else if($postAction == "overwriteReplay"){

}else if($postAction == "deleteReplay"){
	
}
?>