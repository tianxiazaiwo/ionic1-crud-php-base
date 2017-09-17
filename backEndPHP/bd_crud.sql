CREATE DATABASE bd_crud;

USE bd_crud;

CREATE TABLE tbl_usuario (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL UNIQUE,
  senha varchar(100) NOT NULL,
  data_criacao timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id);
);

INSERT INTO tbl_usuario (email, senha) VALUES('teste@teste.com', 'teste');