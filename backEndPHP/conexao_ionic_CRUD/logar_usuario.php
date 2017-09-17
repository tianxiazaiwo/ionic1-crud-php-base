<?php

include("conecta.php");

header("Access-Control-Allow-Origin: *");

/* Variável de retorno */
$return = [];

if(isset($_POST['email']) && isset($_POST['senha'])){

	if($_POST['email'] != "" && $_POST['senha'] != ""){

		/* Comando SQL */
		$sql = "SELECT * FROM tbl_usuario WHERE email = '".$_POST['email']."' AND senha = '".$_POST['senha']."'";

		/* Resultado da query */
		$result = mysqli_query($conn,$sql);

		if($result && $result->num_rows > 0){

			/* Recebe resultado da query */
			$usuario = $result->fetch_assoc();
			
			$return = array(
				'success' => true,
				'message' => 'Bem-vindo '.$usuario['email'],
				'usuario' => $usuario
			);
		}	else{
			$return = array(
				'success' => false,
				'message' => 'E-mail ou senha inválidos!'
			);
		}

	} else{
		$return = array(
			'success' => false,
			'message' => 'Preencha todos os campos!'
		);
	}

	echo json_encode($return);
}

$conn->close();

?>