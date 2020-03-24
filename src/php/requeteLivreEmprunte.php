<?php
	require_once('Model.php');
	$tab = Model::selectLivreEmprunte();
	echo json_encode($tab);
?>