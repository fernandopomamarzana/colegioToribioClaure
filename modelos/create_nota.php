<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$gestion= $data[0]['gestion'];
$trimestre=$data[0]['trimestre'];
$id_estudiante=$data[0]['id_estudiante'];
$nombre_curso=$data[0]['id_curso'];
$nombre_materia=$data[0]['id_materia'];
$nota=$data[0]['nota'];


if ($gestion!=""){
$sql = "INSERT INTO `notas` (`gestion`,`trimestre`,`id_estudiante`,`nombre_curso`,`nombre_materia`,`nota`)VALUES
('$gestion','$trimestre','$id_estudiante','$nombre_curso','$nombre_materia',$nota)";

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