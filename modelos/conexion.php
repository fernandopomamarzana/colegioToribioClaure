<?php
header("Access-Control-Allow-Origin: *");

/*$servername="localhost";
$user="root";
$password="";
$dbname="colegio";*/
$servername="localhost";
$user="id14863604_fernando";
$password="=?>-0cR8MD>(X/4o";
$dbname="id14863604_toribioclaure";
/* 
$servername="localhost";
$user="id14658429_fernando";
$password="RRAVk]=mW!%DOc1d";
$dbname="id14658429_toribio_claure";
*/
/*
$servername="sql202.tonohost.com";
$user="ottos_24319359";
$password="DEmy.76914612";
$dbname="ottos_24319359_carrero";
*/
$conn=mysqli_connect($servername,$user,$password,$dbname);
if($conn-> connect_error)
{
    //die("coneccion fallida". $conn->connect_error);
    echo json_encode("CONECCION FALLIDA");
}
else
{
    //echo json_encode("CONECCION EXITOSA");
}
/*
$sql="SELECT * FROM aulas";
$resul=mysqli_query($conn,$sql);
if(mysqli_num_rows($resul)>0)
{
    $outp=array();
    $outp=$resul->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp); 

}else
{
    echo json_encode("0 resultados");
}*/
//$conn->close();
?>