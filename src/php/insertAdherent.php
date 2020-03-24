<?php
	require_once('Model.php');
	$nomAdherent = $_GET['nomAdherent'];
	Model::create_adherent($nomAdherent);
?>