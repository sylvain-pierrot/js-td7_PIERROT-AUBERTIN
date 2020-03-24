<?php
	require_once('Model.php');
	$idLivre = $_GET['idLivre'];
	Model::deleteEmprunt($idLivre);
?>