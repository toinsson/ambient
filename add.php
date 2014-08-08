<?php

// echo phpinfo();

error_reporting(E_ALL);
ini_set('display_errors', '1');

function opendb() {
    
    $connection = mysqli_connect("127.0.0.1", "bbproj", "Lyhoc0Ns");
    if (!$connection)
        die("Unable to connect to database");
    mysqli_select_db($connection, 'ambient') or die("Unable to select database");
    return $connection;
}


$mysqli = opendb();

if(!isset($_POST['action'])){
    echo "Please post to this url"; 
    exit;
}

$ret = -1;
//Get the data - we want a user id
//$query = "SELECT * FROM cards WHERE userId='$id' ORDER BY id ASC";

//$query = "INSERT INTO cards (`userId`, `action`, `value`, `timestamp`) VALUES ('".$_GET['userid']."', '".$_GET['action']."', '".$_GET['value']."', NOW())";
$query = "INSERT INTO cards (`userId`, `action`, `value`, `timestamp`) VALUES ('".$_POST['userid']."', '".$_POST['action']."', '".$_POST['value']."', NOW())";
//echo $query;

$res = $mysqli->query($query);

$ret = $mysqli->insert_id;

echo $ret;
//echo "I am alive!"

?>