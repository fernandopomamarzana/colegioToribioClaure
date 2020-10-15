<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$uid=$data[0]['id'];

$nombre=$data[0]['nombre'];
//echo ("esto esuna uid ");

//echo ($nombre."dasdas");


if ($nombre!=""){
$sql = "INSERT INTO `curso` (`id`,`name`)VALUES
('$uid','$nombre')";

if($conn->query($sql)===TRUE)
{
    $outp="Curso agregado";
    echo json_encode($outp);

}else
{
    echo json_encode(false);
}}
$conn->close();
?>