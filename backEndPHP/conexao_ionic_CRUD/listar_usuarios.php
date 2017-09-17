<?php

include("conecta.php");

header("Access-Control-Allow-Origin: *");

/* Variável de retorno */
$return = [];

if(isset($_POST['token'])){

	if($_POST['token'] == "KDFMOP342K5GDOP5I4290aDsadfasfdFgfdSFAOP0AK0R953UI9015"){

		/* Comando SQL */
		$sql = "SELECT * FROM tbl_usuario;";

		/* Resultado da query */
		$result = mysqli_query($conn,$sql);

		if($result && $result->num_rows > 0){

			/* Recebe resultado da query */
			$usuarios = $result->fetch_all(MYSQLI_ASSOC);
			
			$return = array(
				'success' => true,
				'message' => 'Usuários carregados',
				'usuarios' => $usuarios
			);
		}	else{
			$return = array(
				'success' => false,
				'message' => 'Não foram encontrados usuários no Banco!'
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