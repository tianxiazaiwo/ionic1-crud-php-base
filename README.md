Ionic 1 App CRUD-PHP Base
==============

Um projeto Ionic 1 Base com um CRUD usando PHP.

## Usando esse projeto

É necessário possuir o GIT e Node JS para instalar o Cordova e o Ionic globalmente no seu computador.

```Usando o GIT BASH
npm install -g ionic cordova
```

## Após isso:

## Dê um GIT Clone
```Usando o GIT BASH
git clone https://github.com/vazgabriel/ionic1-crud-php-base.git
```
## Entre na pasta
```Entre na pasta do projeto
cd CRUD_PHP
```
## Instale as bibliotecas
```Depois disso dê um npm install para instalas as bibliotecas necessárias
npm install
```

## Inicie o servidor
```Após isso inicie seu servidor
ionic serve
```

BackEnd PHP
==============

A parte backend usando PHP.

## Colocando a pasta no lugar adequado
A pasta "conexao_ionic_CRUD" dentro do "backEndPHP" deve ser colocada dentro do www (wampserver ou EasyPHP).

## Iniciando Serviços
Inicie o serviço APACHE e MYSQL(Wamp Server) ou HTTP E MYSQL(EasyPHP).

## Crie o banco de dados
Dentro da pasta "backEndPHP" existe um arquivo chamado "bd_crud.sql", use os código dentro dele para criar
o banco de dados, e após isso, inicie o ionic normalmente.