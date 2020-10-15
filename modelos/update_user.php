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
$ci=$data[0]['ci'];
$nombre=$data[0]['nombre'];
$apellido=$data[0]['apellido'];
$edad=$data[0]['edad'];
$username=$data[0]['username'];
$pass=$data[0]['pass'];
$numero_telefonico=$data[0]['numero_telefonico'];
$tipo_usuario=$data[0]['tipo_usuario'];
$domicilio=$data[0]['domicilio'];

if ($uid!=""){
$sql = "UPDATE `usuarios` SET `ci`='$ci', `nombre`='$nombre', `apellido`='$apellido', `edad`=$edad, `username`='$username', `password`='$pass', `numero_telefonico`='$numero_telefonico', `tipo_usuario`='$tipo_usuario', `domicilio`='$domicilio' WHERE `uid`='$uid'";


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