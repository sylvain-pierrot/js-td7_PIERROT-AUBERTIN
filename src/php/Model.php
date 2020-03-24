<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function selectAdherent() {
        try {
            $sql = "SELECT * FROM adherent";
            $rep = Model::$pdo->query($sql);
            $rep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $rep->fetchAll();
            return $tab;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function selectLivreDisponible() {
        try {
            $sql = "SELECT * FROM livre WHERE idLivre NOT IN (SELECT idLivre FROM emprunt)";
            $rep = Model::$pdo->query($sql);
            $rep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $rep->fetchAll();
            return $tab;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function selectLivreEmprunte() {
        try {
            $sql = "SELECT * FROM livre, emprunt WHERE livre.idLivre=emprunt.idLivre";
            $rep = Model::$pdo->query($sql);
            $rep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $rep->fetchAll();
            return $tab;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function create_adherent($nomAdherent) {
        try {
            $sql = "INSERT INTO adherent (nomAdherent) VALUES (:nom_tag)";
            $rep_prep = Model::$pdo->prepare($sql);
            $values = Array('nom_tag' => $nomAdherent);
            $rep_prep->execute($values);
        }
        catch(PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function create_livre($nomLivre) {
        try {
            $sql = "INSERT INTO livre (titreLivre) VALUES (:nom_tag)";
            $rep_prep = Model::$pdo->prepare($sql);
            $values = Array('nom_tag' => $nomLivre);
            $rep_prep->execute($values);
        }
        catch(PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function selectEmpruntByAdherent($idAdherent) {
        try {
            $sql = "SELECT titreLivre FROM emprunt, livre WHERE emprunt.idLivre=livre.idLivre AND idAdherent=:tag_id";
            $rep_prep = Model::$pdo->prepare($sql);
            $values = Array('tag_id' => $idAdherent);
            $rep_prep->execute($values);
            $rep_prep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $rep_prep->fetchAll();
            return $tab;
        }
        catch(PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function createEmprunt($idAdherent, $idLivre) {
        try {
            $sql = "INSERT INTO emprunt (idAdherent, idLivre) VALUES (:idAdherent_tag, :idLivre_tag)";
            $rep_prep = Model::$pdo->prepare($sql);
            $values = Array('idAdherent_tag' => $idAdherent, 'idLivre_tag' => $idLivre);
            $rep_prep->execute($values);
        }
        catch(PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function deleteEmprunt($idLivre) {
        try {
            $sql = "DELETE FROM emprunt WHERE idLivre=:idLivre_tag";
            $rep_prep = Model::$pdo->prepare($sql);
            $values = Array('idLivre_tag' => $idLivre);
            $rep_prep->execute($values);
        }
        catch(PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function selectAdherentByIdLivre($idLivre) {
        try {
            $sql = "SELECT nomAdherent FROM adherent, emprunt WHERE adherent.idAdherent=emprunt.idAdherent AND idLivre=:idLivre_tag";
            $rep_prep = Model::$pdo->prepare($sql);
            $values = Array('idLivre_tag' => $idLivre);
            $rep_prep->execute($values);
            $rep_prep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $rep_prep->fetchAll();
            return $tab;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

}

// on initialise la connexion $pdo
Model::init_pdo();

?>
