<?php

include("conecta.php");

header("Access-Control-Allow-Origin: *");

/* Variável de retorno */
$return = [];

if(isset($_POST['email']) && isset($_POST['senha'])){

	if($_POST['email'] != "" && $_POST['senha'] != ""){

		/* Comando SQL */
		$sql = "INSERT INTO tbl_usuario(email,senha) VALUES('" . $_POST['email'] . "', '" . $_POST['senha'] . "')";

		/* Resultado da query */
		$result = mysqli_query($conn,$sql);

		if($result){
			$return = array(
				'success' => true,
				'message' => 'Usuário cadastrado com sucesso!'
			);
		}	else{
			$return = array(
				'success' => false,
				'message' => 'Esse e-mail já existe no nosso banco!'
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