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
$trimestre= $data[0]['trimestre'];
$uid_stunden= $data[0]['uid_studen'];

if($gestion!=""){
$sql="SELECT * FROM notas WHERE `trimestre`='$trimestre' AND `id_estudiante`='$uid_stunden' AND `gestion`='$gestion'";
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



