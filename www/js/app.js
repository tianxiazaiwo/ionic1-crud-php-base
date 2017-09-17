/* Iniciador do IONIC */

/* angular.module é um comando global sendo possível utilizar em várias outras páginas */
/* appCRUD é o nome do nosso app referenciado no index.html, pode ser chamado de qualquer nome */
/** É possível também usar o module para criar controllers em outras páginas JS
 *  Se você quiser criar outro controller crie um arquivo js ex: 'authController.js'
 *  Nele você escreve angular.module('appCRUD').controller();
 *  Sendo 'appCRUD' o nome do seu app no index.html, e dentro do controller a configuração
 *  E chama o arquivo js logo em baixo do "app.js" la no index.html
 */
angular.module('appCRUD', ['ionic'])/* Só é necessário passar o parâmetro ionic na primeira tela */

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        /* Esconde o acessório de teclado, caso queira que apareça troque o parâmetro para "false" */
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        /**
         * Não remova esta linha a menos que você saiba o que está fazendo. Ele pára a viewport
         * de encaixe quando as entradas de texto são focadas. Ionic lida isso internamente para
         * uma experiência de teclado muito melhor.
         */
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  /* Configurações do projeto */
  .config(function($stateProvider, $urlRouterProvider) {

    /* Definindo rotas */
    $stateProvider
      .state('login', {/* nome da rota */
        url: '/login', /* url da rota */
        templateUrl: 'templates/login.html', /* local onde está a rota */
        controller: "authController"  /* Controller da rota */
      })
      .state('cadastro', {
        url: '/cadastro',
        templateUrl: 'templates/cadastro.html',
        controller: "authController"
      })
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: "mainController"
      });

    /* Definindo rota padrão */
    $urlRouterProvider.otherwise('/login');
    /**
     *  É recomendável a criação de uma rota "INIT"
     *  onde será uma rota vazia apenas para verificar
     *  se o usuário está logado e enviar ou para
     *  a tela de login, ou para o home.
     *  O view do "INIT" deve ser um loading de preferência.
     *  Motivos>>
     *  Caso inicie na tela de login, sempre que abrir o
     *  aplicativo, irá primeiro abrir a tela de login
     *  e depois redirecionar ao home, caso usuário esteja
     *  logado. Isso cria uma má experiência visual ao usuário
     */
  })
  /* Inicia um controlador de Views
   * @params  'authController'  Nome do Controlador
   * @params  function          Escopos usados pelo controlador + funções
   */
  .controller('authController', function($scope, $http, $state, $ionicPopup, $window, $ionicPlatform) {

    /* Funções a serem realizadas quando iniciar aplicação */
    $ionicPlatform.ready(function() {

      /* Verifica se há um idusuario salvo no localStorage */
      if($window.localStorage.getItem('idusuario') != null){
        $state.go('home');
      }

    });

    /* Cadastra o usuario no Banco de Dados pelo PHP */
    $scope.cadastrarUsuario = function() {

      /* Dados enviados ao PHP */
      var dados = 'email=' + this.user_email + '&senha=' + this.user_senha; /* O '&' serve para passar mais de um parâmetro */

      /* Cria uma requisição HTTP (acessa um site, e retorna algo) */
      $http({
          method: 'POST', /* Método da requisição */
          url: 'http://localhost/conexao_ionic_CRUD/cadastrar_usuario.php', /* URL onde está o arquivo PHP */
          data: dados, /* Dados enviados (nesse caso -> POST) */
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' } /* Headers de acesso a internet por celular */
        })
        /* Caso dê sucesso na requisição (Usuário esta com internet, e o site existe) */
        .success(function(resolve) { /* Recebe um resolve (dados enviados pelo PHP) */
          if (resolve.success) { /* Se teve sucesso com a função do PHP */
            $ionicPopup.alert({ /* Envia um PopUP com uma mensagem de sucesso */
              title: 'Sucesso', /* Título do PopUP */
              template: resolve.message /* Mensagem do PopUP */
            }).then(function() { /* Quando fechado (usuário clicou em OK) */
              $state.go('login'); /* Envia o usuário para a tela de Login */
            });
          } else { /* Se a função do PHP deu errado */
            $ionicPopup.alert({ /* Envia um PopUP com uma mensagem de erro */
              title: 'Error',
              template: resolve.message
            });
          }
        })
        /* Caso dê erro na requisição (Usuário esta sem internet ou o site não existe) */
        .error(function() {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Conecte-se a Internet!'
          });
        });

    }

    /* Faz login do Usuário */
    $scope.logarUsuario = function() {
      /* Os comentários da requisição são iguais aos do "cadastrarUsuario" */
      var dados = 'email=' + this.user_email + '&senha=' + this.user_senha;

      $http({
          method: 'POST',
          url: 'http://localhost/conexao_ionic_CRUD/logar_usuario.php',
          data: dados,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resolve) {
          console.log(resolve);
          if (resolve.success) {
            $ionicPopup.alert({
              title: 'Sucesso',
              template: resolve.message
            }).then(function() {
              /* Seta um novo idusuario para o usuário logado */
              $window.localStorage.setItem('idusuario', resolve.usuario.id);
              /* Atualiza a página para recarregar os dados */
              $window.location.reload(true);
              /* Envia para a tela inicial do APP */
              $state.go('home');
            });
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resolve.message
            });
          }
        })
        .error(function() {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Conecte-se a Internet!'
          });
        });

    }

  })
  /* Cria outro controlador (comentários igual do authController) */
  .controller('mainController', function($scope, $ionicPlatform, $http, $ionicPopup, $ionicModal, $ionicLoading, $window, $state) {

    /* Lista todos usuários do banco
     * Essa função é criada antes do "ionicPlatform.ready"
     * para que ao iniciar a página, antes de realizar
     * a função, ela já tenha sido criada. Caso seja colocada
     * a função depois do "ionic Ready", da error "função não existente"
     */
    $scope.listarUsuarios = function() {
      /* Os comentários da requisição são iguais aos do "cadastrarUsuario" */
      var dados = 'token=KDFMOP342K5GDOP5I4290aDsadfasfdFgfdSFAOP0AK0R953UI9015';

      $http({
          method: 'POST',
          url: 'http://localhost/conexao_ionic_CRUD/listar_usuarios.php',
          data: dados,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resolve) {
          if (resolve.success) {
            $scope.usuarios = resolve.usuarios; /* Recebe os dados dos usuários e atribui ao escopo Usuários */
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resolve.message
            });
          }
        })
        .error(function() {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Conecte-se a Internet!'
          });
        });

    };

    /* Ao iniciar aplicação */
    $ionicPlatform.ready(function() {

      /* Caso não exista idusuario no localStorage, manda logar de novo */
      if($window.localStorage.getItem('idusuario') == null){
        $state.go('login');
      }

      /* Chama a função criada logo acima */
      $scope.listarUsuarios();

    });

    /* Realiza o logout */
    $scope.logout = function(){
      /* Remove o idusuario do localStorage */
      $window.localStorage.removeItem('idusuario');
      /* Atualiza a página do APP */
      $window.location.reload(true);
      /* Envia para a tela de login */
      $state.go('login');
    }

    /* Configurações do Modal */
    $ionicModal.fromTemplateUrl('alterarUsuario.html', {
      scope: $scope, /* tipo de escopo */
      animation: 'slide-in-up' /* Animação ao abrir Modal */
    }).then(function(modal) {
      $scope.alterarModal = modal; /* Cria um novo modal */
    });
    $scope.openAlterarModal = function() { /* Função para abrir o Modal */
      $scope.alterarModal.show(); /* Abre o Modal */
    };
    $scope.closeAlterarModal = function() { /* Função para fechar o Modal */
      $scope.alterarModal.hide(); /* Fecha o Modal */
    };

    /* Carrega dados do usuario e abre o modal */
    $scope.abrirAlterarUsuario = function(id) {
      /* Abre um loading que congela a tela do usuário enquanto faz a requisição */
      $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>' /* Template do loading */
      });

      /* Os comentários da requisição são iguais aos do "cadastrarUsuario" */
      var dados = 'token=KDFMOP342K5GDOP5I4290aDsadfasfdFgfdSFAOP0AK0R953UI9015' + '&id=' + id;

      $http({
          method: 'POST',
          url: 'http://localhost/conexao_ionic_CRUD/listar_usuario.php',
          data: dados,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resolve) {
          $ionicLoading.hide(); /* Fecha o loading no fim da requisição */
          if (resolve.success) {
            $scope.usuario = resolve.usuario; /* Recebe os dados do usuário */
            $scope.openAlterarModal(); /* Abre o modal */
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resolve.message
            });
          }
        })
        .error(function() {
          $ionicLoading.hide(); /* Fecha o loading no fim da requisição */
          $ionicPopup.alert({
            title: 'Error',
            template: 'Conecte-se a Internet!'
          });
        });

    }

    /* Altera um usuário no banco */
    $scope.alterarUsuario = function() {
      /* Os comentários da requisição são iguais aos do "cadastrarUsuario" */
      var dados = 'email=' + $scope.usuario.email + '&id=' + $scope.usuario.id;

      $http({
          method: 'POST',
          url: 'http://localhost/conexao_ionic_CRUD/alterar_usuario.php',
          data: dados,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(resolve) {
          if (resolve.success) {
            $ionicPopup.alert({
                title: 'Sucesso',
                template: resolve.message
              })
              .then(function() {
                $scope.closeAlterarModal(); /* Fecha o modal */
                $scope.usuarios = null; /* Define os usuários como null para recarregar de novo mostrando loading */
                $scope.listarUsuarios(); /* Lista os Usuarios novamente */
              });
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resolve.message
            });
          }
        })
        .error(function() {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Conecte-se a Internet!'
          });
        });
    }

    /* Exclui um usuário do banco */
    $scope.excluirUsuario = function(id) {

      /* Faz um Popup de Confirmação */
      $ionicPopup.confirm({
          title: 'ATENÇÃO!', /* Título */
          template: 'Você realmente deseja excluir o usuário?' /* Texto */
        })
        .then(function(res) {
          if (res) { /* Caso o usuário confirmou */

            /* Os comentários da requisição são iguais aos do "cadastrarUsuario" */
            var dados = 'token=KDFMOP342K5GDOP5I4290aDsadfasfdFgfdSFAOP0AK0R953UI9015' + '&id=' + id;

            $http({
                method: 'POST',
                url: 'http://localhost/conexao_ionic_CRUD/excluir_usuario.php',
                data: dados,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              })
              .success(function(resolve) {
                if (resolve.success) {
                  $ionicPopup.alert({
                    title: 'Sucesso',
                    template: resolve.message
                  }).then(function() {
                    $scope.usuarios = null; /* Define os usuários como null para reaparecer a tela de loading */
                    $scope.listarUsuarios(); /* Lista os usuários de novo */
                  });
                } else {
                  $ionicPopup.alert({
                    title: 'Error',
                    template: resolve.message
                  });
                }
              })
              .error(function() {
                $ionicPopup.alert({
                  title: 'Error',
                  template: 'Conecte-se a Internet!'
                });
              });

          } else {
            /* Usuário cancelou confirmação */
          }
        });

    };

  })