<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$id_estudiante= $data[0]['id_estudiante'];
$fecha= $data[0]['fecha'];
$gestion= $data[0]['gestion'];

if ($id_estudiante!=""){
$sql = "INSERT INTO `faltas` (`id_estudiante`,`fecha`,`gestion`)VALUES
('$id_estudiante','$fecha','$gestion')";

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