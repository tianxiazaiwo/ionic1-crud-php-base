<?php

include("conecta.php");

header("Access-Control-Allow-Origin: *");

/* Variável de retorno */
$return = [];

if(isset($_POST['id']) && isset($_POST['token'])){

	if($_POST['id'] != "" && $_POST['token'] == "KDFMOP342K5GDOP5I4290aDsadfasfdFgfdSFAOP0AK0R953UI9015"){

		/* Comando SQL */
		$sql = "DELETE FROM tbl_usuario WHERE id = ".$_POST['id'];

		/* Resultado da query */
		$result = mysqli_query($conn,$sql);

		if($result){
			$return = array(
				'success' => true,
				'message' => 'Usuário excluído com sucesso!'
			);
		}	else{
			$return = array(
				'success' => false,
				'message' => 'Não foi possível excluir o usuário!'
			);
		}

	} else{
		$return = array(
			'success' => false,
			'message' => 'Falha na autenticação!'
		);
	}

	echo json_encode($return);
}

$conn->close();

?>