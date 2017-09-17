<?php

include("conecta.php");

header("Access-Control-Allow-Origin: *");

/* Variável de retorno */
$return = [];

if(isset($_POST['token']) && isset($_POST['id'])){

	if($_POST['token'] == "KDFMOP342K5GDOP5I4290aDsadfasfdFgfdSFAOP0AK0R953UI9015" && $_POST['id'] != ""){

		/* Comando SQL */
		$sql = "SELECT * FROM tbl_usuario WHERE id = ".$_POST['id'];

		/* Resultado da query */
		$result = mysqli_query($conn,$sql);

		if($result && $result->num_rows > 0){

			/* Recebe resultado da query */
			$usuario = $result->fetch_assoc();
			
			$return = array(
				'success' => true,
				'message' => 'Usuário carregado',
				'usuario' => $usuario
			);
		}	else{
			$return = array(
				'success' => false,
				'message' => 'Não foi encontrado o usuário no Banco!'
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