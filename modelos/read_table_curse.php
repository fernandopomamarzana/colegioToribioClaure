<?php
include("conexion.php");
header("Access-Control-Allow-Origin: *");

$sql="SELECT * FROM curso";
$resul=mysqli_query($conn,$sql);
if(mysqli_num_rows($resul)>0)
{
    $outp=array();
    $outp=$resul->fetch_all(MYSQLI_ASSOC);
    /*
    while($resultado=mysqli_fetch_assoc($resul)):
        $outp[]=$resul;
    endwhile;*/
    echo json_encode($outp); 

}else
{
    echo json_encode(false);
}
$conn->close();
?>