<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$uid= $data[0]['uid'];
$ci= $data[0]['ci'];
$nombre=$data[0]['nombre'];
$apellido=$data[0]['apellido'];
$edad=$data[0]['edad'];
$username=$data[0]['username'];
$pass=$data[0]['pass'];
$numero_telefono=$data[0]['numero_telefono'];
$tipo_usuario=$data[0]['tipo_usuario'];
$tutor=$data[0]['tutor'];
$domicilio=$data[0]['domicilio'];


if ($uid!=""){
$sql = "INSERT INTO `usuarios` (`uid`,`ci`,`nombre`,`apellido`,`edad`,`username`,`password`,`numero_telefonico`,`tipo_usuario`,`domicilio`,`nombre_completo_tutor`,`curso`)VALUES
('$uid','$ci','$nombre','$apellido',$edad,'$username','$pass',$numero_telefono,'$tipo_usuario','$domicilio','$tutor','')";

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