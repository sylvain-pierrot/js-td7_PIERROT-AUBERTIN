<?php
	require_once('Model.php');
	$titreLivre = $_GET['titreLivre'];
	Model::create_livre($titreLivre);
?>