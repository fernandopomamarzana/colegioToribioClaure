<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$id=$data[0]['uid'];
$password= $data[0]['password'];



if ($id!=""){
$sql = "UPDATE `usuarios` SET `password`='$password' WHERE `uid`='$id'";


if($conn->query($sql)===TRUE)
{
    $outp="se actualizo";
    echo json_encode($outp);

}else
{
    echo json_encode(false);
}}
$conn->close();
?>