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

if(!isset($_GET['id']) & !isset($_POST['id'])){
    echo "No ID, add this to the url: ?id=<UID> or post from ajax"; 
    exit;
}

$id = isset($_GET['id'])?$_GET['id']:$_POST['id'];
$lastid = isset($_GET['lastid'])?$_GET['lastid']:$_POST['lastid'];

//Get the data - we want a user id
$query = "SELECT * FROM cards WHERE userId='$id' and  id > '$lastid' ORDER BY id ASC";

// echo $query;

$res = $mysqli->query($query);

$ret = "";
while ($row = $res->fetch_assoc()){
    if(isset($row)){
        $ret[] = array_map('htmlentities', $row);
    }
}

// $restring = 0;
$restring = html_entity_decode(json_encode($ret));


if(strlen($restring)>2){
    echo $restring;
}else{
    echo '[null]';
}

// echo "I am alive!"

?>