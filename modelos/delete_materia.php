<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$id=$data[0]['id'];



if ($id!=""){
$sql = "DELETE FROM `materias` WHERE `id`=$id";


if($conn->query($sql)===TRUE)
{
    $outp="se elimino";
    echo json_encode($outp);

}else
{
    echo json_encode(false);
}}
$conn->close();
?>