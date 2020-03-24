<?php
	require_once('Model.php');
	$tab = Model::selectLivreDisponible();
	echo json_encode($tab);
?>