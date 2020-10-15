<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$uid=$data[0]['uid'];
$curso=$data[0]['curso'];

if ($uid!=""){
$sql = "UPDATE `usuarios` SET `curso`='$curso' WHERE `uid`='$uid'";


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