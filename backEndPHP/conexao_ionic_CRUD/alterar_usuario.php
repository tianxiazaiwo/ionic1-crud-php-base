<?php

include("conecta.php");

header("Access-Control-Allow-Origin: *");

/* Variável de retorno */
$return = [];

if(isset($_POST['email']) && isset($_POST['id'])){

	if($_POST['email'] != "" && $_POST['id'] != ""){

		/* Comando SQL */
		$sql = "UPDATE tbl_usuario SET email = '".$_POST['email']."' WHERE id = ".$_POST['id'];

		/* Resultado da query */
		$result = mysqli_query($conn,$sql);

		if($result){
			$return = array(
				'success' => true,
				'message' => 'Usuário alterado com sucesso!'
			);
		}	else{
			$return = array(
				'success' => false,
				'message' => 'Erro ao alterar usuário, verifique os campos!'
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