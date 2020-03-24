<?php
	require_once('Model.php');
	$idAdherent = $_GET['idAdherent'];
	$tab_livre = Model::selectEmpruntByAdherent($idAdherent);
	echo json_encode($tab_livre);
?>