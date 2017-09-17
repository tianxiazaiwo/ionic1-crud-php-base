<?php

/* Configurações de conexão */

$servidor = "localhost"; /* Servidor */
$user = "root";	 		 /* Usuário */
$senha = "";	 		 /* Senha */
$db = "bd_crud"; 		 /* Nome do Banco */

/* Inicia a conexão através de mysqli */
$conn = new mysqli($servidor,$user,$senha,$db);

/* Em caso de erro, cancela a conexão */
if($conn->connect_error){
	die("Erro com a conexão");
}

?>