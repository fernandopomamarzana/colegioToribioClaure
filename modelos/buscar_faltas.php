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
$gestion= $data[0]['gestion'];

if($id_estudiante!=""){
$sql="SELECT * FROM faltas WHERE id_estudiante='$id_estudiante' AND gestion='$gestion'";
$resul=mysqli_query($conn,$sql);
if(mysqli_num_rows($resul)>0)
{
    $outp=array();
    $outp=$resul->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);

}else
{
    echo json_encode(false);
}
}
$conn->close();
?>



