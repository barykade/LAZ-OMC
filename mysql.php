<?php

$mysql_host = "localhost";
$mysql_user = "root";
$mysql_pass = "andersonjake";
@mysql_connect($mysql_host, $mysql_user, $mysql_pass) or die('could not connect!');

$db = "laz_omc";
mysql_select_db($db) or("could not connect!");

?>
