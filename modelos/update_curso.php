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
$nombre_profesor= $data[0]['nombre_acesor'];



if ($id!=""){
$sql = "UPDATE `curso` SET `nombre_acesor`='$nombre_profesor' WHERE `id`='$id'";


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