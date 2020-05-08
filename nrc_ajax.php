<?php
    $getID = $_POST['key'];
    $json = file_get_contents('nrc.json');
    $json = json_decode($json, true);
    if($getID == ''){
        $jsonTypes = file_get_contents('nrc_types.json');
        $jsonTypes = json_decode($jsonTypes, true);
        $result = array('numbers' => array_keys($json), 'types' => $jsonTypes);
        echo json_encode($result);
    } else {
        echo json_encode($json[$getID]);
    }
?>