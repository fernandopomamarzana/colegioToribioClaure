<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$idcurso= $data[0]['id'];
$nombre_curso=$data[0]['nombre_curso'];
$nombre_materia=$data[0]['nombre_materia'];
$nombre_profesor=$data[0]['nombre_profesor'];


if ($idcurso!=""){
$sql = "INSERT INTO `materias` (`id_curso`,`nombre_curso`,`nombre_profesor`,`nombre_materia`)VALUES
('$idcurso','$nombre_curso','$nombre_profesor','$nombre_materia')";

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