<?php
	require_once('Model.php');
	$tab = Model::selectAdherent();
	echo json_encode($tab);
?>