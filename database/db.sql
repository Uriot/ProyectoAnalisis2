CREATE DATABASE database_hotel;

USE database_hotel;

create table tipo_user(
id_tipo_user int not null auto_increment,
nombre varchar(30) not null,
constraint pk_id_tipo_user primary key (id_tipo_user)
);

insert into tipo_user (nombre) 
values ("cliente");
insert into tipo_user (nombre) 
values ("receptor");
insert into tipo_user (nombre) 
values ("administrador");

create TABLE users(
    id_user int not null auto_increment,
    username VARCHAR(20) not NULL,
    PASSWORD VARCHAR(40) not NULL,
    nombre_completo varchar(50) not NULL,
    dpi VARCHAR (20) null,
    nit VARCHAR (20) null,
    telefono varchar (20) not NULL,
    id_tipo_user int not null,
    constraint pk_id_user primary key (id_user),
    constraint fk_id_tipo_user foreign key (id_tipo_user) 
		references tipo_user (id_tipo_user)
);
insert into users (username, password, nombre_completo, dpi, nit, telefono, id_tipo_user)
values ("uriot", "admin", "Elliot Urizar", "1234567891231","95987285", "46341984", 3);


alter table users add email varchar(30) after password;

update users set email = "elliotur@gmail.com" where id_user = 1;

alter table users modify email varchar(30) not null;
