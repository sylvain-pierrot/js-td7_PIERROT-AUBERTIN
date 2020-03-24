<?php
	require_once('Model.php');
	$idAdherent = $_GET['idAdherent'];
	$idLivre = $_GET['idLivre'];
	Model::createEmprunt($idAdherent,$idLivre);
?>