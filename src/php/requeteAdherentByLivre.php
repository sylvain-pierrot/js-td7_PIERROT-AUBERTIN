<?php
	require_once('Model.php');
	$idLivre = $_GET['idLivre'];
	$tab = Model::selectAdherentByIdLivre($idLivre);
	echo json_encode($tab);
?>