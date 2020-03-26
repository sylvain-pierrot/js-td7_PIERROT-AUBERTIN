<?php
require_once('Model.php');
$idAdherent = $_GET['idAdherent'];
Model::deleteEmprunt($idAdherent);
?>