<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");
header('Content-Type: application/json');
$rest_json=file_get_contents("php://input");

$data=array(
    $_POST
);
$name= $data[0]['name'];

if($name!=""){
$sql="SELECT * FROM curso WHERE name='$name'";
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



