﻿CREATE DATABASE CSDL

GO

USE CSDL

GO

CREATE TABLE Person( 
	--Auto create id increment
	id INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
	username VARCHAR(30) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	age INT NOT NULL,
	password VARCHAR(200) NOT NULL
)

GO

SELECT * FROM Person